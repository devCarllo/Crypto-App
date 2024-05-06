import { useState } from "react";
import styles from "../../styles/Pagination.module.css";

const Pagination = ({ page, setPage }) => {
  const prevHandler = () => {
    if (page <= 1) return;
    setPage((page) => page - 1);
  };

  const nextHandler = () => {
    if (page >= 10) return;
    setPage((page) => page + 1);
  };

  return (
    <>
      <section className={styles.pagination_container}>
        <button
          className={page === 1 ? styles.disable : null}
          onClick={prevHandler}
        >
          قبلی
        </button>

        <span className={page === 1 ? styles.selected : null}>1</span>
        <span className={page === 2 ? styles.selected : null}>2</span>
        {page > 2 && page < 9 && (
          <>
            <span>...</span>
            <span className={styles.selected}>{page}</span>
          </>
        )}
        <span>...</span>
        <span className={page === 9 ? styles.selected : null}>9</span>
        <span className={page === 10 ? styles.selected : null}>10</span>

        <button
          className={page === 10 ? styles.disable : null}
          onClick={nextHandler}
        >
          بعدی
        </button>
      </section>
    </>
  );
};

export default Pagination;
