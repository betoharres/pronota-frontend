import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'

export const TextForm = props => (
  <TextField
    hintText={props.label}
    type={props.type ? props.type : "text"}
    fullWidth={true}
    floatingLabelText={props.label}
    errorText={props.meta.touched && props.meta.error}
    onChange={(v) => props.input.onChange(v)}
    value={props.input.value} />
);

export const AutoCompleteForm =
  ({input, dataSource, dataSourceConfig, ...props}) => {
  const [selectedRow] =
    dataSource.filter((obj) => obj[dataSourceConfig['value']] === input.value)
  const searchText = selectedRow ? selectedRow[dataSourceConfig['text']] : false

  return (
    <AutoComplete
      fullWidth={true}
      maxSearchResults={6}
      floatingLabelText={props.label}
      errorText={props.meta.touched && props.meta.error}
      onUpdateInput={(searchText) => {input.onChange(searchText)}}
      onNewRequest={(value) => input.onChange(value[dataSourceConfig['value']])}
      filter={AutoComplete.caseInsensitiveFilter}
      dataSourceConfig={dataSourceConfig}
      searchText={searchText ? searchText : input.value}
      dataSource={dataSource} />
  )
}

export const SelectForm = props => (
  <SelectField
    fullWidth={true}
    floatingLabelText={props.label}
    errorText={props.touched && props.error}
    onChange={(event, index, value) => props.input.onChange(value)}
    children={props.children}
    value={props.input.value} />
);

export const CheckBoxForm = props => (
  <Checkbox label={props.label} checked={props.input.value ? true : false}
    onCheck={props.input.onChange} />
);
