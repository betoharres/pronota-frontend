import React from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Subheader from 'material-ui/Subheader'
import SelectField from 'material-ui/SelectField'
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline'
import AccountIcon from 'material-ui/svg-icons/action/account-circle'
import RoleIcon from 'material-ui/svg-icons/action/assignment-ind'
import ReceiptIcon from 'material-ui/svg-icons/action/receipt'
import WorkIcon from 'material-ui/svg-icons/action/work'
import ClientsIcon from 'material-ui/svg-icons/communication/business'
import CertificatesIcon from 'material-ui/svg-icons/hardware/security'

export default function AppDrawer ({
  isOpen,
  toggleDrawer,
  hasSmallScreen,
  navBarTitle,
  selectCompany,
  onRedirectTo,
  companies,
  currentCompanyId,
  isDisabled,
}) {

  return (
    <Drawer
      docked={!(hasSmallScreen)}
      autoWidth={true}
      open={isOpen}
      onRequestChange={(isOpen) => toggleDrawer(!isOpen)}>
      <span>
        <AppBar
          iconElementLeft={<span />}
          titleStyle={{fontWeight: 100}}
          title={navBarTitle} />
        <Menu>
          <Subheader>Minhas Empresas</Subheader>
          <SelectField disabled={companies.size === 0}
            value={Number(currentCompanyId)}
            style={{marginLeft: 20, maxWidth: 220}}>
            {companies.size > 0
              ? companies.valueSeq().map((company) => (
                <MenuItem key={company.get('id')}
                  value={company.get('id')}
                  primaryText={company.get('name')}
                  onClick={() => selectCompany(company.get('id'))} />
                ))
              : null}
          </SelectField>
          <MenuItem leftIcon={<AccountIcon />} primaryText='Minha Conta'
            onClick={() => onRedirectTo('/account')} />
          <MenuItem leftIcon={<RoleIcon />} primaryText='Permissōes'
            disabled={isDisabled} onClick={() => onRedirectTo('/roles')} />
          <MenuItem leftIcon={<ReceiptIcon />} primaryText='RPS'
            disabled={isDisabled} onClick={() => onRedirectTo('/rps')} />
          <MenuItem leftIcon={<ClientsIcon />} primaryText='Clientes'
            disabled={isDisabled} onClick={() => onRedirectTo('/clients')} />
          <MenuItem leftIcon={<WorkIcon />} primaryText='Atividades'
            disabled={isDisabled} onClick={() => onRedirectTo('/activities')} />
          <MenuItem leftIcon={<CertificatesIcon />} primaryText='Certificados'
            disabled={isDisabled} onClick={() => onRedirectTo('/certificates')} />
          <Subheader>Criar Empresa/Cliente</Subheader>
          <MenuItem leftIcon={<AddIcon />} primaryText='Nova Empresa'
            onClick={() => onRedirectTo('/companies/new')} />
          <MenuItem leftIcon={<AddIcon />} primaryText='Nova Filial'
            disabled={isDisabled} onClick={() => onRedirectTo('/affiliates/new')} />
          <MenuItem leftIcon={<AddIcon />} primaryText='Novo Cliente'
            disabled={isDisabled} onClick={() => onRedirectTo('/clients/new')} />
        </Menu>
      </span>
    </Drawer>
  )

}
