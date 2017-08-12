import React from 'react'

import FlatButton from 'material-ui/FlatButton'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import Paper from 'material-ui/Paper'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import AssessmentIcon from 'material-ui/svg-icons/action/assessment'
import AssignmentInd from 'material-ui/svg-icons/action/assignment-ind'
import SettingsIcon from 'material-ui/svg-icons/action/settings'

import './styles.css'
import { lightBlue600,
        blue500,
        tealA700,
        pinkA700 } from 'material-ui/styles/colors'

function CardItem ({imgHeader, title, description,
                    showMoreOnClick}) {

  return (
    <div className='cardItemHomeContainer'>
      <Paper className='cardItemPaper' zDepth={1}>
        <div className='cardDescription'>
          <h3>
            <strong>{title}</strong>
          </h3>
          <span>{description}</span>
          <div className='showMoreCardBtn'>
            <FlatButton onClick={showMoreOnClick}
              labelStyle={{color: lightBlue600,
                fontFamily: 'Roboto', fontWeight: 'bold'}}
              label='ABRIR'/>
          </div>
        </div>
      </Paper>
    </div>
  )

}

export default function Company ({name, destroyCompany, roleName,
                                      isLoadingRole, isLoadingCompany,
                                      redirectToRoles}) {
  return (
    <div>
      {isLoadingRole || isLoadingCompany
        ? <div className='loadingSpinner'>
            <RefreshIndicator left={1} top={1}/>
          </div>
        : <div>
            <div className='welcomeContainer'>
              <span className='welcomeText'>{`Bem-vindo à ${name}`}</span>
              <div className='subHeaderContainer'>
                <div className='subHeaderItemContainer'>
                  <FloatingActionButton backgroundColor={blue500}
                    className='subHeaderActionButton' zDepth={1}>
                    <AssessmentIcon />
                  </FloatingActionButton>
                  <span className='subHeaderText'>
                    Informações gerais
                  </span>
                </div>
                <div className='subHeaderItemContainer'>
                  <FloatingActionButton backgroundColor={tealA700}
                    onClick={redirectToRoles}
                    className='subHeaderActionButton' zDepth={1}>
                    <AssignmentInd />
                  </FloatingActionButton>
                  <span className='subHeaderText'>
                    Gerencie permissões
                  </span>
                </div>
                <div className='subHeaderItemContainer'>
                  <FloatingActionButton backgroundColor={pinkA700}
                    className='subHeaderActionButton' zDepth={1}>
                    <SettingsIcon />
                  </FloatingActionButton>
                  <span className='subHeaderText'>
                    Gerencie cadastro
                  </span>
                </div>
              </div>
            </div>
            <div className='cardsContainer'>
              <CardItem title={'Storage'} showMoreOnClick={redirectToRoles}
                description={'All important records and company\'s history' +
                  'of employees and transactions'}
                imgHeader={'https://www.gstatic.com/mobilesdk/' +
                  '160505_mobilesdk/discoverycards/2x/storage.png'} />

              <CardItem title={'Roles'} showMoreOnClick={redirectToRoles}
                description={'Authenticate and manage users\'s permissions in ' +
                  'your company'}
                imgHeader={'https://www.gstatic.com/mobilesdk/' +
                  '160505_mobilesdk/discoverycards/2x/auth.png'} />

              <CardItem title={'Analytics'} showMoreOnClick={redirectToRoles}
                description={'See how your company status now and make the ' +
                  'right decision'}
                imgHeader={'https://www.gstatic.com/mobilesdk/' +
                  '160505_mobilesdk/discoverycards/2x/analytics.png'} />

              <CardItem title={'Roles'} showMoreOnClick={redirectToRoles}
                description={'Authenticate and manage users\'s permissions in ' +
                  'your company'}
                imgHeader={'https://www.gstatic.com/mobilesdk/' +
                  '160505_mobilesdk/discoverycards/2x/database.png'} />

              <CardItem title={'Roles'} showMoreOnClick={redirectToRoles}
                description={'Authenticate and manage users\'s permissions in ' +
                  'your company'}
                imgHeader={'https://www.gstatic.com/mobilesdk/' +
                  '160505_mobilesdk/discoverycards/2x/config.png'} />

              <CardItem title={'Roles'} showMoreOnClick={redirectToRoles}
                description={'Authenticate and manage users\'s permissions in ' +
                  'your company'}
                imgHeader={'https://www.gstatic.com/mobilesdk/' +
                  '160921_mobilesdk/discoverycards/2x/cloudmessaging.png'} />
            </div>
          </div>}
    </div>
  )

}
