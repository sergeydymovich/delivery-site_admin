import styles from "./Navigation.module.css";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import ViewComfyIcon from "@material-ui/icons/ViewComfy";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import CategoryIcon from "@material-ui/icons/Category";

function Navigation() {
  return (
    <nav className={styles.wrapper}>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <NotificationsActiveIcon className={styles.itemIcon} />
          <p className={styles.itemText}>заказы</p>
        </li>
        <li className={styles.listItem}>
          <RestaurantMenuIcon className={styles.itemIcon} />
          <p className={styles.itemText}>продукты</p>
        </li>
        <li className={styles.listItem}>
          <ViewComfyIcon className={styles.itemIcon} />
          <p className={styles.itemText}>ингредиенты</p>
        </li>
        <li className={styles.listItem}>
          <CategoryIcon className={styles.itemIcon} />
          <p className={styles.itemText}>категории</p>
        </li>
        <li className={styles.listItem}>
          <SupervisorAccountIcon className={styles.itemIcon} />
          <p className={styles.itemText}>пользователи</p>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
