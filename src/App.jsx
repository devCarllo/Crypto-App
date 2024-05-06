import HomePage from "./components/templates/HomePage";
import Layout from "./components/layout/Layout";

import styles from "./styles/App.module.css";

const App = () => {
  return (
    <>
      <Layout>
        <main className={styles.main_container}>
          <HomePage />
        </main>
      </Layout>
    </>
  );
};

export default App;
