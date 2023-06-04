output "proxy_ip" {
  value = aws_lb.proxy_load_balancer.dns_name
}
