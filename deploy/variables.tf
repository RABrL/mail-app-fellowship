variable "access_key" {
    type = string
}

variable "secret_key" {
    type = string
}

variable "db_username" {
    type = string
    default = "postgres"
}

variable "db_password" {
    type = string
    default = "12345678"
}

variable "ec2_key_name" {
    type = string
    default = "terraform-key"
}