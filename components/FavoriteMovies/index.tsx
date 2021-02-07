import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { listFavoriteMovies, markAsFavorite } from '../../services/movies';
import InfiniteScroll from 'react-infinite-scroll-component';
import ItemMovie from '../../components/ItemMovie';
import { selectUser } from '../../redux/user/userSelectors';
import Alert from '../../components/Alert';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';

type FavoriteMoviesProps = {
    session: {
        session_id: string;
        account: {
            id: number;
        };
    };
    getFavorites: {
        items: [];
    };
    setFavorite: (a) => void;
};

const FavoriteMovies: React.FC<FavoriteMoviesProps> = ({ session, getFavorites, setFavorite }: FavoriteMoviesProps) => {
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
            const data = await listFavoriteMovies({
                account_id: session.account.id,
                session_id: session.session_id,
                page: page,
            });
            if (data.status === 200) {
                const newdata = data.data.results.map((a) => {
                    const b = { ...a };
                    b.isFavorite = true;
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
                    favorite: false,
                },
            };
            const resp = await markAsFavorite(payload);
            if (resp.data.success) {
                const newData = scrollList.results.filter((a) => {
                    if (a.id !== item.id) {
                        return a;
                    }
                });
                setScrollList({ ...scrollList, results: newData });
                const newFavorites = getFavorites.items.filter((a) => {
                    if (a.id !== item.id) {
                        return a;
                    }
                });
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
        <section className={styles.FavoriteMovies}>
            <div className={styles.FavoriteMovies__feed}>
                <div className={styles.FavoriteMovies__alert}>
                    <Alert onClose={handleCloseAlert} data={alert}></Alert>
                </div>
                <InfiniteScroll
                    dataLength={scrollList.results.length}
                    next={nextPage}
                    hasMore={scrollList.hasMore}
                    loader={
                        <div className={styles.FavoriteMovies__loader}>
                            <Loader type="Bars" color="#00BFFF" height={50} width={50} />
                        </div>
                    }
                >
                    {scrollList.results.map((a, index) => (
                        <div key={index} className={styles.FavoriteMovies__item}>
                            <ItemMovie getFavoriteValue={getFavoriteValue} module="favorites" data={a} />
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        </section>
    );
};

const mapStateToProps = (state) => ({
    session: selectUser(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteMovies);
