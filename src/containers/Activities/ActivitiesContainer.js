import React, { Component } from 'react'
import { Activities } from '../../components'

import * as activitiesActionCreators from '../../redux/modules/activities'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as navBarActionCreators from '../../redux/modules/navBar'

class ActivitiesContainer extends Component {

  async componentDidMount () {
    await this.props.fetchAndHandleMultipleActivities(this.props.currentSubdomain)
    this.props.setNavBarTitle('Atividades')
  }

  handleRowClick (selectedRow) {
    const id = this.props.activities.valueSeq().toArray()[selectedRow].get('id')
    this.props.history.push(`/activities/${id}/edit`)
  }

  redirectTo (path) {
    this.props.history.push(path)
  }

  handleDestroyActivity (id) {
    this.props.handleDestroyActivity(this.props.currentSubdomain, id)
  }

  render () {
    return (
      <Activities
        isLoading={this.props.isLoading}
        activities={this.props.activities}
        redirectTo={(path) => this.redirectTo(path)}
        onRowClick={(selectedRow) => this.handleRowClick(selectedRow)}
        onDestroyActivity={(id) => this.handleDestroyActivity(id)} />
    )
  }
}

function mapStateToProps ({activities, user}) {
  return {
    noActivities: activities.size === 0,
    activities: activities.delete('status'),
    currentSubdomain: user.get('currentSubdomain'),
    currentCompanyName: user.get('currentCompanyName'),
    isLoading: activities.getIn(['status', 'isLoading']),
    lastUpdated: activities.getIn(['status', 'lastUpdated']),
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...activitiesActionCreators,
    ...navBarActionCreators
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesContainer)
