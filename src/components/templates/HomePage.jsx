import { useEffect, useState } from "react";

import TableCoin from "../modules/TableCoin";
import Pagination from "../modules/Pagination";
import Search from "../modules/Search";
import Modal from "../modules/Modal";

import { getCoinsList } from "../../services/cryptoApi";
import styles from "../../styles/HomePage.module.css";

const HomePage = () => {
  const [fetchResult, setFetchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [currencyValue, setCurrencyValue] = useState("usd");
  const [showChart, setShowChart] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(getCoinsList(pageNum, currencyValue));
        const data = await res.json();

        setFetchResult(data);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [pageNum, currencyValue]);

  return (
    <>
      <div className={styles.home_page_container}>
        <Search
          currencyValue={currencyValue}
          setCurrencyValue={setCurrencyValue}
        />

        <TableCoin
          coins={fetchResult}
          loading={isLoading}
          currencyValue={currencyValue}
          setShowChart={setShowChart}
        />

        <Pagination page={pageNum} setPage={setPageNum} />

        {!!showChart && (
          <Modal showChart={showChart} setShowChart={setShowChart} />
        )}
      </div>
    </>
  );
};

export default HomePage;
