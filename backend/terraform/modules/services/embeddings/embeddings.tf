data "aws_caller_identity" "current" {}

resource "aws_ecs_task_definition" "embeddings_task_definition" {
  family                   = "embeddings-task-definition"
  execution_role_arn       = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/LabRole"
  task_role_arn            = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/LabRole"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "512"
  memory                   = "4096"

  container_definitions = jsonencode(
    [
      {
        "name" : "embeddings",
        "image" : "doviscarcelli/embeddings-amd64:latest",
        "cpu" : 0,
        "portMappings" : [
          {
            "name" : "embeddings-3004-tcp",
            "containerPort" : 3004,
            "hostPort" : 3004,
            "protocol" : "tcp",
            "appProtocol" : "http"
          }
        ],
        "essential" : true,
        "environment" : [
          {
            "name" : "LOCAL_MODE",
            "value" : "false"
          }
        ],
        "mountPoints" : [],
        "volumesFrom" : [],
        "logConfiguration" : {
          "logDriver" : "awslogs",
          "options" : {
            "awslogs-create-group" : "true",
            "awslogs-group" : "/ecs/embeddings-task-definition",
            "awslogs-region" : "us-east-1",
            "awslogs-stream-prefix" : "ecs"
          }
        }
      },
      {
        "name" : "redis",
        "image" : "redis",
        "cpu" : 0,
        "portMappings" : [
          {
            "name" : "redis-6379-tcp",
            "containerPort" : 6379,
            "hostPort" : 6379,
            "protocol" : "tcp",
            "appProtocol" : "http"
          }
        ],
        "essential" : false,
        "environment" : [],
        "mountPoints" : [],
        "volumesFrom" : []
      }
    ]
  )
}




resource "aws_lb" "embeddings_load_balancer" {
  name               = "embeddings-load-balancer"
  load_balancer_type = "application"
  subnets            = var.networks["subnets"]
  security_groups    = var.networks["security_groups"]
}

resource "aws_lb_target_group" "embeddings_target_group" {
  name        = "embeddings-target-group"
  port        = 3004
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = var.vpc
}
resource "aws_lb_listener" "listener" {
  load_balancer_arn = aws_lb.embeddings_load_balancer.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    target_group_arn = aws_lb_target_group.embeddings_target_group.arn
    type             = "forward"
  }
}

resource "aws_appautoscaling_target" "embeddings_autoscaling_target" {
  max_capacity       = 10
  min_capacity       = 1
  resource_id        = "service/${var.voicefork_cluster.name}/${aws_ecs_service.embeddings_service.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}

resource "aws_appautoscaling_policy" "embeddings_autoscaling_policy" {
  name               = "embeddings-autoscaling-policy"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.embeddings_autoscaling_target.resource_id
  scalable_dimension = aws_appautoscaling_target.embeddings_autoscaling_target.scalable_dimension
  service_namespace  = aws_appautoscaling_target.embeddings_autoscaling_target.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }
    target_value       = 60
    scale_in_cooldown  = 30
    scale_out_cooldown = 20
  }
}


resource "aws_ecs_service" "embeddings_service" {
  name            = "embeddings-service"
  cluster         = var.voicefork_cluster.id
  task_definition = aws_ecs_task_definition.embeddings_task_definition.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = var.networks["subnets"]
    security_groups  = var.networks["security_groups"]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.embeddings_target_group.arn
    container_name   = "embeddings"
    container_port   = 3004
  }

  deployment_controller {
    type = "ECS"
  }

  force_new_deployment = true
}
