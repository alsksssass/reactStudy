import PropTypes from "prop-types";
import styles from "./App.module.css";

function Button({ text }) {
	return <button className={styles.title}>{text}</button>;
}
 export default Button;