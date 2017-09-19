import React, { Component } from 'react'
import { Certificates } from '../../components'
import { UploadCertificate } from '../../components'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as modalActionCreators from '../../redux/modules/modal'
import * as navbarActionCreators from '../../redux/modules/navBar'
import * as certificatesActionCreators from '../../redux/modules/certificates'

class CertificatesContainer extends Component {

  componentDidMount () {
    this.props.setNavBarTitle('Certificados')
  }

  handleAddClick () {
    this.props.openModal(UploadCertificate)
  }

  async destroyCertificate (id) {
    await this.props.handleDestroyRole(this.props.currentSubdomain, id)
  }

  redirectTo (path) {
    this.props.history.push(path)
  }

  render () {
    return (
      <Certificates
        certificates={this.props.certificates}
        onAddClick={() => this.handleAddClick()}
        redirectTo={(path) => this.redirectTo(path)}/>
    )
  }
}

function mapStateToProps ({user, certificates}) {
  return {
    currentSubdomain: user.get('currentSubdomain'),
    certificates: certificates.delete('status'),
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...modalActionCreators,
    ...navbarActionCreators,
    ...certificatesActionCreators,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CertificatesContainer)
