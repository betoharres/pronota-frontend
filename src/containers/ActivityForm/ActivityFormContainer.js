import React, { Component } from 'react'
import { connect } from 'react-redux'
import { initialize } from 'redux-form'
import { bindActionCreators } from 'redux'
import * as navBarActionCreators from '../../redux/modules/navBar'
import * as activitiesActionCreators from '../../redux/modules/activities'
import * as userActionCreators from '../../redux/modules/user'
import * as snackbarActionCreators from '../../redux/modules/snackbar'

import { ActivityForm } from '../../components'

class ActivityFormContainer extends Component {

  async componentDidMount () {
    if (!(this.props.activity) && this.props.id){
      this.props.setNavBarTitle('Editar Atividade')
      const activity = await this.props
        .fetchAndHandleActivity(this.props.id)
      if (activity) { this.props.initialize('ActivityForm', {activity}) }
    } else if (this.props.activity && this.props.id) {
      this.props.initialize('ActivityForm', {activity: this.props.activity})
    } else {
      this.props.setNavBarTitle('Nova Atividade')
    }
  }

  handleSubmitActivity (activity) {
    if (this.props.id) {
      this.props.handleUpdateActivity(this.props.id, activity)
      this.props.showSnackbar('Atividade atualizada com sucesso')
    } else {
      this.props.handleCreateActivity(activity)
      this.props.showSnackbar('Atividade criada com sucesso')
    }
  }

  render () {
    return (
      <ActivityForm onSubmit={(activity) => this.handleSubmitActivity(activity)} />
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...userActionCreators,
    ...activitiesActionCreators,
    ...navBarActionCreators,
    ...snackbarActionCreators,
    ...{initialize}}, dispatch)
}

function mapStateToProps ({user, activities}, {match}) {
  const { id } = match.params
  if (id) {
    return {
      id,
      activity: activities.get(id),
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityFormContainer)
