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

export default function Roles ({
  isLoading,
  roles,
  onDestroyRole,
  redirectTo,
}) {

  return (
    <Paper className='paperRoleContainer'>
      <Table onCellClick={(role) => redirectTo(role)}>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Nome</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody showRowHover={true} displayRowCheckbox={false}>
          {roles.valueSeq().map((role, index) => (
            <TableRow key={index}>
              <TableRowColumn>{role.get('id')}</TableRowColumn>
              <TableRowColumn>{role.get('name')}</TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )

}
