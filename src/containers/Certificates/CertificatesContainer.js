import React, { Component } from 'react'
import { Certificates } from '../../components'
import { UploadCertificate } from '../../components'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as modalActionCreators from '../../redux/modules/modal'
import * as navbarActionCreators from '../../redux/modules/navBar'
import * as certificatesActionCreators from '../../redux/modules/certificates'
import * as snackbarActionCreators from '../../redux/modules/snackbar'

import { arrayBufferToBase64 } from '../../utils'

class CertificatesContainer extends Component {

  async handleUploadClick (e, files) {
    const [file] = files
    const reader = new FileReader()
    reader.onload = async () => {
      const { result } = reader
      const content = arrayBufferToBase64(result)
      const newCertificate = {certificate: {filename: file.name, content}}
      if (await this.props.handleCreateCertificate(newCertificate)) {
        this.props.showSnackbar('Certificado criado com sucesso')
      }
    }
    reader.onabort = () => console.error('file reading was aborted')
    reader.onerror = () => console.error('file reading has failed')
    reader.readAsArrayBuffer(file)
    window.URL.revokeObjectURL(file.preview)

    this.props.closeModal()
  }

  async componentDidMount () {
    this.props.setNavBarTitle('Certificados')
    await this.props.fetchAndHandleMultipleCertificates()
  }

  handleAddClick () {
    this.props.openModal(() =>
      <UploadCertificate
        onUploadClick={(e, results) => this.handleUploadClick(e, results)} />)
  }

  handleDestroyCertificate (id) {
    if (this.props.handleDestroyCertificate(id)) {
      this.props.showSnackbar('Certificado deletado com sucesso')
    } else {
      this.props.showSnackbar('Não foi possível deletar certificado')
    }
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
    certificates: certificates.delete('status'),
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...modalActionCreators,
    ...navbarActionCreators,
    ...certificatesActionCreators,
    ...snackbarActionCreators,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CertificatesContainer)
