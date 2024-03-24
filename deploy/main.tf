# Cloud Provider
provider "aws" {
  region     = "us-east-1"
  access_key = var.access_key
  secret_key = var.secret_key
}

# Security Group
resource "aws_security_group" "app_sg" {
  name        = "app-sg"
  description = "Allow inbound traffic for EC2 and RDS instances"

  ingress {
    cidr_blocks = [
      "0.0.0.0/0"
    ]
    from_port = 22
    to_port   = 22
    protocol  = "tcp"
  }

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Aurora PostgreSQL cluster
resource "aws_rds_cluster" "aurora_postgresql" {
  cluster_identifier           = "app-aurora-cluster"
  engine                       = "aurora-postgresql"
  engine_version               = "14"
  master_username              = var.db_username
  master_password              = var.db_password
  database_name                = "mail_db"

  vpc_security_group_ids       = [aws_security_group.app_sg.id]

  skip_final_snapshot         = true
  tags = {
    Name = "Aurora PostgreSQL Cluster"
  }
}

# Aurora PostgreSQL instance (primary)
resource "aws_rds_cluster_instance" "aurora_instance_primary" {
  count               = 1
  cluster_identifier  = aws_rds_cluster.aurora_postgresql.id
  instance_class      = "db.t3.medium"
  engine              = "aurora-postgresql"
  publicly_accessible = true
  
}

# Aurora PostgreSQL instance (replica)
resource "aws_rds_cluster_instance" "aurora_instance_replica" {
  count               = 1 
  cluster_identifier  = aws_rds_cluster.aurora_postgresql.id
  instance_class      = "db.t3.medium"
  engine              = "aurora-postgresql"
  publicly_accessible = true
}

# EC2 Instance
resource "aws_instance" "ec2" {
  ami             = "ami-080e1f13689e07408"
  instance_type   = "t2.small"
  key_name        = "terraform-key"
  security_groups = [aws_security_group.app_sg.name]
  user_data = <<-EOF
              #!/bin/bash
              sudo apt-get update
              sudo apt-get install -y docker.io git
              sudo systemctl start docker
              sudo systemctl enable docker
              sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
              sudo chmod +x /usr/local/bin/docker-compose
              git clone https://github.com/rABrL/mail-app-fellowship
              cd mail-app-fellowship
              export DEV_ALLOWED_HOST=0.0.0.0:8000
              export PROD_ALLOWED_HOST=0.0.0.0:8000
              export DEV_ALLOWED_ORIGIN=http://localhost:3000
              export PROD_ALLOWED_ORIGIN=http://localhost:3000
              export NEXT_PUBLIC_API_URL=http://localhost:8000          
              export DJANGO_SECRET_KEY=
              export DB_PASSWORD=
              export DB_HOST=
              export SMTP_USER=
              export SMTP_PASSWORD=
              export SMTP_SERVER=
              export SMTP_PORT=
              sudo docker-compose up --build
              EOF
  root_block_device{
    volume_size=12
  }
  tags = {
    Name = "mail-ec2"
  }
}