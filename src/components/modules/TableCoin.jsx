import styles from "../../styles/TableCoin.module.css";

import TableRow from "./TableRow";

const TableCoin = ({ coins, loading, currencyValue, setShowChart }) => {
  return (
    <>
      <section className={styles.coin_list_container}>
        <table className={styles.coin_list_table}>
          <thead className={styles.coin_list_table_head}>
            <tr>
              <th>نام</th>
              <th>آخرین قیمت</th>
              <th>تغییر 24H</th>
              <th>نمودار</th>
            </tr>
          </thead>

          <tbody className={styles.coin_list_table_body}>
            {loading ? (
              <tr className={styles.loader_container}>
                <td className={styles.loader}></td>
              </tr>
            ) : (
              coins.map((item) => (
                <TableRow
                  key={item.id}
                  data={item}
                  currencyValue={currencyValue}
                  setShowChart={setShowChart}
                />
              ))
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default TableCoin;
