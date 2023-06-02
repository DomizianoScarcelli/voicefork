
resource "aws_ecs_task_definition" "proxy_task_definition" {
  family                   = "proxy-task-definition"
  execution_role_arn       = "arn:aws:iam::535455227633:role/LabRole"
  task_role_arn            = "arn:aws:iam::535455227633:role/LabRole"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "1024"
  memory                   = "5120"
  container_definitions = jsonencode(
    [
      {
        "name" : "proxy",
        "image" : "doviscarcelli/nginx",
        "cpu" : 0,
        "portMappings" : [
          {
            "name" : "proxy-3000-tcp",
            "containerPort" : 3000,
            "hostPort" : 3000,
            "protocol" : "tcp",
            "appProtocol" : "http"
          }
        ],
        "essential" : true,
        "command" : [
          "/bin/bash",
          "-c",
          "envsubst < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf; nginx -g 'daemon off;'"
        ],
        "environment" : [
          {
            "name" : "USERS_IP",
            "value" : var.users_ip
          },
          {
            "name" : "RESTAURANTS_IP",
            "value" : var.restaurants_ip
          },
          {
            "name" : "RESERVATIONS_IP",
            "value" : var.reservations_ip
          },
        ]
      },
    ]
  )
}


resource "aws_lb" "proxy_load_balancer" {
  name               = "proxy-load-balancer"
  load_balancer_type = "application"
  subnets            = var.networks["subnets"]
  security_groups    = var.networks["security_groups"]
}

resource "aws_lb_target_group" "proxy_target_group" {
  name        = "proxy-target-group"
  port        = 3000
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = "vpc-00c21a18456d3882e"
}
resource "aws_lb_listener" "listener" {
  load_balancer_arn = aws_lb.proxy_load_balancer.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    target_group_arn = aws_lb_target_group.proxy_target_group.arn
    type             = "forward"
  }
}

resource "aws_appautoscaling_target" "autoscaling_target" {
  max_capacity       = 10
  min_capacity       = 1
  resource_id        = "service/${var.voicefork_cluster.name}/${aws_ecs_service.proxy_service.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}


resource "aws_ecs_service" "proxy_service" {
  name            = "proxy-service"
  cluster         = var.voicefork_cluster.id
  task_definition = aws_ecs_task_definition.proxy_task_definition.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = var.networks["subnets"]
    security_groups  = var.networks["security_groups"]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.proxy_target_group.arn
    container_name   = "proxy"
    container_port   = 3000
  }

  deployment_controller {
    type = "ECS"
  }
}
