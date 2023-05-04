#!/bin/bash
ecs-cli configure profile --profile-name "DomizianoScarcelli" \
    --access-key "ASIAXZK46L3Y5XRIFPG2" \
    --secret-key "h+jpFLShGMIk9hZM2n3+bkdEEV7lC9yBuNhWphZJ" \
    --session-token "FwoGZXIvYXdzEPf//////////wEaDOK2oQYyMswnqJghqyLXATs6y0Ap82Q3d9fQv1sjvft5zMXW+CbLILNSAwnOgyYc074sypAxgwqRX/ooR5NKU7epXF00YDsutAjC9xLy0NXpNOmNaoP4fIgE3ecftb9sX6ijGJJhx7vYHckQQrLEd42AKbhd/BgWSIdpCb/CDiLXkOoX6x2FZbrsnhlUihD7d+eOVcHolU1afYsVviRWQyDW/cWMogcg8HqUqpOTnBJBqcvfZizOh79lFEl081MS+BO7WmmdC/SG0sODE4ie5OgksMrx0cVTUNBfuuaqraCRiLt1IcSXKLD0zqIGMi2AQROP9dP578zwXUzKg0MVJ1KMAqX2AGw0nrrQOzXJsCXPjBIJmtY80Sv6A/Q="

ecs-cli configure --cluster "voicefork-cluster" --default-launch-type "EC2" --region "us-east-1" --config-name "DomizianoScarcelli"

aws ec2 create-key-pair --key-name voicefork-cluster \
 --query 'KeyMaterial' --output text > ~/.ssh/voicefork-cluster.pem

ecs-cli up \
    --keypair voicefork-cluster  \
    --capability-iam \
    --size 2 \
    --instance-type t3.small \
    --tags project=voicefork-cluster,owner=DomizianoScarcelli \
    --cluster-config DomizianoScarcelli \
    --ecs-profile DomizianoScarcelli