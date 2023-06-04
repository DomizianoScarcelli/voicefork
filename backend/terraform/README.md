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

In order to install `postgis` in the RDS Restaurants Database, go into `terraform/modules/databases/restaurants-db` and run:

```
sh ./install-postgis.sh
```

This will install a python package to connect to the database, and install the extension there. If the extension has been installed propertly you should see `CREATE EXTENSION` when the command has finish executing. Once done this close the terminal (because idk how to exit postgres connection inside of the terminal).

To destroy everything do

```
terraform destroy
```
