import React from 'react'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

import Chip from 'material-ui/Chip'
import Paper from 'material-ui/Paper'
import {grey200, lightGreenA200, purple100, amber200} from 'material-ui/styles/colors'

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
    case 'done':
      color = lightGreenA200
      break
    default :
      color = grey200
  }

  return (
    <Chip backgroundColor={color}>
      {props.children}
    </Chip>
  )
}

export default function Company ({name, multipleRPS,
                                  isLoadingRole, isLoadingCompany,
                                  onRedirectToRPS, onRedirectToRoles}) {

  return (
    <div>
      <div>
        <Paper className='paperContainer'>
          <Table onCellClick={(rps) => onRedirectToRPS(rps)}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Emissao</TableHeaderColumn>
                <TableHeaderColumn>Status</TableHeaderColumn>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </div>
  )

}
