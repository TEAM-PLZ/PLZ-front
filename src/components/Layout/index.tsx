import styles from './layout.module.css';

interface ILayout {
  children: React.ReactNode;
}
const Layout = ({ children }: ILayout) => {
  return (
    <div className={styles.background}>
      <section className={styles.container}>
        <main className={styles.main}>{children}</main>
      </section>
    </div>
  );
};

export default Layout;
