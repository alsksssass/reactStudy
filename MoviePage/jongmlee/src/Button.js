import PropTypes from "prop-types";
import styles from "./App.module.css";

function Button({ onClick, text }) {
	return <button onClick={onClick} className={styles.title}>{text}</button>;
}
 export default Button;