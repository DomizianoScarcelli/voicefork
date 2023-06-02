# Terraform Setup

First, [install Terraform](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli).
Then go to `~/.aws/credentials` (IDK where it is in Windows) and paste the AWS credentials you find in the lab session. I think you can also do `aws configure` instead.

Then go into the `terraform/` folder and do:

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
