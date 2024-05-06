import { useEffect, useState } from "react";

import { searchCoin } from "../../services/cryptoApi";

import styles from "../../styles/Search.module.css";

const Search = ({ currencyValue, setCurrencyValue }) => {
  const [fetchResult, setFetchResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setFetchResult([]);
    setIsLoading(false);

    if (!searchValue) return;

    const fetchData = async () => {
      try {
        const res = await fetch(searchCoin(searchValue), {
          signal: controller.signal,
        });
        const result = await res.json();

        if (result.coins) setFetchResult(result.coins);

        setIsLoading(false);
      } catch (error) {
        if (error.name !== "AbortError") {
          alert(error.message);
        }
      }
    };
    setIsLoading(true);
    fetchData();

    return () => controller.abort();
  }, [searchValue]);

  const searchHandler = (event) => {
    setSearchValue(event.target.value);
  };

  const currencyHandler = (event) => {
    setCurrencyValue(event.target.value);
  };

  return (
    <>
      <section className={styles.search_container}>
        <input
          type="text"
          value={searchValue}
          className={styles.search_input}
          onChange={searchHandler}
          placeholder="جستجو ..."
        />

        <select
          className={styles.search_currency}
          value={currencyValue}
          onChange={currencyHandler}
        >
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="jpy">JPY</option>
        </select>

        {(!!fetchResult.length || isLoading) && (
          <section className={styles.show_search_list_container}>
            {isLoading ? (
              <div className={styles.loader_container}>
                <div className={styles.loader}></div>
              </div>
            ) : (
              <ul className={styles.show_search_list}>
                {fetchResult.map((item) => (
                  <li key={item.id} className={styles.show_search_coin}>
                    <span className={styles.show_search_name}>{item.name}</span>
                    <img
                      src={item.thumb}
                      alt={`${item.symbol} Image`}
                      className={styles.show_search_image}
                    />
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </section>
    </>
  );
};

export default Search;
