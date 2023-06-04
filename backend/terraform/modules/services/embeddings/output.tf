output "embeddings_ip" {
  value = aws_lb.embeddings_load_balancer.dns_name
}
