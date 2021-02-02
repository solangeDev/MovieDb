import React, { useEffect, useState } from "react";

import styles from './index.module.scss';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormHelperText from '@material-ui/core/FormHelperText';

function BaseInputPassword(props) {
  const [values, setValues] = useState({
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  let helperText = '';
  if (props.error) {
    helperText = (
      <FormHelperText className={styles.BaseInputPassword__error}>
        {props.properties.helperText}
      </FormHelperText>
    );
  }

  return (
    <FormControl className={styles.BaseInputPassword}>
      <InputLabel htmlFor="standard-adornment-password">
        {props.properties.label}
      </InputLabel>
      <Input
        inputProps={{
          maxLength:
            props.properties.maxlength !== undefined
              ? props.properties.maxlength
              : '',
        }}
        classes={{ root: styles.BaseInputPassword__root }}
        error={props.properties.error}
        id={props.id}
        type={values.showPassword ? 'text' : 'password'}
        name={props.properties.name}
        value={props.properties.value}
        onChange={props.onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}>
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
      {helperText}
    </FormControl>
  );
}
export default BaseInputPassword;
