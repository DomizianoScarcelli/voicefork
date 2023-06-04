resource "aws_db_instance" "rds_postgresql" {
  identifier             = "postgres-restaurants"
  engine                 = "postgres"
  engine_version         = "13.4"
  instance_class         = "db.t3.micro"
  allocated_storage      = 5
  storage_type           = "gp2"
  storage_encrypted      = false
  publicly_accessible    = true
  multi_az               = false
  username               = "root"
  password               = "mariomariomario"
  vpc_security_group_ids = var.networks["security_groups"]
  skip_final_snapshot    = true
  tags = {
    Name = "RestaurantsDB"
  }
}

output "database_url" {
  value = aws_db_instance.rds_postgresql.endpoint
}
