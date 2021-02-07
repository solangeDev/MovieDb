import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Router from 'next/router';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Moment from 'moment';

const StyledRating = withStyles({
    label: {
        marginBottom: '0 !important',
    },
    root: {
        fontSize: '20px !important',
        opacity: 'inherit !important',
    },
    iconFilled: {
        color: '#1d79be',
    },
    iconHover: {
        color: '#1d79be',
    },
})(Rating);

type ItemMovieProps = {
    data: {
        vote_average: string;
        title: string;
        isFavorite: boolean;
        release_date: string;
        overview: string;
        poster_path: string;
        backdrop_path: string;
    };
    module?: string;
    getFavoriteValue?: (a, b) => void;
};
const ItemMovie: React.FC<ItemMovieProps> = ({ data, module, getFavoriteValue }: ItemMovieProps) => {
    const rating = ((parseFloat(data.vote_average) * 5) / 10).toPrecision(3);
    const redirect = (e, item) => {
        Router.push('/movie/[movie]', `/movie/${item.id}`);
    };
    return (
        <section className={styles.ItemMovie}>
            <div className={styles.ItemMovie__container}>
                <div className={styles.ItemMovie__header}>
                    <div
                        onClick={(e) => {
                            redirect(e, data);
                        }}
                        className={styles.ItemMovie__img}
                    >
                        <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}></img>
                    </div>
                    <div className={styles.ItemMovie__headerDetail}>
                        <div className={styles.ItemMovie__titleNav}>
                            <div className={styles.ItemMovie__headerMod}>
                                <div>
                                    <Checkbox
                                        icon={<FavoriteBorder />}
                                        onChange={(e) => {
                                            getFavoriteValue(e, data);
                                        }}
                                        checkedIcon={<Favorite />}
                                        name="checkedH"
                                        checked={data.isFavorite}
                                    />
                                </div>
                                <div className={styles.ItemMovie__title}>{data.title}</div>
                            </div>
                            <div className={styles.ItemMovie__headerDesk}>
                                <div className={styles.ItemMovie__title}>{data.title}</div>
                            </div>
                            <div className={styles.ItemMovie__like}>
                                <Checkbox
                                    icon={<FavoriteBorder />}
                                    onChange={(e) => {
                                        getFavoriteValue(e, data);
                                    }}
                                    checkedIcon={<Favorite />}
                                    name="checkedH"
                                    checked={data.isFavorite}
                                />
                            </div>
                        </div>
                        <div className={styles.ItemMovie__subtitle}>
                            {`Release: ${Moment(data.release_date).format('MMMM Do, YYYY')}`}
                        </div>
                        <div className={styles.ItemMovie__subtitle}>{`Puntuation: ${data.vote_average}`}</div>
                        <div>
                            <StyledRating
                                value={parseFloat(rating)}
                                precision={0.5}
                                disabled={true}
                                name="simple-controlled"
                            />
                        </div>
                        <div className={styles.ItemMovie__overview}>{data.overview}</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ItemMovie;
