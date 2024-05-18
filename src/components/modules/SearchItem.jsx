import { getChart } from "../../services/cryptoApi";
import { getWithId } from "../../services/cryptoApi";

import styles from "../../styles/Search.module.css";

const SearchItem = ({ data, currencyValue, setShowChart }) => {
  const showHandler = async () => {
    try {
      const res = await fetch(getChart(data.id, currencyValue));
      const result = await res.json();

      const resId = await fetch(getWithId(data.id, currencyValue));
      const resultId = await resId.json();

      setShowChart({ ...result, coin: resultId[0] });
    } catch (error) {
      console.log(error);
      setShowChart(null);
    }
  };

  return (
    <ul className={styles.show_search_list}>
      <li onClick={showHandler} className={styles.show_search_coin}>
        <span className={styles.show_search_name}>{data.name}</span>
        <img
          src={data.thumb}
          alt={`${data.symbol} Image`}
          className={styles.show_search_image}
        />
      </li>
    </ul>
  );
};

export default SearchItem;
