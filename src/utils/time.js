const companyExpiration = 1800
const rolesExpiration = 1000
const userRoleExpiration = 1800

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

