# hckrnst cloud formation template
Deploys a Single docker container Elastic Beanstalk by default running nginx from Dockerhub.
Upon deployment via `eb cli` the container will be replaced with the hckrnst container

## Environment setup


### set required variables

```
app="hckrnst"
az_mode="2AZs"
stack_name="${app}-${az_mode}"
vpc_subnet="10.$(echo $((((${RANDOM} + 1) % 256)))).0.0/16"
region="us-east-1"
```

### Install aws-cli
`pip3 install awscli`

### Configure awscli
`aws configure ${app}` and enter your key from the IAM console.

## Deploy a new stack

### (once) Store the EC2 Key
```
aws ec2 create-key-pair --profile ${app} --region ${region} --key-name "EC2KeyPair-${app}" > ./ec2-private-key
```

### (once) Store the silkstart API Key
```
aws ssm put-parameter\
    --name "/__vault__/${stack_name}/hckrnst/SILKSTART_API_KEY"\
    --description 'SilkStart API Key'\
    --value "abc123"\
    --type String\
    --profile ${app} --region ${region} | jq -r '.'
```

### pacakge
```
aws s3api create-bucket\
    --acl private\
    --bucket cloudformation-${app}\
    --profile ${app}\
    --region ${region} | jq -r '.'

mkdir -p __dist__/aws-cf-templates/hckrnst

aws cloudformation package\
    --template-file aws-cf-templates/main-template.yml\
    --s3-bucket cloudformation-${app}\
    --output-template-file __dist__/aws-cf-templates/hckrnst/main.yml\
    --profile ${app}\
    --region ${region}
```

### deploy the cloudformation template
```
solution_stack_name="$(aws elasticbeanstalk list-available-solution-stacks\
      --profile ${app} --region ${region}\
      | jq -r '.SolutionStacks[]'\
      | grep -E "^64bit Amazon Linux\s[0-9]+\..*\srunning Single Container Docker\s.*\s\(Generic\)$" | head -n 1)"


aws cloudformation deploy\
--stack-name ${stack_name}\
--template-file __dist__/templates/thrive-online/main.yml\
--s3-bucket cloudformation-${AWS_CHILD_ACCOUNT_ALIAS}\
--s3-prefix templates/thrive-online\
--profile ${AWS_CHILD_ACCOUNT_ALIAS}\
--region ${AWS_DEFAULT_REGION}\
--notification-arns ${notification_topic_child}\
--capabilities CAPABILITY_NAMED_IAM\
--parameter-overrides\
SolutionStackName="${solution_stack_name}"\
BaseSubnet=${vpc_subnet}\
AZCount=${az_mode}\
CertbotEmailAddress="dallas@hackernest.com"\
ExternalDomainName="hckrnst.dolabs.io"\
EC2KeyName="EC2KeyPair-hckrnst"\

```
### tear down the stack when you're done
Go to AWS Console > CloudFormation
Delete the hckrnst stack

## Deploy the application using eb cli

TBD