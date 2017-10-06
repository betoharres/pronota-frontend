import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SelectCertificate } from '../../components'
import { closeModal } from '../../redux/modules/modal'
import { fetchAndHandleMultipleCertificates } from '../../redux/modules/certificates'
import { signRps } from '../../redux/modules/rps'

class SelectCertificateContainer extends Component {

  state = {
    isSigning: false,
    selectedCertificate: null,
    password: null,
  }

  async componentDidMount () {
    await this.props.dispatch(
      fetchAndHandleMultipleCertificates(this.props.currentSubdomain)
    )
  }

  componentDidUpdate () {
    if (this.props.certificates.size === 0 && !this.props.isLoading)
      this.props.dispatch(closeModal())
  }

  async handleSignRps () {
    this.setState({isSigning: true})
    const { selectedCertificate, password } = this.state
    const { rpsId, currentSubdomain } = this.props
    await this.props.dispatch(signRps(
      currentSubdomain,
      rpsId,
      selectedCertificate,
      password,
    ))
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
    currentSubdomain: user.get('currentSubdomain'),
  }
}

export default connect(mapStateToProps)(SelectCertificateContainer)
