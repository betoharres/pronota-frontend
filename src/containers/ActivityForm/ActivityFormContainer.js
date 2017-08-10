import React, { Component } from 'react'
import { connect } from 'react-redux'
import { initialize } from 'redux-form'
import { bindActionCreators } from 'redux'
import * as navBarActionCreators from '../../redux/modules/navBar'
import * as activitiesActionCreators from '../../redux/modules/activities'
import * as userActionCreators from '../../redux/modules/user'

import { ActivityForm } from '../../components'

class ActivityFormContainer extends Component {

  async componentDidMount () {
    this.props.setNavBarTitle('Editar Atividade')
    await this.props.setUserCurrentSubdomain(this.props.currentSubdomain)
    if (!(this.props.activity) && this.props.id){
      const activity = await this.props.fetchAndHandleActivity(
                                      this.props.currentSubdomain, this.props.id)
      if (activity) {
        this.props.initialize('ActivityForm', {activity: activity})
      }
    } else if (this.props.activity && this.props.id) {
      this.props.initialize('ActivityForm', {activity: this.props.activity})
    } else {
      this.props.setNavBarTitle('Nova Atividade')
    }
  }

  handleSubmitActivity (activity) {
    if (this.props.id) {
      this.props.handleUpdateActivity(this.props.currentSubdomain, this.props.id, activity)
    } else {
      this.props.handleCreateActivity(this.props.currentSubdomain, activity)
    }
  }

  render () {
    return (
      <ActivityForm
        isNewRecord={this.props.id ? false : true}
        onSubmit={(activity) => this.handleSubmitActivity(activity)} />
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...userActionCreators,
    ...activitiesActionCreators,
    ...navBarActionCreators,
    ...{initialize}}, dispatch)
}

function mapStateToProps ({user, activities}, {match}) {
  const { id } = match.params
  if (id) {
    return {
      id,
      activity: activities.get(id),
      currentSubdomain: user.get('currentSubdomain'),
    }
  } else {
    return {
      currentSubdomain: user.get('currentSubdomain'),
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityFormContainer)
