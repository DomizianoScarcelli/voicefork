resource "aws_ecs_task_definition" "users_task_definition" {
  family                   = "users-task-definition"
  execution_role_arn       = "arn:aws:iam::535455227633:role/LabRole"
  task_role_arn            = "arn:aws:iam::535455227633:role/LabRole"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "1024"
  memory                   = "5120"

  container_definitions = jsonencode([

    {
      "name" : "mysql_users",
      "image" : "mysql:latest",
      "cpu" : 0,
      "portMappings" : [
        {
          "name" : "mysql_users-3307-tcp",
          "containerPort" : 3307,
          "hostPort" : 3307,
          "protocol" : "tcp",
          "appProtocol" : "http"
        }
      ],
      "essential" : true,
      "command" : [
        "--default-authentication-plugin=mysql_native_password"
      ],
      "environment" : [
        {
          "name" : "MYSQL_DATABASE",
          "value" : "usersDB"
        },
        {
          "name" : "MYSQL_PASSWORD",
          "value" : "admin"
        },
        {
          "name" : "MYSQL_ROOT_PASSWORD",
          "value" : "root"
        },
        {
          "name" : "MYSQL_USER",
          "value" : "admin"
        },
        {
          "name" : "MYSQL_TCP_PORT",
          "value" : "3308"
        }
      ],
      "mountPoints" : [
        {
          "sourceVolume" : "mysql_users",
          "containerPath" : "/var/lib/mysql",
          "readOnly" : false
        }
      ],
      "volumesFrom" : [],
      "logConfiguration" : {
        "logDriver" : "awslogs",
        "options" : {
          "awslogs-create-group" : "true",
          "awslogs-group" : "/ecs/users-task-definition",
          "awslogs-region" : "us-east-1",
          "awslogs-stream-prefix" : "ecs"
        }
      },
      "healthCheck" : {
        "command" : [
          "mysqladmin",
          "ping",
          "-h",
          "127.0.0.1",
          "-P",
          "3307",
          "-u",
          "admin",
          "-padmin"
        ],
        "interval" : 30,
        "timeout" : 5,
        "retries" : 3,
        "startPeriod" : 60
      }
    },
    {
      "name" : "users",
      "image" : "doviscarcelli/users:latest",
      "cpu" : 0,
      "portMappings" : [
        {
          "name" : "users-3001-tcp",
          "containerPort" : 3001,
          "hostPort" : 3001,
          "protocol" : "tcp",
          "appProtocol" : "http"
        }
      ],
      "essential" : true,
      "entryPoint" : [
        "sh",
        "-c",
        "npx prisma migrate deploy;npm run build;npm start"
      ],
      "environment" : [
        {
          "name" : "PORT",
          "value" : "3001"
        },
        {
          "name" : "DATABASE_URL",
          "value" : "mysql://root:root@localhost:3008/usersDB"
        }
      ],
      "mountPoints" : [],
      "volumesFrom" : [],
      "dependsOn" : [
        {
          "containerName" : "mysql_users",
          "condition" : "HEALTHY"
        }
      ],
      "logConfiguration" : {
        "logDriver" : "awslogs",
        "options" : {
          "awslogs-create-group" : "true",
          "awslogs-group" : "/ecs/users-task-definition",
          "awslogs-region" : "us-east-1",
          "awslogs-stream-prefix" : "ecs"
        }
      }
    }
    ]
  )
  volume {
    name = "mysql_users"
  }
}


resource "aws_lb_target_group" "users_target_group" {
  name        = "users-target-group"
  port        = 3001
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = "vpc-00c21a18456d3882e"
}

resource "aws_lb" "users_load_balancer" {
  name               = "users-load-balancer"
  load_balancer_type = "application"
  subnets            = var.networks["subnets"]
  security_groups    = var.networks["security_groups"]
}

resource "aws_lb_listener" "users_listener" {
  load_balancer_arn = aws_lb.users_load_balancer.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    target_group_arn = aws_lb_target_group.users_target_group.arn
    type             = "forward"
  }
}
resource "aws_appautoscaling_target" "users_autoscaling_target" {
  max_capacity       = 10
  min_capacity       = 1
  resource_id        = "service/${var.voicefork_cluster.name}/${aws_ecs_service.users_service.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}


resource "aws_ecs_service" "users_service" {
  name            = "users-service_namespace"
  cluster         = var.voicefork_cluster.id
  task_definition = aws_ecs_task_definition.users_task_definition.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = var.networks["subnets"]
    security_groups  = var.networks["security_groups"]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.users_target_group.arn
    container_name   = "users"
    container_port   = 3001
  }

  deployment_controller {
    type = "ECS"
  }
}
