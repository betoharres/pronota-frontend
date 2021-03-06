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
import ShowIcon from 'material-ui/svg-icons/image/remove-red-eye'
import { cyan300 } from 'material-ui/styles/colors'
import './styles.css'

export default function Roles ({
  isLoading,
  roles,
  onDestroyRole,
  redirectTo,
  onRowClick,
}) {

  return (
    <Paper className='paperContainer'>
      <Table>
        <TableHeader
          style={{backgroundColor: cyan300}}
          adjustForCheckbox={false}
          displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn style={{color: 'white'}}>ID</TableHeaderColumn>
            <TableHeaderColumn style={{color: 'white'}}>Nome</TableHeaderColumn>
            <TableHeaderColumn>
              <RaisedButton
                onClick={() => redirectTo('/roles/new')}
                label='Novo' />
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody showRowHover={true} displayRowCheckbox={false}>
          {roles.valueSeq().map((role, index) => (
            <TableRow key={index}>
              <TableRowColumn>{role.get('id')}</TableRowColumn>
              <TableRowColumn>{role.get('name')}</TableRowColumn>
              <TableRowColumn>
                <FlatButton icon={<ShowIcon />}
                  onClick={() => redirectTo(`roles/${role.get('id')}/edit`)} />
                <FlatButton icon={<DeleteIcon />}
                  onClick={() => onDestroyRole(role.get('id'))} />
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )

}
