import { useState } from "react";
import { useEffect } from "react";

import { getAllData } from "../../services/cryptoApi";

import styles from "../../styles/Layout.module.css";
import { FaHeart } from "react-icons/fa";
import { FiAlignRight } from "react-icons/fi";
import { ImCross } from "react-icons/im";

const Layout = ({ children }) => {
  const [increase, setIncrease] = useState([]);
  const [decrease, setDecrease] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getAllData());
        const result = await res.json();

        sortedData(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const sortedData = (data) => {
    const arr = [];

    data.map((item) => {
      const percentageData = item.price_change_percentage_24h;
      arr.push(percentageData);
    });

    const incData = +Math.max(...arr).toFixed(5);
    const decData = +Math.min(...arr).toFixed(5);

    const filterIncData = data.find(
      (item) => item.price_change_percentage_24h == incData
    );
    const filterDecData = data.find(
      (item) => item.price_change_percentage_24h == decData
    );

    setIncrease(filterIncData);
    setDecrease(filterDecData);
  };

  const menuHandler = () => {
    setShowMenu((showMenu) => !showMenu);
  };

  return (
    <>
      <header className={styles.header_container}>
        <div className={styles.header_landing}>
          <div className={styles.header_menu_container}>
            <span className={styles.hamburger_menu_icon} onClick={menuHandler}>
              <FiAlignRight fontSize="2rem" />
            </span>
            <span className={styles.header_landing_name}>کریپتو کویر</span>
            <nav className={styles.navbar}>
              <span>معامله</span>
              <span>خدمات</span>
              <span>راهنما</span>
            </nav>
          </div>

          {showMenu && (
            <div className={styles.responsive_menu}>
              <div
                className={styles.responsive_close_icon}
                onClick={menuHandler}
              >
                <ImCross fontSize="1.2rem" color="#fff" />
              </div>

              <nav className={styles.responsive_nav}>
                <span>معامله</span>
                <span>خدمات</span>
                <span>راهنما</span>
              </nav>
            </div>
          )}

          <div className={styles.header_btn_container}>
            <button className={styles.header_btn_login}>ورود</button>
            <button className={styles.header_btn_signin}>ثبت نام</button>
          </div>
        </div>

        <div className={styles.header_content_container}>
          <div className={styles.header_content}>
            <p className={styles.header_content_text1}>
              قیمت لحظه ای ازر های دیجیتال
            </p>
            <p className={styles.header_content_text2}>هر ارزی که دوست داری</p>
          </div>

          <div className={styles.header_content_box_container}>
            <div className={styles.header_content_box}>
              <span className={styles.header_box_title}>
                بیشترین افزایش قیمت{" "}
              </span>
              <span className={styles.header_box_name}>{increase.name}</span>
              <div className={styles.header_box_image_container}>
                <img
                  src={increase.image}
                  alt={increase.symbol}
                  className={styles.header_box_image}
                />
                <span>{increase.current_price}$</span>
              </div>
              <span
                className={styles.header_box_high_percentage_container}
                dir="ltr"
              >
                %{increase.price_change_percentage_24h?.toFixed(2)}
              </span>
            </div>

            <div className={styles.header_content_box}>
              <span className={styles.header_box_title}>
                بیشترین کاهش قیمت{" "}
              </span>
              <span className={styles.header_box_name}>{decrease.name}</span>
              <div className={styles.header_box_image_container}>
                <img
                  src={decrease.image}
                  alt={decrease.symbol}
                  className={styles.header_box_image}
                />
                <span>{decrease.current_price}$</span>
              </div>
              <span
                className={styles.header_box_low_percentage_container}
                dir="ltr"
              >
                %{decrease.price_change_percentage_24h?.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </header>

      {children}

      <footer className={styles.footer_container}>
        <p>با ما به روز باش</p>
        <p>
          ساخته شده با{" "}
          <span>
            <FaHeart color="#ef4565" fontSize="1rem" />
          </span>{" "}
          توسط devCarllo
        </p>
      </footer>
    </>
  );
};

export default Layout;
