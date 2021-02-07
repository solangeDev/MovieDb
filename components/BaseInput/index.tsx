import React from 'react';
import TextField from '@material-ui/core/TextField';
import { InputAdornment } from '@material-ui/core';
import styles from './index.module.scss';

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
        leftAdornment?: {
            visibility: boolean;
            rootClass: string;
            iconClass: string;
            text: string;
        };
        rightAdornment?: {
            rootClass: string;
            visibility: string;
            iconClass: string;
        };
    };
    handleOnBlur?: () => void;
    onChange: (e) => void;
    onKeyUp?: () => void;
    onInput?: () => void;
    onKeyPress?: () => void;
};

const BaseInput: React.FC<BaseInputProps> = ({
    properties,
    handleOnBlur,
    onChange,
    onKeyUp,
    onInput,
    onKeyPress,
}: BaseInputProps) => {
    let leftAdornment = null;
    let rightAdornment = null;
    if (properties.leftAdornment !== undefined && properties.leftAdornment.visibility) {
        leftAdornment = (
            <InputAdornment position="start">
                <span className={styles[properties.leftAdornment.rootClass]}>{`${properties.leftAdornment.text}`}</span>
            </InputAdornment>
        );
    }
    if (properties.rightAdornment !== undefined && properties.rightAdornment.visibility) {
        rightAdornment = (
            <InputAdornment
                classes={{
                    root: styles[properties.rightAdornment.rootClass],
                }}
                position="end"
            >
                <span className={`${properties.rightAdornment.iconClass}`} />
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
        * */
                autoComplete: properties.autoComplete === undefined ? 'on' : properties.autoComplete,
            }}
            key={properties.id}
            inputProps={{
                maxLength: properties.maxlength !== undefined ? properties.maxlength : '',
            }}
            onBlur={
                handleOnBlur !== undefined
                    ? () => {
                          const obj = {};
                          obj[properties.name] = properties.value;
                          handleOnBlur(obj);
                      }
                    : () => false
            }
            value={properties.value}
            helperText={properties.error ? properties.helperText : ''}
            fullWidth
            error={properties.error}
            name={properties.name}
            onChange={onChange}
            onKeyUp={onKeyUp}
            onInput={onInput}
            onKeyPress={onKeyPress}
            type={properties.type}
            id={properties.id}
            label={properties.label}
            classes={{
                root: properties.className !== undefined ? styles[properties.className] : styles.BaseInput__root,
            }}
        />
    );
};
export default BaseInput;
