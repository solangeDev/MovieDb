import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import TopBar from '../../components/TopBar';
import TopMovies from '../../components/TopMovies';
import NavBar from '../../components/NavBar';
import { Animated } from 'react-animated-css';

// eslint-disable-next-line @typescript-eslint/ban-types
type TopMovieLayoutProps = {};

const TopMovieLayout: React.FC<TopMovieLayoutProps> = ({}: TopMovieLayoutProps) => {
    const [openNavBar, setOpenNavBar] = useState(true);
    const [activeMenu, setActiveMenu] = useState('topmovies');
    const [width, setWidth] = useState(process.browser ? window.innerWidth : 0);

    useEffect(() => {
        function handleResize() {
            setWidth(process.browser ? window.innerWidth : 0);
        }
        process.browser ? window.addEventListener('resize', handleResize) : null;
        return () => (process.browser ? window.removeEventListener('resize', handleResize) : null);
    }, [width]);

    useEffect(() => {
        if (width <= 768) {
            setOpenNavBar(false);
        } else {
            setOpenNavBar(true);
        }
    }, [width]);

    const handleChangeOpenBar = (e) => {
        setOpenNavBar((oldState) => !oldState);
    };

    const handleChangeMenuState = (e) => {
        setActiveMenu(e);
    };

    useEffect(() => {}, [activeMenu]);

    return (
        <div>
            <TopBar menuIcon={true} openNavBar={handleChangeOpenBar} open={openNavBar} />
            <section className={`${styles.Dashboard__body}`}>
                <article className={`${styles.Dashboard__sideBar} ${!openNavBar ? styles.Dashboard__notZIndex : ''}`}>
                    <Animated
                        animationIn="slideInLeft" //bounceOutLeft
                        animationOut="slideOutLeft"
                        animationInDuration={400}
                        animationOutDuration={110}
                        isVisible={openNavBar}
                    >
                        <NavBar activeMenu={activeMenu} handleChangeMenuState={handleChangeMenuState}></NavBar>
                    </Animated>
                </article>
                <article className={styles.Dashboard__feed}>
                    <TopMovies />
                </article>
            </section>
        </div>
    );
};

export default TopMovieLayout;
