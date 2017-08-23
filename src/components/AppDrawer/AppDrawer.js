import React from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline'
import AccountIcon from 'material-ui/svg-icons/action/account-circle'
import RoleIcon from 'material-ui/svg-icons/action/assignment-ind'

export default function AppDrawer ({
  isOpen,
  toggleDrawer,
  hasSmallScreen,
  navBarTitle,
  selectCompany,
  onRedirectTo,
  companies,
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
          <MenuItem leftIcon={<AccountIcon />} primaryText='Minha Conta'
            onTouchTap={() => onRedirectTo('/account')} />
          <MenuItem leftIcon={<RoleIcon />} primaryText='Permissōes'
            onTouchTap={() => onRedirectTo('/roles')} />
          <MenuItem leftIcon={<AddIcon />} primaryText='Novo RPS'
            onTouchTap={() => onRedirectTo('/rps/new')} />
          <Subheader>Minhas Empresas</Subheader>
          <div>
            {companies.size > 0
            ? companies.valueSeq().map((company) => (
              <MenuItem key={company.get('id')} primaryText={company.get('name')}
                onClick={() => selectCompany(company.get('id'))} />
              ))
            : null}
            <Divider />
          </div>
          <MenuItem leftIcon={<AddIcon />} primaryText='Nova Empresa'
            onTouchTap={() => onRedirectTo('/companies/new')} />
          <MenuItem leftIcon={<AddIcon />} primaryText='Nova Filial'
            onTouchTap={() => onRedirectTo('/affiliates/new')} />
          <MenuItem leftIcon={<AddIcon />} primaryText='Novo Cliente'
            onTouchTap={() => onRedirectTo('/clients/new')} />
        </Menu>
      </span>
    </Drawer>
  )

}
