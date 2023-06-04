output "reservations_ip" {
  value = aws_lb.reservations_load_balancer.dns_name
}
