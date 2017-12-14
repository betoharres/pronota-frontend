export const required = value => (value ? undefined : 'Obrigatorio')

export const number = value =>
  value && isNaN(Number(value)) ? 'Deve ser numerico' : undefined

export const exactLength = size => value =>
  value && value.length !== size ? `Deve conter ${size} digitos` : undefined

export const maxLength = max => value =>
  value && value.length > max ? `Deve ser no maximo ${max} caracteres ou menos` : undefined

export const minLength = min => value =>
  value && value.length < min ? `Deve ser no minimo ${min} caracteres ou mais` : undefined

export const minValue = min => value =>
  value && value < min ? `Deve ser no minimo ${min}` : undefined

export const maxValue = max => value =>
  value && value > max ? `Deve ser no maximo ${max}` : undefined

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'E-mail invalido'
    : undefined

export const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Somente letras e numeros'
    : undefined

// ref: https://github.com/tapajos/brazilian-rails/blob/master/brcpfcnpj/lib/brcpfcnpj/cpf_cnpj.rb
export const cpf = value =>
  value && !/^(\d{3}\.?\d{3}\.?\d{3})-?(\d{2})$/.test(value)
    ? 'CPF invalido'
    : undefined

export const cnpj = value =>
  value && !/^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4})-?(\d{2})$/.test(value)
    ? 'CNPJ invalido'
    : undefined
