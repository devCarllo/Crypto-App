import chartUpImg from "../../assets/chart-up.svg";
import chartDownImg from "../../assets/chart-down.svg";

import { getChart } from "../../services/cryptoApi";

import styles from "../../styles/TableCoin.module.css";

const TableRow = ({ data, currencyValue, setShowChart }) => {
  const showHandler = async () => {
    try {
      const res = await fetch(getChart(data.id, currencyValue));
      const result = await res.json();

      setShowChart({ ...result, coin: data });
    } catch (error) {
      console.log(error);

      setShowChart(null);
    }
  };

  return (
    <>
      <tr key={data.id} className={styles.coin_list_body_row}>
        <td>
          <span className={styles.coin_list_image_container}>
            <img
              className={styles.coin_list_image}
              src={data.image}
              alt={`${data.symbol} image`}
            />
          </span>
          <div className={styles.coin_list_name_container}>
            <span className={styles.coin_list_name}>{data.name}</span>
            <span className={styles.coin_list_symbol}>{data.symbol}</span>
          </div>
        </td>
        <td>
          {currencyValue === "usd" && <span>$</span>}
          {currencyValue === "eur" && <span>€</span>}
          {currencyValue === "jpy" && <span>¥</span>}
          <div className={styles.coin_list_price}>
            {data.current_price.toLocaleString()}
          </div>
        </td>
        <td>
          <div
            className={
              data.price_change_percentage_24h > 0 ? styles.green : styles.red
            }
          >
            %{data.price_change_percentage_24h.toFixed(2)}
          </div>
        </td>
        <td>
          <img
            className={styles.coin_list_chart}
            onClick={showHandler}
            src={
              data.price_change_percentage_24h > 0 ? chartUpImg : chartDownImg
            }
            alt={`${data.symbol} image`}
          />
        </td>
      </tr>
    </>
  );
};

export default TableRow;
