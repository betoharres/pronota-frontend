import React from 'react'
import { Card, CardActions, CardHeader } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

export default function Roles ({isLoading, roles, openModal, goToEdit,
                               handleDestroyRole, onRedirectToNewRoles}) {
  return (
    <div>
      {isLoading
        ? <div>
            <Card>
              <CardHeader
                title="Loading..."
                subtitle="Loading..."
                actAsExpander={false}
                showExpandableButton={false}
              />
            </Card>
          </div>
        : <div>
            {roles.valueSeq().map((role, index) => (
              <Card key={role.get('id')}>
                <CardHeader
                  title={role.get('name')}
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                <CardActions expandable={true}>
                  <FlatButton label={'EDIT'}
                    onClick={() => goToEdit(role.get('id'))} />
                  <FlatButton secondary={true} label={'DELETE'}
                    onClick={() => handleDestroyRole(role.get('id'))} />
                </CardActions>
              </Card>
            ))}
          </div>
        }
      <FloatingActionButton onClick={() => onRedirectToNewRoles()} style={{position: 'fixed', bottom: 20, right: 1, marginRight: 20}}>
        <ContentAdd />
      </FloatingActionButton>
    </div>
  )

}
