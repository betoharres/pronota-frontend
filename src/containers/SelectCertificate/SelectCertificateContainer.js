import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SelectCertificate } from '../../components'
import { fetchAndHandleMultipleCertificates } from '../../redux/modules/certificates'
import { signRps } from '../../redux/modules/rps'
import { showSnackbar } from '../../redux/modules/snackbar'

class SelectCertificateContainer extends Component {

  state = {
    isSigning: false,
    selectedCertificate: null,
    password: '',
  }

  async componentDidMount () {
    await this.props.dispatch(
      fetchAndHandleMultipleCertificates()
    )
  }

  async handleSignRps () {
    this.setState({isSigning: true})
    const { selectedCertificate, password } = this.state
    const { rpsId } = this.props
    const signedRPS = await this.props.dispatch(signRps(
      rpsId,
      selectedCertificate,
      password,
    ))
    if (signedRPS) {
      this.props.dispatch(showSnackbar('RPS assinado com sucesso'))
    } else {
      this.props.dispatch(showSnackbar('Não foi possível assinar o RPS. Tente novamente.'))
    }
    this.setState({isSigning: false})
  }

  handleUpdatePassword (password) {
    this.setState({password})
  }
  handleSelectCertificate (selectedCertificate) {
    this.setState({selectedCertificate})
  }

  render () {
    return (
      <SelectCertificate
        onSelectCertificate={(e, cert) => this.handleSelectCertificate(cert)}
        onUpdatePassword={(e, password) => this.handleUpdatePassword(password)}
        onSignRps={(certId, pass) => this.handleSignRps(certId, pass)}
        isLoading={this.props.isLoading}
        isSigning={this.state.isSigning}
        certificates={this.props.certificates} />
    )
  }
}

function mapStateToProps ({certificates, user}) {
  return {
    certificates: certificates.delete('status'),
    isLoading: certificates.getIn(['status', 'isLoading']),
  }
}

export default connect(mapStateToProps)(SelectCertificateContainer)
