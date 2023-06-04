output "restaurants_ip" {
  value = aws_lb.restaurants_load_balancer.dns_name
}
