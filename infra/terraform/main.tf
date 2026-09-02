module "resource_group" {
  source = "./modules/resource-group"

  name     = "${var.project_name}-${var.environment}-rg"
  location = var.location

  tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}

module "network" {
  source = "./modules/network"

  name                = "${var.project_name}-${var.environment}-vnet"
  resource_group_name = module.resource_group.name
  location            = var.location

  address_space = [
    "10.10.0.0/16"
  ]

  subnets = {
    app_gateway = {
      address_prefixes = ["10.10.1.0/24"]
    }

    container_apps = {
      address_prefixes = ["10.10.2.0/23"]
    }

    data = {
      address_prefixes = ["10.10.4.0/24"]
    }

    private_endpoints = {
      address_prefixes = ["10.10.5.0/24"]
    }
  }

  tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}

module "key_vault" {
  source = "./modules/key-vault"

  name                = "${var.project_name}-${var.environment}-kv"
  location            = var.location
  resource_group_name = module.resource_group.name
  tenant_id           = var.tenant_id

  tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}
