import React from 'react'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever'
import { cyan300 } from 'material-ui/styles/colors'
import './styles.css'

export default function Activities ({
  isLoading,
  activities,
  onDestroyRole,
  redirectTo,
  onRowClick,
}) {

  return (
    <Paper className='paperContainer'>
      <Table onCellClick={(activities) => onRowClick(activities)}>
        <TableHeader
          style={{backgroundColor: cyan300}}
          adjustForCheckbox={false}
          displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn style={{color: 'white'}}>ID</TableHeaderColumn>
            <TableHeaderColumn style={{color: 'white'}}>Nome</TableHeaderColumn>
            <TableHeaderColumn>
              <RaisedButton
                onTouchTap={() => redirectTo('/activities/new')}
                label='Novo' />
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody showRowHover={true} displayRowCheckbox={false}>
          {activities.valueSeq().map((activities, index) => (
            <TableRow key={index}>
              <TableRowColumn>{activities.get('id')}</TableRowColumn>
              <TableRowColumn>{activities.get('nome')}</TableRowColumn>
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
