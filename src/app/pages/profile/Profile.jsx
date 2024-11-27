import styles from "./Profile.module.css";
import { UserContext } from "../../App"
import { useContext } from "react";

function Profile() {
    const { user } =
        useContext(UserContext);
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Profile</h1>
            <p className={styles.details}>Welcome, {user.email}! This is your profile page.</p>
        </div>
    );
}

export default Profile;
