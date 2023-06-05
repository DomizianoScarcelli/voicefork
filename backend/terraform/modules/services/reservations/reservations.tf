data "aws_caller_identity" "current" {}

resource "aws_ecs_task_definition" "reservations_task_definition" {
  family                   = "reservations-task-definition"
  execution_role_arn       = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/LabRole"
  task_role_arn            = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/LabRole"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "1024"
  memory                   = "5120"

  container_definitions = jsonencode(
    [
      {
        "name" : "reservations",
        "image" : "doviscarcelli/reservations:latest",
        "cpu" : 0,
        "portMappings" : [
          {
            "name" : "reservations-3003-tcp",
            "containerPort" : 3003,
            "hostPort" : 3003,
            "protocol" : "tcp",
            "appProtocol" : "http"
          }
        ],
        "essential" : true,
        "command" : [
          "sh",
          "-c",
          "npx prisma migrate deploy;npm run build;npm start"
        ],
        "environment" : [
          {
            "name" : "PORT",
            "value" : "3003"
          },
          {
            "name" : "DATABASE_URL",
            "value" : "mysql://root:mariomariomario@${var.database_url}/reservationsDB"
          }
        ],
        "mountPoints" : [],
        "volumesFrom" : [],
        "logConfiguration" : {
          "logDriver" : "awslogs",
          "options" : {
            "awslogs-create-group" : "true",
            "awslogs-group" : "/ecs/reservations-task-definition",
            "awslogs-region" : "us-east-1",
            "awslogs-stream-prefix" : "ecs"
          }
        }
      }
    ]
  )
}


resource "aws_lb_target_group" "reservations_target_group" {
  name        = "reservations-target-group"
  port        = 3003
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = var.vpc
}

resource "aws_lb" "reservations_load_balancer" {
  name               = "reservations-load-balancer"
  load_balancer_type = "application"
  subnets            = var.networks["subnets"]
  security_groups    = var.networks["security_groups"]
}

resource "aws_lb_listener" "reservations_listener" {
  load_balancer_arn = aws_lb.reservations_load_balancer.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    target_group_arn = aws_lb_target_group.reservations_target_group.arn
    type             = "forward"
  }
}
resource "aws_appautoscaling_target" "reservations_autoscaling_target" {
  max_capacity       = 10
  min_capacity       = 1
  resource_id        = "service/${var.voicefork_cluster.name}/${aws_ecs_service.reservations_service.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}


resource "aws_ecs_service" "reservations_service" {
  name            = "reservations-service_namespace"
  cluster         = var.voicefork_cluster.id
  task_definition = aws_ecs_task_definition.reservations_task_definition.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = var.networks["subnets"]
    security_groups  = var.networks["security_groups"]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.reservations_target_group.arn
    container_name   = "reservations"
    container_port   = 3003
  }

  deployment_controller {
    type = "ECS"
  }
}

