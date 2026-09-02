output "resource_group_name" {
  description = "The name of the ContractFlow Resource Group"
  value       = module.resource_group.name
}

output "resource_group_id" {
  description = "The ID of the ContractFlow Resource Group"
  value       = module.resource_group.id
}

output "vnet_name" {
  description = "The name of the ContractFlow Virtual Network"
  value       = module.network.vnet_name
}

output "vnet_id" {
  description = "The ID of the ContractFlow Virtual Network"
  value       = module.network.vnet_id
}

output "subnet_ids" {
  description = "Map of ContractFlow subnet names to IDs"
  value       = module.network.subnet_ids
}

output "key_vault_name" {
  description = "The name of the ContractFlow Azure Key Vault"
  value       = module.key_vault.name
}

output "key_vault_id" {
  description = "The ID of the ContractFlow Azure Key Vault"
  value       = module.key_vault.id
}

output "key_vault_uri" {
  description = "The URI of the ContractFlow Azure Key Vault"
  value       = module.key_vault.vault_uri
}
