import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { listPopularMovies } from "../../services/movies";
import InfiniteScroll from 'react-infinite-scroll-component';
import ItemMovie from "../../components/ItemMovie";

import menu from "../../config/navBar";
import Router from "next/router";

function PopularMovies(props) {

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
        page: page
      });
      if (data.status === 200) {
        const items = [...scrollList.results, ...data.data.results]
        setScrollList({
          ...scrollList,
          hasMore: items.length < data.data.total_results,
          results: items,
          page: data.data.page,
          total_pages: data.data.total_pages,
          total_results: data.data.total_results,
        })
      }
    } catch (error) {

    }
  }
  
  useEffect(() => {
    listItems(scrollList.page);
  }, [])

  const nextPage = () => {
    let validHasMore = false;
    const nextPage = scrollList.page + 1
    listItems(nextPage)
  }

  return (
    <section className={styles.PopularMovies}>
      <div className={styles.PopularMovies__feed}>
        <InfiniteScroll
          dataLength={scrollList.results.length}
          next={nextPage}
          hasMore={scrollList.hasMore}
          loader={
            <div>
              loader
          </div>
          }
        >
          {scrollList.results.map((a, index) => (
            <div key={index} className={styles.PopularMovies__item}>
              <ItemMovie data={a} />
            </div>
          )
          )}
        </InfiniteScroll>
      </div>
    </section>
  );
}

export default PopularMovies;
