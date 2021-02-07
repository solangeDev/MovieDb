import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { selectUser } from '../../redux/user/userSelectors';
import { connect } from 'react-redux';
import TopBar from '../../components/TopBar';
import NavBar from '../../components/NavBar';
import { Animated } from 'react-animated-css';
import Moment from 'moment';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type MovieDetailProps = {
    data: { title: string; vote_average: string; overview: string; release_date: string };
};

const MovieDetail: React.FC<MovieDetailProps> = ({ data }: MovieDetailProps) => {
    const [openNavBar, setOpenNavBar] = useState(true);
    const [activeMenu, setActiveMenu] = useState('dashboard');
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
    return (
        <div>
            <TopBar menuIcon={true} openNavBar={handleChangeOpenBar} open={openNavBar} />
            <section className={`${styles.Movie__body}`}>
                <article className={`${styles.Movie__sideBar} ${!openNavBar ? styles.Movie__notZIndex : ''}`}>
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
                <article className={styles.Movie__feed}>
                    <div className={styles.Movie__background}>
                        <img src={`https://image.tmdb.org/t/p/w500/${data.backdrop_path}`}></img>
                        <div className={styles.Movie__opacity}></div>
                        <div className={styles.Movie__description}>
                            <div className={styles.Movie__descriptionImage}>
                                <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} alt="movie-picture" />
                            </div>
                            <div className={styles.Movie__descriptionText}>
                                <div className={styles.Movie__titleMovie}>{data.title}</div>
                                <div className={styles.Movie__subtitle}>
                                    {`Release: ${Moment(data.release_date).format('MMMM Do, YYYY')}`}
                                </div>
                                <div className={styles.Movie__chart}>
                                    <CircularProgressbar
                                        styles={{
                                            // Customize the root svg element
                                            root: {},
                                            trail: {
                                                stroke: '#d6d6d6',
                                                strokeLinecap: 'butt',
                                                transform: 'rotate(0.25turn)',
                                                transformOrigin: 'center center',
                                            },
                                            text: {
                                                fill: 'white',
                                                fontWeight: 'bold',
                                                fontSize: '22px',
                                            },
                                            background: {
                                                fill:
                                                    Math.round(parseFloat(data.vote_average)) <= 5
                                                        ? '#b15b83'
                                                        : '#049807',
                                            },
                                        }}
                                        value={((parseFloat(data.vote_average) * 100) / 10).toFixed(2)}
                                        text={`${((parseFloat(data.vote_average) * 100) / 10).toFixed(2)}%`}
                                    />
                                </div>
                                <div className={styles.Movie__overview}>{data.overview}</div>
                            </div>
                        </div>
                    </div>

                    <div></div>
                </article>
            </section>
        </div>
    );
};

const mapStateToProps = (state) => ({
    session: selectUser(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
