const companyExpiration = 0 // 36000
const rolesExpiration = 0 // 18000
const userRoleExpiration = 0 // 10000

function getMilliseconds (timestamp) {
  return new Date().getTime() - new Date(timestamp).getTime()
}

export function staleCompany (timestamp) {
  return getMilliseconds(timestamp) > companyExpiration
}

export function staleRoles (timestamp) {
  return getMilliseconds(timestamp) > rolesExpiration
}

export function staleUserRole (timestamp) {
  return getMilliseconds(timestamp) > userRoleExpiration
}

