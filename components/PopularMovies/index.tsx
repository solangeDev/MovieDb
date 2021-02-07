import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { listPopularMovies, markAsFavorite } from '../../services/movies';
import { getFavorites } from '../../redux/favoriteMovies/favoriteMoviesSelectors';
import { setFavorite } from '../../redux/favoriteMovies/favoriteMoviesActions';
import { selectUser } from '../../redux/user/userSelectors';
import InfiniteScroll from 'react-infinite-scroll-component';
import ItemMovie from '../../components/ItemMovie';
import Loader from 'react-loader-spinner';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import Alert from '../../components/Alert';
import { connect } from 'react-redux';

type PopularMoviesProps = {
    getFavorites: {
        items: [];
    };
    session: {
        account: {
            id: number;
        };
        session_id: string;
    };
    setFavorite: (a) => void;
};

const PopularMovies: React.FC<PopularMoviesProps> = ({ getFavorites, session }: PopularMoviesProps) => {
    const scrollToTop = () => {
        scroll.scrollToTop();
    };

    const [alert, setAlert] = useState({
        show: false,
        type: 'error',
        message: '',
    });

    const [scrollList, setScrollList] = React.useState({
        page: 1,
        results: [],
        total_pages: 0,
        total_results: 0,
        hasMore: true,
    });

    const listItems = async (page) => {
        try {
            const data = await listPopularMovies({
                page: page,
            });
            if (data.status === 200) {
                const newdata = data.data.results.map((a) => {
                    const b = { ...a };
                    b.isFavorite = isFavoriteItem(b);
                    return b;
                });
                const items = [...scrollList.results, ...newdata];
                setScrollList({
                    ...scrollList,
                    hasMore: items.length < data.data.total_results,
                    results: items,
                    page: data.data.page,
                    total_pages: data.data.total_pages,
                    total_results: data.data.total_results,
                });
            }
        } catch (error) {}
    };

    const isFavoriteItem = (item) => {
        const valid = getFavorites.items.filter((a) => {
            if (a.id === item.id) {
                return a;
            }
        });
        return valid.length > 0;
    };

    useEffect(() => {
        listItems(scrollList.page);
    }, []);

    const nextPage = () => {
        const nextPage = scrollList.page + 1;
        listItems(nextPage);
    };

    const getFavoriteValue = async (e, item) => {
        e.preventDefault();
        try {
            const payload = {
                account_id: session.account.id,
                session_id: session.session_id,
                body: {
                    media_type: 'movie',
                    media_id: item.id,
                    favorite: true,
                },
            };
            const resp = await markAsFavorite(payload);
            if (resp.data.success) {
                const newData = scrollList.results.map((a) => {
                    const b = { ...a };
                    if (a.id === item.id) {
                        b.isFavorite = !item.isFavorite;
                    }
                    return b;
                });
                setScrollList({ ...scrollList, results: newData });
                let newFavorites = [];
                if (payload.body.favorite) {
                    newFavorites = getFavorites.items.push(item);
                } else {
                    newFavorites = getFavorites.items.filter((a) => {
                        if (a.id !== item.id) {
                            return a;
                        }
                    });
                }
                setFavorite({ items: newFavorites, error: false });
            } else {
                scrollToTop();
                setAlert({ ...alert, show: true, message: resp.data.status_message });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleCloseAlert = () => {
        setAlert({ ...alert, show: false });
    };

    return (
        <section className={styles.PopularMovies}>
            <div className={styles.PopularMovies__feed}>
                <div className={styles.PopularMovies__alert}>
                    <Alert onClose={handleCloseAlert} data={alert}></Alert>
                </div>
                <InfiniteScroll
                    dataLength={scrollList.results.length}
                    next={nextPage}
                    hasMore={scrollList.hasMore}
                    loader={
                        <div className={styles.PopularMovies__loader}>
                            <Loader type="Bars" color="#00BFFF" height={50} width={50} />
                        </div>
                    }
                >
                    {scrollList.results.map((a, index) => (
                        <div key={index} className={styles.PopularMovies__item}>
                            <ItemMovie getFavoriteValue={getFavoriteValue} data={a} />
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        </section>
    );
};

const mapStateToProps = (state) => ({
    session: selectUser(state),
    getFavorites: getFavorites(state),
    setFavorite: setFavorite(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PopularMovies);
