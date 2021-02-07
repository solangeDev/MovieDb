import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { listFavoriteMovies } from "../../services/movies";
import InfiniteScroll from "react-infinite-scroll-component";
import ItemMovie from "../../components/ItemMovie";
import { selectUser } from "../../redux/user/userSelectors";
import Loader from "react-loader-spinner";
import { connect } from "react-redux";
import menu from "../../config/navBar";
import Router from "next/router";

function FavoriteMovies(props) {
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
        account_id: props.session.account.id,
        session_id: props.session.session_id,
        page: page,
      });
      console.log(data, "siii");
      if (data.status === 200) {
        const items = [...scrollList.results, ...data.data.results];
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
    let validHasMore = false;
    const nextPage = scrollList.page + 1;
    listItems(nextPage);
  };

  return (
    <section className={styles.FavoriteMovies}>
      <div className={styles.FavoriteMovies__feed}>
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
              <ItemMovie module="favorites" data={a} />
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </section>
  );
}

const mapStateToProps = (state) => ({
  session: selectUser(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteMovies);
