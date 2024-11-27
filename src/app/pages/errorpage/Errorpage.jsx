import styles from "./Errorpage.module.css";
import { useNavigate } from "react-router-dom";

function Errorpage() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <p className={styles.message}>Oops! The page you're looking for doesn't exist.</p>
            <button className={styles.button} onClick={() => navigate("/")}>
                Go Back Home
            </button>
        </div>
    );
}

export default Errorpage;

