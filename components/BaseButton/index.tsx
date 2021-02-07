import React from 'react';
import styles from './index.module.scss';
import Button from '@material-ui/core/Button';

type BaseButtonProps = {
    properties: {
        className: string;
        hover?: string;
        classHover: string;
        title: string;
        type: string;
        disabled: boolean;
        onClick: () => void;
    };
};

const BaseButton: React.FC<BaseButtonProps> = ({ properties }: BaseButtonProps) => {
    let nameClass = `${styles.baseButton} ${styles[`baseButton__${properties.type}`]}`;
    if (properties.classHover !== undefined && properties.hover !== '') {
        nameClass += ` ${styles[`${properties.classHover}`]}`;
    }
    const title = properties.title;
    return (
        <Button
            type={properties.type}
            classes={{
                root: styles[`baseButton__${properties.className}`],
            }}
            disabled={properties.disabled}
            onClick={properties.onClick}
            className={nameClass}
        >
            {title}
        </Button>
    );
};

export default BaseButton;
