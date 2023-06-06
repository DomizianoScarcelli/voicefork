
//CHANGE THIS WITH YOUR CONFIGURATION
variable "networks" {
  type = map(any)
  default = {
    subnets         = ["subnet-0b43a0fd1886a403c", "subnet-0516f4cd0cf2f01b1", "subnet-06c7559148913e71e", "subnet-062045a3cff45e208", "subnet-0c7bb639cbfadb4ec", "subnet-0cf090ada20d8d548"]
    security_groups = ["sg-07354e11fc65eda88"]
  }
}

//CHANGE THIS WITH YOUR OWN VPC ID
variable "vpc" {
  type    = string
  default = "vpc-00c21a18456d3882e"
}
