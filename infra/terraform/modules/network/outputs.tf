output "vnet_id" {
  description = "The ID of the Virtual Network"
  value       = azurerm_virtual_network.this.id
}

output "vnet_name" {
  description = "The name of the Virtual Network"
  value       = azurerm_virtual_network.this.name
}

output "subnet_ids" {
  description = "A map of subnet names to subnet IDs"

  value = {
    for name, subnet in azurerm_subnet.this :
    name => subnet.id
  }
}
