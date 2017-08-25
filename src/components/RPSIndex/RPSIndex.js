import React from 'react'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

import Avatar from 'material-ui/Avatar'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever'

import {
  cyan300,
  redA200,
  grey200,
  green300,
  purple100,
  amber200,
} from 'material-ui/styles/colors'

import './styles.css'

function RPSChip (props) {
  let color = grey200
  switch (props.children) {
    case 'running':
      color = amber200
      break
    case 'allocated':
      color = purple100
      break
    case 'failed':
      color = redA200
      break
    case 'done':
      color = green300
      break
    default :
      color = grey200
  }

  return (
    <div style={{alignItems: 'center'}}>
      <Avatar size={15} color={color} backgroundColor={color} />
    </div>
  )
}

export default function RPSIndex ({
  name,
  multipleRPS,
  isLoadingRole,
  isLoadingCompany,
  redirectTo,
  onRedirectToRPS,
}) {

  return (
    <Paper className='paperContainer'>
      <Table onCellClick={(rps) => onRedirectToRPS(rps)}>
        <TableHeader
          style={{backgroundColor: cyan300}}
          adjustForCheckbox={false}
          displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn style={{color: 'white'}}>ID</TableHeaderColumn>
            <TableHeaderColumn style={{color: 'white'}}>Emissao</TableHeaderColumn>
            <TableHeaderColumn style={{color: 'white'}}>Status</TableHeaderColumn>
            <TableHeaderColumn>
              <RaisedButton onTouchTap={() => redirectTo('/rps/new')}
                label='Novo' />
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody showRowHover={true} displayRowCheckbox={false}>
          {multipleRPS.valueSeq().map((rps, index) => (
            <TableRow key={index}>
              <TableRowColumn>{rps.get('id')}</TableRowColumn>
              <TableRowColumn>{rps.get('emissao')}</TableRowColumn>
              <TableRowColumn>
                <RPSChip>{rps.get('state')}</RPSChip>
              </TableRowColumn>
              <TableRowColumn>
                <FlatButton icon={<DeleteIcon />} />
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )

}
