import styles from "./Profile.module.css";
import { UserContext } from "../../App";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(() => {
        // перевіряємо чи є користувач
        if (user === null) {
            navigate("/");
        }
    }, [user, navigate]);

    // Якщо user === null, не рендеримо нічого, поки не виконається navigate
    if (user === null) {
        return null;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Profile</h1>
            <p className={styles.details}>Welcome, {user.email}! This is your profile page.</p>
        </div>
    );
}

export default Profile;
