
# resource "aws_db_instance" "rds_postgresql" {
#   identifier          = "my-rds-instance"
#   engine              = "postgres"
#   engine_version      = "13.4"
#   instance_class      = "db.t2.micro" # Replace with your desired instance type
#   allocated_storage   = 3
#   storage_type        = "gp2"
#   storage_encrypted   = true
#   publicly_accessible = false
#   multi_az            = false
#   name                = "mydatabase"
#   username            = "myuser"
#   password            = "mypassword"

#   vpc_security_group_ids = ["sg-12345678"] # Replace with your security group ID(s)

#   tags = {
#     Name = "MyRDSInstance"
#   }
# }

# resource "aws_db_parameter_group" "postgis_parameters" {
#   name   = "postgis-parameters"
#   family = "postgres13"

#   parameter {
#     name  = "shared_preload_libraries"
#     value = "postgis"
#   }
# }

# resource "aws_rds_cluster_parameter_group" "postgis_parameters" {
#   name        = "postgis-cluster-parameters"
#   family      = "aurora-postgresql13"
#   description = "Custom parameter group for PostGIS"

#   parameter {
#     name  = "shared_preload_libraries"
#     value = "postgis"
#   }
# }

# resource "aws_db_instance_parameter_group" "postgis_parameters" {
#   name        = "postgis-instance-parameters"
#   family      = "postgres13"
#   description = "Custom parameter group for PostGIS"

#   parameter {
#     name  = "shared_preload_libraries"
#     value = "postgis"
#   }
# }
