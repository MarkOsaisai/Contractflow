variable "project_name" {
  description = "The name of the project"
  type        = string
  default     = "contractflow"
}

variable "environment" {
  description = "The deployment environment"
  type        = string
  default     = "dev"
}

variable "location" {
  description = "The Azure region for resource deployment"
  type        = string
  default     = "eastus"
}

variable "tenant_id" {
  description = "The Azure AD tenant ID for the Azure subscription"
  type        = string
}
