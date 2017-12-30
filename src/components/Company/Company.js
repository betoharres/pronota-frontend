import React from 'react'
import Avatar from 'material-ui/Avatar'
import Paper from 'material-ui/Paper'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import CompanyIcon from 'material-ui/svg-icons/social/location-city'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit'

import { blueGrey500 } from 'material-ui/styles/colors'
import './styles.css'

export default function Company ({company, redirectTo}) {

  return (
    <div className='companyContainer'>
      <Paper className='upperPaperContainer' style={{backgroundColor: blueGrey500}}>
        <Avatar className='companyAvatar' size={200} icon={<CompanyIcon />} />
        <span className='companyName'>{company.get('name')}</span>
      </Paper>
      <Paper>
        <MenuItem primaryText={`Nome Fantasia: ${company.get('nomeFantasia')}`} />
        <MenuItem primaryText={`Domínio: ${company.get('subdomain')}`} />
        <MenuItem primaryText={`CNPJ: ${company.get('cnpj')}`} />
        <MenuItem primaryText={`Inscrição Municipal: ${company.get('inscMunicipal')}`} />
        {company.get('simplesNacional')
          ? <MenuItem primaryText={'Simples Nacional'} />
          : null}
        {company.get('incentivadorCultural')
          ? <MenuItem primaryText={'Incentivador Cultural'} />
          : null}
        <MenuItem primaryText={`Logradouro: ${company.get('logradouro')}`} />
        <MenuItem primaryText={`Numero: ${company.get('numero')}`} />
        {company.get('complemento')
          ? <MenuItem primaryText={`Complemento: ${company.get('complemento')}`} />
          : null}
        {company.get('bairro')
          ? <MenuItem primaryText={`Bairro: ${company.get('bairro')}`} />
          : null}
        {company.get('cep')
          ? <MenuItem primaryText={`CEP: ${company.get('cep')}`} />
          : null}
        {company.get('email')
          ? <MenuItem primaryText={`E-mail: ${company.get('email')}`} />
          : null}
        {company.get('fone')
          ? <MenuItem primaryText={`Fone: ${company.get('fone')}`} />
          : null}
        <RaisedButton
          label={'Editar'}
          fullWidth={true}
          secondary={true}
          icon={<EditIcon />}
          onClick={() => redirectTo(`/companies/${company.get('id')}/edit`)} />
      </Paper>
    </div>
  )

}
