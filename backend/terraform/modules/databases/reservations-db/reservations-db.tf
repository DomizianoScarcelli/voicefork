resource "aws_db_instance" "rds_mysql" {
  identifier             = "mysql-reservations"
  engine                 = "mysql"
  engine_version         = "8.0"
  instance_class         = "db.t3.micro"
  allocated_storage      = 5
  storage_type           = "gp2"
  storage_encrypted      = false
  publicly_accessible    = true
  multi_az               = false
  username               = "root"
  password               = "mariomariomario"
  vpc_security_group_ids = var.networks["security_groups"]
  tags = {
    Name = "ReservationsDB"
  }
}

output "database_url" {
  value = aws_db_instance.rds_mysql.endpoint
}






