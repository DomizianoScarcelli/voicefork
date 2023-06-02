# Terraform Setup

First, [install Terraform](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli).
Then go to `~/.aws/credentials` (IDK where it is in Windows) and paste the AWS credentials you find in the lab session. I think you can also do `aws configure` instead.

Insert your configuration inside the `terraform/variable.tf` file, that includes the vpc id, security group id and the subnets ids.

Then do

```
terraform init
```

To deploy do:

```
terraform apply
```

and then insert `yes` when prompted.

To destroy everything do

```
terraform destroy
```
