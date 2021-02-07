import React from 'react';
import styles from './index.module.scss';
import menu from '../../config/navBar';
import Router from 'next/router';

type NavBarProps = {
    handleChangeMenuState: (e) => void;
    activeMenu: string;
};

const NavBar: React.FC<NavBarProps> = ({ handleChangeMenuState, activeMenu }: NavBarProps) => {
    const handleChange = (item) => {
        Router.push(`/[item]`, `/${item}`);
    };
    return (
        <section className={styles.NavBar}>
            {menu.map((row, index) => (
                <div
                    onClick={() => {
                        handleChange(row.slug);
                    }}
                    key={index}
                    className={`${styles.NavBar__item} ${activeMenu === row.slug ? styles.NavBar__active : ''}`}
                >
                    <div>{row.icon}</div>
                    <div className={styles.NavBar__itemTitle}>{row.title}</div>
                </div>
            ))}
        </section>
    );
};

export default NavBar;
