resource "aws_ecs_task_definition" "restaurants_task_definition" {
  family                   = "restaurants-task-definition"
  execution_role_arn       = "arn:aws:iam::535455227633:role/LabRole"
  task_role_arn            = "arn:aws:iam::535455227633:role/LabRole"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "1024"
  memory                   = "5120"
  container_definitions = jsonencode(
    [
      {
        "name" : "restaurants",
        "image" : "doviscarcelli/restaurants",
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
            "value" : "postgresql://admin:admin@localhost:5432/restaurantsDB?connection_limit=10000"
          },
          {
            "name" : "PORT",
            "value" : "3002"
          },
          {
            "name" : "MINIO_ACCESS_KEY",
            "value" : ""
          },
          {
            "name" : "USE_MINIO_LOCAL",
            "value" : "false"
          },
          {
            "name" : "AWS_SECRET_KEY",
            "value" : ""
          },
          {
            "name" : "AWS_ACCESS_KEY",
            "value" : ""
          },
          {
            "name" : "MINIO_SECRET_KEY",
            "value" : ""
          }
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
      },
      {
        "name" : "postgres_restaurants",
        "image" : "postgres",
        "cpu" : 0,
        "portMappings" : [
          {
            "name" : "postgres_restaurants-5432-tcp",
            "containerPort" : 5432,
            "hostPort" : 5432,
            "protocol" : "tcp",
            "appProtocol" : "http"
          }
        ],
        "essential" : false,
        "command" : [
          "bash",
          "-c",
          "/usr/local/bin/docker-entrypoint.sh postgres & while ! pg_isready -h localhost -p 5432 > /dev/null 2>&1; do sleep 1; done && apt-get update && apt-get install -y postgis && PGPASSWORD=admin psql -h localhost -U admin restaurantsDB -c 'CREATE EXTENSION postgis;' && tail -f /dev/null"
        ],
        "environment" : [
          {
            "name" : "POSTGRES_USER",
            "value" : "admin"
          },
          {
            "name" : "POSTGRES_PASSWORD",
            "value" : "admin"
          },
          {
            "name" : "POSTGRES_DB",
            "value" : "restaurantsDB"
          }
        ],
        "environmentFiles" : [],
        "mountPoints" : [
          {
            "sourceVolume" : "postgres_restaurants",
            "containerPath" : "/var/lib/postgres",
            "readOnly" : false
          }
        ],
        "volumesFrom" : [],
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
  subnets = ["subnet-0ebcbd5c5542a0ee3",
    "subnet-0ed8750f0b61f788c",
    "subnet-0b1597f211f5a2c35",
    "subnet-0973965c726625638",
    "subnet-03887a0141f62d2f4",
    "subnet-03887a0141f62d2f4",
  "subnet-076d076632b06d637"]
  security_groups = ["sg-02c4f407d06dc2383"]
}

resource "aws_lb_target_group" "restaurants_target_group" {
  name        = "restaurants-target-group"
  port        = 3002
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = "vpc-00c21a18456d3882e"
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


resource "aws_ecs_service" "restaurants_service" {
  name            = "restaurants_service"
  cluster         = var.voicefork_cluster.id
  task_definition = aws_ecs_task_definition.restaurants_task_definition.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    security_groups = ["sg-02c4f407d06dc2383"]
    subnets = ["subnet-0ebcbd5c5542a0ee3",
      "subnet-0ed8750f0b61f788c",
      "subnet-0b1597f211f5a2c35",
      "subnet-0973965c726625638",
      "subnet-03887a0141f62d2f4",
      "subnet-03887a0141f62d2f4",
    "subnet-076d076632b06d637"]
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
}
