import React from 'react'
import Drawer from 'material-ui/Drawer'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline'

export default function CompaniesDrawer ({
  isOpen,
  toggleDrawer,
  redirectToNewCompany,
  hasSmallScreen,
  selectCompany,
  companies,
}) {

  return (
    <Drawer
      docked={!(hasSmallScreen)}
      autoWidth={true}
      open={isOpen}
      onRequestChange={(isOpen) => toggleDrawer(!isOpen)}>
      <Menu>
        <Subheader>Empresas</Subheader>
        <div>
          {companies.size > 0
          ? companies.valueSeq().map((company) => (
            <MenuItem key={company.get('id')} primaryText={company.get('name')}
              onClick={() => selectCompany(company.get('id'))} />
            ))
          : null}
          <Divider />
        </div>
        <MenuItem leftIcon={<AddIcon />} primaryText='Nova Empresa' onTouchTap={redirectToNewCompany} />
      </Menu>
    </Drawer>
  )

}
