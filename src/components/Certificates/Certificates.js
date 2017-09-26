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

export default function Certificates ({
  onAddClick,
  certificates,
  onDestroyCertificate,
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
                onTouchTap={onAddClick}
                label='Novo' />
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody showRowHover={true} displayRowCheckbox={false}>
          {certificates.valueSeq().map((certificate, index) => (
            <TableRow key={index}>
              <TableRowColumn>{certificate.get('id')}</TableRowColumn>
              <TableRowColumn>{certificate.get('filename')}</TableRowColumn>
              <TableRowColumn>
                <FlatButton icon={<DeleteIcon />}
                  onClick={() => onDestroyCertificate(certificate.get('id'))} />
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )

}
