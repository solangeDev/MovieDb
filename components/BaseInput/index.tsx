import React from 'react';

import styles from './index.module.scss';
import TextField from '@material-ui/core/TextField';
import { InputAdornment } from '@material-ui/core';

function BaseInput(props) {
  let leftAdornment = null;
  let rightAdornment = null;
  if (
    props.properties.leftAdornment !== undefined &&
    props.properties.leftAdornment.visibility
  ) {
    leftAdornment = (
      <InputAdornment position="start">
        <span
          className={
            styles[props.properties.leftAdornment.rootClass]
          }>{`${props.properties.leftAdornment.text}`}</span>
      </InputAdornment>
    );
  }
  if (
    props.properties.rightAdornment !== undefined &&
    props.properties.rightAdornment.visibility
  ) {
    rightAdornment = (
      <InputAdornment
        classes={{
          root: styles[props.properties.rightAdornment.rootClass],
        }}
        position="end">
        <span className={`${props.properties.rightAdornment.iconClass}`}></span>
      </InputAdornment>
    );
  }
  return (
    <TextField
      InputProps={{
        startAdornment: leftAdornment,
        endAdornment: rightAdornment,
        /** 
          false => nope, true => on
        **/
        autoComplete:
          props.properties.autoComplete === undefined
            ? 'on'
            : props.properties.autoComplete,
      }}
      key={props.properties.id}
      inputProps={{
        maxLength:
          props.properties.maxlength !== undefined
            ? props.properties.maxlength
            : '',
      }}
      onBlur={
        props.handleOnBlur !== undefined
          ? () => {
              let obj = {};
              obj[props.properties.name] = props.properties.value;
              props.handleOnBlur(obj);
            }
          : () => {
              return false;
            }
      }
      value={props.properties.value}
      helperText={props.error ? props.properties.helperText : ''}
      fullWidth
      error={props.properties.error}
      name={props.properties.name}
      onChange={props.onChange}
      onKeyUp={props.onKeyUp}
      onInput={props.onInput}
      onKeyPress={props.onKeyPress}
      type={props.properties.type}
      id={props.properties.id}
      label={props.properties.label}
      classes={{
        root:
          props.properties.className !== undefined
            ? styles[props.properties.className]
            : styles.BaseInput__root,
      }}></TextField>
  );
}
export default BaseInput;
