import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { listNowPlaying, markAsFavorite } from '../../services/movies';
import InfiniteScroll from 'react-infinite-scroll-component';
import { selectUser } from '../../redux/user/userSelectors';
import { selectSearcher } from '../../redux/searcher/searcherSelectors';
import { setFavorite } from '../../redux/favoriteMovies/favoriteMoviesActions';
import { getFavorites } from '../../redux/favoriteMovies/favoriteMoviesSelectors';
import ItemMovie from '../../components/ItemMovie';
import Loader from 'react-loader-spinner';
import Searcher from '../Search';
import { fetchMovies } from '../../redux/searcher/searcherActions';
import Alert from '../../components/Alert';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import { connect } from 'react-redux';

type NavBarProps = {
    [key: string]: any;
    getFavorites: {
        error: boolean;
        items: [{ id: number }];
    };
    selectSearcher: {
        error: boolean;
        data: {
            page: number;
            results: [];
            total_pages: number;
            total_results: number;
            hasMore: boolean;
        };
    };
    session: {
        account: {
            id: number;
        };
        session_id: string;
    };
    setFavorite: (a) => void;
    fetchMovies: ({}) => void;
};

interface Alert {
    show: boolean;
    message?: string;
    type: 'error' | 'success' | 'info' | 'warning' | undefined;
}

const NowPlaying: React.FC<NavBarProps> = ({
    getFavorites,
    session,
    setFavorite,
    selectSearcher,
    fetchMovies,
}: NavBarProps) => {
    const scrollToTop = () => {
        scroll.scrollToTop();
    };

    const [alert, setAlert] = useState<Alert>({
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

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if (getFavorites.error) {
            setAlert({ ...alert, show: true, message: 'Favorites Server Error' });
        } else {
            setFavorites([...getFavorites.items]);
        }
    }, [getFavorites]);

    const [searchValue, setSearchValue] = useState('');

    const getSearhValue = (data) => {
        setSearchValue(data.slug);
    };

    useEffect(() => {
        if (searchValue.length === 0) {
            listItems(1, true);
        } else {
            if (scrollList.page === 1) {
                searcher(true);
            } else {
                searcher(false);
            }
        }
    }, [searchValue]);

    const listItems = async (page, resset) => {
        try {
            const data = await listNowPlaying({
                page: page,
            });
            if (data.status === 200) {
                const newdata = data.data.results.map((a) => {
                    const b = { ...a };
                    b.isFavorite = isFavoriteItem(b);
                    return b;
                });
                let items = [...scrollList.results, ...newdata];
                if (resset) {
                    items = newdata;
                }
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

    const searcher = (resset) => {
        const newdata = favorites.map((a) => {
            const b = { ...a };
            b.isFavorite = isFavoriteItem(b);
            return b;
        });
        let items = [...scrollList.results, ...newdata];
        if (resset) {
            items = newdata;
        }
        setScrollList({
            ...scrollList,
            hasMore: items.length < selectSearcher.data.total_results,
            results: items,
            page: selectSearcher.data.page,
            total_pages: selectSearcher.data.total_pages,
            total_results: selectSearcher.data.total_results,
        });
    };

    useEffect(() => {
        listItems(scrollList.page, false);
    }, []);

    const nextPage = async () => {
        const nextPage = scrollList.page + 1;
        if (searchValue.length === 0) {
            listItems(nextPage, false);
        } else {
            const payload = {
                session_id: session.session_id,
                slug: searchValue,
                page: 2,
                getFavorites: getFavorites,
            };
            await fetchMovies(payload);
            searcher(false);
        }
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
                    favorite: !item.isFavorite,
                },
            };
            const resp = await markAsFavorite(payload);
            if (resp.data.success) {
                const newData = scrollList.results.map((a) => {
                    const b = { ...a };
                    if (a.id === item.id) {
                        b.isFavorite = payload.body.favorite;
                    }
                    return b;
                });
                setScrollList({ ...scrollList, results: newData });
                let newFavorites = [];
                if (payload.body.favorite) {
                    getFavorites.items.push(item);
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
        <section className={styles.NowPlaying}>
            <div className={styles.NowPlaying__feed}>
                <div className={styles.NowPlaying__alert}>
                    <Alert onClose={handleCloseAlert} data={alert}></Alert>
                </div>
                <div>
                    <Searcher getValue={getSearhValue} properties={{ name: 'seacrher' }}></Searcher>
                </div>
                <h1 className={searchValue.length > 0 ? styles.NowPlaying__hide : styles.NowPlaying__titleMod}>
                    Recent Movies
                </h1>
                <InfiniteScroll
                    dataLength={scrollList.results.length}
                    next={nextPage}
                    hasMore={scrollList.hasMore}
                    loader={
                        <div className={styles.NowPlaying__loader}>
                            <Loader type="Bars" color="#00BFFF" height={50} width={50} />
                        </div>
                    }
                >
                    {scrollList.results.map((a, index) => (
                        <div key={index} className={styles.NowPlaying__item}>
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
    selectSearcher: selectSearcher(state),
});

const mapDispatchToProps = {
    setFavorite,
    fetchMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(NowPlaying);
