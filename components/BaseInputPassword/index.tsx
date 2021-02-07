import React, { useEffect, useState } from 'react';

import styles from './index.module.scss';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormHelperText from '@material-ui/core/FormHelperText';

type BaseInputProps = {
    properties: {
        label: string;
        type: string;
        name: string;
        maxlength?: number;
        id: string;
        autoComplete: string;
        helperText: string;
        className: string;
        value: string;
        error: boolean;
        leftAdornment: {
            visibility: boolean;
            rootClass: string;
            iconClass: string;
            text: string;
        };
        rightAdornment: {
            rootClass: string;
            visibility: string;
            iconClass: string;
        };
    };
    onChange: (e) => void;
};

const BaseInputPassword: React.FC<BaseInputProps> = ({ properties, onChange }: BaseInputProps) => {
    const [values, setValues] = useState({
        showPassword: false,
    });
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <FormControl className={styles.BaseInputPassword}>
            <InputLabel htmlFor="standard-adornment-password">{properties.label}</InputLabel>
            <Input
                inputProps={{
                    maxLength: properties.maxlength !== undefined ? properties.maxlength : '',
                }}
                classes={{ root: styles.BaseInputPassword__root }}
                error={properties.error}
                id={properties.id}
                type={values.showPassword ? 'text' : 'password'}
                name={properties.name}
                value={properties.value}
                onChange={onChange}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
            />
            <FormHelperText className={styles.BaseInputPassword__error}>{properties.helperText}</FormHelperText>
        </FormControl>
    );
};
export default BaseInputPassword;
