import { useContext, useState } from "react";
import styles from "./Register.module.css";
import { setNewToken } from "../../utlis/utils";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

function Register() {
    const navigate = useNavigate();

    // Задаємо дані користувача в глобальному контексті
    const { user, setuser } = useContext(UserContext);

    const [formdata, setformdata] = useState({
        name: "",
        email: "",
        password: "",
        token: setNewToken()
    })

    // перевіряємо чи маємо дані користувача
    if (user !== null) {
        navigate("/");
        return;
    }

    const saveFormData = (e) => {
        setformdata({ ...formdata, [e.target.name]: e.target.value });
    }

    async function registernewuser(e) {
        e.preventDefault();

        // отримамо дані користувача по імейл
        const res = await fetch(`https://673c673c96b8dcd5f3f9d448.mockapi.io/users?email=${formdata.email}`);
        const data = await res.json();

        // перевіряємо чи є такий користувач у базі даних
        if (data === "Not found") {
            // зберігаємо дані в контексті
            setuser(formdata);

            // зберігаємо мітку регістрації в локал сторедж
            localStorage.setItem("token", formdata.token);

            // зберігаємо дані в базу даних
            fetch("https://673c673c96b8dcd5f3f9d448.mockapi.io/users",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formdata)
                })

            // перенаправляємо на головну сторінку
            navigate("/");
        } else {
            alert("User already exists. Please log in");
            navigate("/login");
        }

    }

    return (
        <form className={styles.container} onSubmit={registernewuser}>
            <h2>Register</h2>
            <input className={styles.input} type="text" name="name" onChange={saveFormData} value={formdata.name} placeholder="Username" />
            <input className={styles.input} type="email" name="email" onChange={saveFormData} value={formdata.email} placeholder="Email" />
            <input className={styles.input} type="password" name="password" onChange={saveFormData} value={formdata.password} placeholder="Password" />
            <button className={styles.button}>Register</button>
        </form>
    );
}

export default Register;

