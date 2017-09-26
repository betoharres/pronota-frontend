import React, { Component } from 'react'
import { Certificates } from '../../components'
import { UploadCertificate } from '../../components'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as modalActionCreators from '../../redux/modules/modal'
import * as navbarActionCreators from '../../redux/modules/navBar'
import * as certificatesActionCreators from '../../redux/modules/certificates'

class CertificatesContainer extends Component {

  async handleUploadClick (e, results) {
    results.forEach(async (result) => {
      const [e, file] = result
      const content = e.target.result
      const newCertificate = {certificate: {filename: file.name, content}}
      await this.props.handleCreateCertificate(this.props.currentSubdomain, newCertificate)
    })
    this.props.closeModal()
  }

  async componentDidMount () {
    this.props.setNavBarTitle('Certificados')
    await this.props.fetchAndHandleMultipleCertificates(this.props.currentSubdomain)
  }

  handleAddClick () {
    this.props.openModal(() =>
      <UploadCertificate
        onUploadClick={(e, results) => this.handleUploadClick(e, results)} />)
  }

  handleDestroyCertificate (id) {
    this.props.handleDestroyCertificate(this.props.currentSubdomain, id)
  }

  redirectTo (path) {
    this.props.history.push(path)
  }

  render () {
    return (
      <Certificates
        certificates={this.props.certificates}
        onAddClick={() => this.handleAddClick()}
        onDestroyCertificate={(id) => this.handleDestroyCertificate(id)}
        redirectTo={(path) => this.redirectTo(path)} />
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
