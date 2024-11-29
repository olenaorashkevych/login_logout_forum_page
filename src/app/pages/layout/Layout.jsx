import { Outlet, Link } from "react-router-dom";
import styles from "./Layout.module.css";
import { useContext } from "react";
import { UserContext } from "../../App";

function Layout() {
    const { user } = useContext(UserContext);

    return (
        <>
            <header className={styles.header}>
                <h1>My App 222</h1>
                <nav className={styles.nav}>
                    <Link to="/" className={styles.navLink}>Home</Link>
                    {
                        user ? (
                            <>
                                <Link to="/profile" className={styles.navLink}>Profile</Link>
                                <Link to="/logout" className={styles.navLink}>Logout</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className={styles.navLink}>Login</Link>
                                <Link to="/register" className={styles.navLink}>Register</Link>
                            </>
                        )
                    }
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default Layout;
