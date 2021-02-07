import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { listTopMovies, markAsFavorite } from "../../services/movies";
import { getFavorites } from "../../redux/favoriteMovies/favoriteMoviesSelectors";
import { setFavorite } from "../../redux/favoriteMovies/favoriteMoviesActions";
import InfiniteScroll from "react-infinite-scroll-component";
import { selectUser } from "../../redux/user/userSelectors";
import Loader from "react-loader-spinner";
import ItemMovie from "../../components/ItemMovie";
import Alert from "../../components/Alert";
import * as Scroll from "react-scroll";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
import { connect } from "react-redux";
import menu from "../../config/navBar";
import Router from "next/router";

function TopMovies(props) {
  const [alert, setAlert] = useState({
    show: false,
    type: "error",
    message: "",
  });

  const [scrollList, setScrollList] = React.useState({
    page: 1,
    results: [],
    total_pages: 0,
    total_results: 0,
    hasMore: true,
  });

  const isFavoriteItem = (item) => {
    const valid = props.getFavorites.items.filter((a) => {
      if (a.id === item.id) {
        return a;
      }
    });
    return valid.length > 0;
  };

  const listItems = async (page) => {
    try {
      const data = await listTopMovies({
        page: page,
      });
      if (data.status === 200) {
        const newdata = data.data.results.map((a) => {
          let b = { ...a }
          b.isFavorite = isFavoriteItem(b);
          return b;
        })
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

  const getFavoriteValue = async (e, item) => {
    e.preventDefault();
    try {
      const payload = {
        account_id: props.session.account.id,
        session_id: props.session.session_id,
        body: {
          media_type: "movie",
          media_id: item.id,
          favorite: true,
        },
      };
      const resp = await markAsFavorite(payload);
      if (resp.data.success) {
        const newData = scrollList.results.map((a) => {
          let b = { ...a };
          if (a.id === item.id) {
            b.isFavorite = !item.isFavorite;
          }
          return b;
        });
        setScrollList({ ...scrollList, results: newData });
        let newFavorites = [];
        if (payload.body.favorite) {
          newFavorites = props.getFavorites.items.push(item);
        } else {
          newFavorites = props.getFavorites.items.filter((a) => {
            if (a.id !== item.id) {
              return a;
            }
          });
          props.setFavorite({items: newFavorites, error: false});
        }
      } else {
        scroll.scrollToTop();
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
    listItems(scrollList.page);
    console.log('lalala')
  }, []);

  const nextPage = () => {
    let validHasMore = false;
    const nextPage = scrollList.page + 1;
    listItems(nextPage);
  };

  return (
    <section className={styles.TopMovies}>
      <div className={styles.TopMovies__feed}>
      <div className={styles.TopMovies__alert}>
          <Alert onClose={handleCloseAlert} data={alert}></Alert>
        </div>
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
}

const mapStateToProps = (state) => ({
  session: selectUser(state),
  getFavorites: getFavorites(state)
});

const mapDispatchToProps = {
  setFavorite
};

export default connect(mapStateToProps, mapDispatchToProps)(TopMovies);
