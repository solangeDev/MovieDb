import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { listTopMovies, markAsFavorite } from '../../services/movies';
import { getFavorites } from '../../redux/favoriteMovies/favoriteMoviesSelectors';
import { setFavorite, addFavorite, removeFavorite } from '../../redux/favoriteMovies/favoriteMoviesActions';
import InfiniteScroll from 'react-infinite-scroll-component';
import { selectUser } from '../../redux/user/userSelectors';
import { selectSearcher } from '../../redux/searcher/searcherSelectors';
import Searcher from '../Search';
import Loader from 'react-loader-spinner';
import ItemMovie from '../../components/ItemMovie';
import Alert from '../../components/Alert';
import { fetchMovies } from '../../redux/searcher/searcherActions';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import { connect } from 'react-redux';

type TopMoviesProps = {
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
    addFavorite: ({}) => void;
    removeFavorite: ({}) => void;
};

interface Alert {
    show: boolean;
    message?: string;
    type: 'error' | 'success' | 'info' | 'warning' | undefined;
}

const TopMovies: React.FC<TopMoviesProps> = ({
    getFavorites,
    session,
    selectSearcher,
    fetchMovies,
    setFavorite,
    addFavorite,
    removeFavorite,
}: TopMoviesProps) => {
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

    const [searchValue, setSearchValue] = useState('');

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if (!getFavorites.error) {
            setFavorites([...getFavorites.items]);
        }
    }, [getFavorites]);

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

    const isFavoriteItem = (item) => {
        const valid = getFavorites.items.filter((a) => {
            if (a.id === item.id) {
                return a;
            }
        });
        return valid.length > 0;
    };

    const listItems = async (page, resset) => {
        try {
            const data = await listTopMovies({
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

    const [dataSearcher, setDataSearcher] = useState([]);

    useEffect(() => {
        if (!selectSearcher.error) {
            setDataSearcher([...selectSearcher.data.results]);
        }
    }, [selectSearcher]);

    const searcher = (resset) => {
        const newdata = dataSearcher.map((a) => {
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
                if (payload.body.favorite) {
                    addFavorite(item);
                } else {
                    removeFavorite(item);
                }
            } else {
                scrollToTop;
                setAlert({ ...alert, show: true, message: resp.data.status_message });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleCloseAlert = () => {
        setAlert({ ...alert, show: false });
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

    return (
        <section className={styles.TopMovies}>
            <div className={styles.TopMovies__feed}>
                <div className={styles.TopMovies__alert}>
                    <Alert onClose={handleCloseAlert} data={alert}></Alert>
                </div>
                <div>
                    <Searcher getValue={getSearhValue} properties={{ name: 'seacrher' }}></Searcher>
                </div>
                <h1 className={searchValue.length > 0 ? styles.TopMovies__hide : styles.TopMovies__titleMod}>
                    Top rated movies
                </h1>
                <InfiniteScroll
                    dataLength={scrollList.results.length}
                    next={nextPage}
                    hasMore={scrollList.hasMore}
                    loader={
                        <div className={styles.TopMovies__loader}>
                            <Loader type="Bars" color="#00BFFF" height={50} width={50} />
                        </div>
                    }
                >
                    {scrollList.results.map((a, index) => (
                        <div key={index} className={styles.TopMovies__item}>
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
    addFavorite,
    removeFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopMovies);
