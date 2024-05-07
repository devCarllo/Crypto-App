import { useState } from "react";
import { convertData } from "../../helpers/converData";

import styles from "../../styles/Modal.module.css";
import { ImCross } from "react-icons/im";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Modal = ({ showChart, setShowChart }) => {
  const [type, setType] = useState("prices");

  const showHandler = () => {
    setShowChart(null);
  };

  const typeHandler = (event) => {
    if (event.target.tagName === "BUTTON") {
      setType(event.target.dataset.id);
    }
  };

  return (
    <>
      <div className={styles.chart_container} dir="ltr">
        <div className={styles.chart_close_icon} onClick={showHandler}>
          {" "}
          <ImCross fontSize="1.2rem" color="#fff" />
        </div>

        <div className={styles.chart_box}>
          <div className={styles.chart_box_title}>
            <img
              src={showChart.coin.image}
              className={styles.chart_title_image}
            />
            <span className={styles.chart_title_name}>
              {showChart.coin.name}
            </span>
          </div>

          <div className={styles.graph}>
            <ChartComponent
              data={convertData(showChart, type)}
              type={type}
              coin={showChart.coin}
            />
          </div>

          <div
            className={styles.chart_box_price_type}
            dir="rtl"
            onClick={typeHandler}
          >
            <button
              data-id="prices"
              className={
                type === "prices"
                  ? styles.selected
                  : styles.chart_price_type_btn
              }
            >
              قیمت
            </button>
            <button
              data-id="market_caps"
              className={
                type === "market_caps"
                  ? styles.selected
                  : styles.chart_price_type_btn
              }
            >
              ارزش بازار
            </button>
            <button
              data-id="total_volumes"
              className={
                type === "total_volumes"
                  ? styles.selected
                  : styles.chart_price_type_btn
              }
            >
              حجم معاملاات
            </button>
          </div>
          <div className={styles.chart_box_details}>
            <div>
              <span className={styles.chart_details_title}>ارزش بازار: </span>
              <span className={styles.chart_details_content}>
                ${showChart.coin.market_cap.toLocaleString()}
              </span>
            </div>

            <div>
              <span className={styles.chart_details_title}>بیشترین قیمت: </span>
              <span className={styles.chart_details_content}>
                $
                {showChart.coin.ath > 1
                  ? showChart.coin.ath.toLocaleString()
                  : showChart.coin.ath}
              </span>
            </div>
            <div>
              <span className={styles.chart_details_title}>قیمت: </span>
              <span className={styles.chart_details_content}>
                $
                {showChart.coin.current_price > 1
                  ? showChart.coin.current_price.toLocaleString()
                  : showChart.coin.current_price}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

const ChartComponent = ({ data, type, coin }) => {
  return (
    <>
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart width={500} height={500} data={data}>
          <CartesianGrid stroke="#404042" strokeDasharray="2 2" />
          <Area
            type="monotone"
            dataKey={type}
            stroke="#fff"
            fill={coin.market_cap_change_24h > 0 ? "#58bd7d" : "#d33535"}
          />
          <Tooltip />
          <YAxis dataKey={type} domain={["auto", "auto"]} />
          <XAxis dataKey="date" hide />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};
