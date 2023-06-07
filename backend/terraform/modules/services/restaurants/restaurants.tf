data "aws_caller_identity" "current" {}

resource "aws_ecs_task_definition" "restaurants_task_definition" {
  family                   = "restaurants-task-definition"
  execution_role_arn       = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/LabRole"
  task_role_arn            = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/LabRole"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "1024"
  container_definitions = jsonencode(
    [
      {
        "name" : "restaurants",
        "image" : "doviscarcelli/restaurants:latest",
        "cpu" : 0,
        "portMappings" : [
          {
            "name" : "restaurants-3002-tcp",
            "containerPort" : 3002,
            "hostPort" : 3002,
            "protocol" : "tcp",
            "appProtocol" : "http"
          }
        ],
        "essential" : true,
        "command" : [
          "sh",
          "-c",
          "npx prisma migrate deploy; npm run build; npm run start"
        ],
        "environment" : [
          {
            "name" : "AWS_SESSION_TOKEN",
            "value" : ""
          },
          {
            "name" : "DATABASE_URL",
            "value" : "postgresql://root:mariomariomario@${var.database_url}/postgres?connection_limit=20&pool_timeout=0"
          }
          ,
          {
            "name" : "EMBEDDINGS_URL",
            "value" : var.embeddings_url
          },
          {
            "name" : "PORT",
            "value" : "3002"
          },
          {
            "name" : "AWS_SECRET_KEY",
            "value" : ""
          },
          {
            "name" : "AWS_ACCESS_KEY",
            "value" : ""
          },
        ],
        "environmentFiles" : [],
        "mountPoints" : [
        ],
        "volumesFrom" : [],
        "ulimits" : [],
        "logConfiguration" : {
          "logDriver" : "awslogs",
          "options" : {
            "awslogs-create-group" : "true",
            "awslogs-group" : "/ecs/restaurants-task-definition",
            "awslogs-region" : "us-east-1",
            "awslogs-stream-prefix" : "ecs"
          }
        }
      }
    ]
  )
}



resource "aws_lb" "restaurants_load_balancer" {
  name               = "restaurants-load-balancer"
  load_balancer_type = "application"
  subnets            = var.networks["subnets"]
  security_groups    = var.networks["security_groups"]
}

resource "aws_lb_target_group" "restaurants_target_group" {
  name        = "restaurants-target-group"
  port        = 3002
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = var.vpc
}
resource "aws_lb_listener" "restaurants_listener" {
  load_balancer_arn = aws_lb.restaurants_load_balancer.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    target_group_arn = aws_lb_target_group.restaurants_target_group.arn
    type             = "forward"
  }
}
resource "aws_appautoscaling_target" "restaurants_autoscaling_target" {
  max_capacity       = 10
  min_capacity       = 1
  resource_id        = "service/${var.voicefork_cluster.name}/${aws_ecs_service.restaurants_service.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}

resource "aws_appautoscaling_policy" "restaurants_autoscaling_policy" {
  name               = "restaurants-autoscaling-policy"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.restaurants_autoscaling_target.resource_id
  scalable_dimension = aws_appautoscaling_target.restaurants_autoscaling_target.scalable_dimension
  service_namespace  = aws_appautoscaling_target.restaurants_autoscaling_target.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }
    target_value       = 60
    scale_in_cooldown  = 10
    scale_out_cooldown = 10
  }
}


resource "aws_ecs_service" "restaurants_service" {
  name            = "restaurants_service"
  cluster         = var.voicefork_cluster.id
  task_definition = aws_ecs_task_definition.restaurants_task_definition.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = var.networks["subnets"]
    security_groups  = var.networks["security_groups"]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.restaurants_target_group.arn
    container_name   = "restaurants"
    container_port   = 3002
  }

  deployment_controller {
    type = "ECS"
  }

  force_new_deployment = true
}
