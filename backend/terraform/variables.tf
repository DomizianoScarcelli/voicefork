
//CHANGE THIS WITH YOUR CONFIGURATION
variable "networks" {
  type = map(any)
  default = {
    subnets         = ["subnet-089117dcf1b91e18a", "subnet-03c82b4e6252fae07", "subnet-0f6d7e81adec4cb9c", "subnet-013b81eb25214ecda", "subnet-08997fe51980b9d40", "subnet-0825627b1d57ec9de"]
    security_groups = ["sg-0e801f1c563af544c"]
  }
}

//CHANGE THIS WITH YOUR OWN VPC ID
variable "vpc" {
  type    = string
  default = "vpc-0df5d109231a1557f"
}