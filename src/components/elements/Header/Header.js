import styles from "./Header.module.css";
import logo from "assets/images/logo.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.linkWrapper}>
        <Link to="/" className={styles.link}>
          <img className={styles.logo} src={logo} alt="logo" />
          <p>СТОЛЛЕ</p>
        </Link>
      </div>
    </header>
  );
}

export default Header;
