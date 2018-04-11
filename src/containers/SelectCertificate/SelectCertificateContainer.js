import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SelectCertificate } from '../../components'
import { fetchAndHandleMultipleCertificates } from '../../redux/modules/certificates'
import { signRps, clearRpsErrors } from '../../redux/modules/rps'
import { showSnackbar } from '../../redux/modules/snackbar'
import { openModal } from '../../redux/modules/modal'

class SelectCertificateContainer extends Component {

  state = {
    isSigning: false,
    selectedCertificate: null,
    password: '',
  }

  async componentDidMount () {
    await this.props.dispatch(fetchAndHandleMultipleCertificates())
  }

  componentWillUnmount () {
    this.props.dispatch(clearRpsErrors())
  }

  async handleSignRps () {
    this.setState({isSigning: true})
    const { selectedCertificate, password } = this.state
    const { rpsId } = this.props
    const signedRPS = await this.props.dispatch(signRps(rpsId, selectedCertificate, password))
    if (signedRPS) {
      this.props.dispatch(openModal(() => <span>RPS assinado com sucesso</span> ))
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
        signErrors={this.props.signErrors}
        certificates={this.props.certificates} />
    )
  }
}

function mapStateToProps ({certificates, user, rps}) {
  return {
    certificates: certificates.delete('status'),
    isLoading: certificates.getIn(['status', 'isLoading']),
    signErrors: rps.getIn(['status', 'errors']),
  }
}

export default connect(mapStateToProps)(SelectCertificateContainer)
