import React, { Component } from 'react'
import { Field } from 'redux-form/immutable'

import {
  AutoCompleteForm,
  TextForm,
  SelectForm,
} from '../../components/FormComponents'

import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import MenuItem from 'material-ui/MenuItem'

import { parseToAutocomplete } from '../../utils'
import { cidades } from '../../datasources'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from '../../redux/modules/user'

import { required, alphaNumeric, number } from '../../validations'
import './styles.css'

// TODO: Validate valorServicos
class ServiceForm extends Component {

  render () {
    return (
      <div>
        <div className='dividerService'>
          <Subheader>Serviço</Subheader>
          <Divider />
        </div>
        <div className='serviceField'>
          <Field name='cidadeId' label='Cidade' component={AutoCompleteForm}
            dataSource={cidades} dataSourceConfig={{text: 'nome', value: 'id'}}
            validate={[alphaNumeric, required]} />
        </div>
        <div className='serviceField'>
          <Field
            name='activityId'
            component={SelectForm}
            validate={[required]}
            label='Atividade'>
            {this.props.activities.valueSeq().map((activity, index) =>
              <MenuItem key={index} value={activity.get('id')} primaryText={activity.get('nome')} />
            )}
          </Field>
        </div>
        <div className='serviceField'>
          <Field
            name='valorServicos'
            label='Valor Servicos'
            component={TextForm}
            validate={[required, number]} />
        </div>
        {/* <div className='serviceField'> */}
        {/*   <Field name='aliquotaServicos' label='Aliquota do Servico' */}
        {/*     component={TextForm} validate={[number]} /> */}
        {/* </div> */}
        {/* <div className='serviceField'> */}
        {/*   <Field name='valorDeducoes' label='Valor Deducoes' component={TextForm} */}
        {/*     validate={[number]} /> */}
        {/* </div> */}
        {/* <div className='serviceField'> */}
        {/*   <Field name='valorPis' label='Valor PIS' component={TextForm} */}
        {/*     validate={[number]} /> */}
        {/* </div> */}
        {/* <div className='serviceField'> */}
        {/*   <Field name='valorCofins' label='Valor Cofins' component={TextForm} */}
        {/*     validate={[number]} /> */}
        {/* </div> */}
        {/* <div className='serviceField'> */}
        {/*   <Field name='valorInss' label='Valor INSS' component={TextForm} */}
        {/*     validate={[number]} /> */}
        {/* </div> */}
        {/* <div className='serviceField'> */}
        {/*   <Field name='valorIr' label='Valor IR' component={TextForm} */}
        {/*     validate={[number]} /> */}
        {/* </div> */}
        {/* <div className='serviceField'> */}
        {/*   <Field name='valorCsll' label='Valor CSLL' component={TextForm} */}
        {/*     validate={[number]} /> */}
        {/* </div> */}
        {/* <div className='serviceField'> */}
        {/*   <Field name='valorIssRetido' label='Valor ISS Retido' */}
        {/*     component={TextForm} validate={[number]} /> */}
        {/* </div> */}
        {/* <div className='serviceField'> */}
        {/*   <Field name='valorDescIncond' label='Valor Desconto Incondicionado' */}
        {/*     component={TextForm} validate={[number]} /> */}
        {/* </div> */}
        {/* <div className='serviceField'> */}
        {/*   <Field name='valorDescCond' label='Valor Desconto Condicionado' */}
        {/*      component={TextForm} validate={[number]} /> */}
        {/* </div> */}
        {/* <div className='serviceField'> */}
        {/*   <Field name='outrasRetencoes' label='Outras Retencoes' */}
        {/*      component={TextForm} validate={[number]} /> */}
        {/* </div> */}
        {/* <div className='serviceField'> */}
        {/*   <Field name='valorLiquidoNfse' label='Valor Liquido NFSE' */}
        {/*     component={TextForm} validate={[number]} /> */}
        {/* </div> */}
      </div>
    )
  }
}

function mapStateToProps ({ user, activities }) {
  activities = activities.delete('status')
  const autocompleteActivities = parseToAutocomplete(activities, {id: 'id', text: 'nome'})

  return {
    activities,
    autocompleteActivities,
    currentSubdomain: user.get('currentSubdomain'),
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({...userActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceForm)
