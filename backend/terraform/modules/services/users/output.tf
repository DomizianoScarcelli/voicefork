output "users_ip" {
  value = aws_lb.users_load_balancer.dns_name
}
