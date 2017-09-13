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

export default function Clients ({
  isLoading,
  clients,
  onDestroyClient,
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
                onTouchTap={() => redirectTo('/clients/new')}
                label='Novo' />
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody showRowHover={true} displayRowCheckbox={false}>
          {clients.valueSeq().map((clients, index) => (
            <TableRow key={index}>
              <TableRowColumn>{clients.get('id')}</TableRowColumn>
              <TableRowColumn>{clients.get('name')}</TableRowColumn>
              <TableRowColumn>
                <FlatButton icon={<ShowIcon />}
                  onClick={() => redirectTo(`clients/${clients.get('id')}/edit`)} />
                <FlatButton icon={<DeleteIcon />}
                  onClick={() => onDestroyClient(clients.get('id'))} />
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )

}
