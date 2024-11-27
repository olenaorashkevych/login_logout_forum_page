import { useContext, useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { setNewToken } from "../../utlis/utils";
import { UserContext } from "../../App";

function Login() {

    const { setuser } = useContext(UserContext);
    const navigate = useNavigate();
    const [formdata, setformdata] = useState({
        email: '',
        password: ''
    })

    const saveformdata = (e) => {
        setformdata({ ...formdata, [e.target.name]: e.target.value });
    }
    async function loginuser(e) {
        e.preventDefault();
        const res = await fetch(`https://673c673c96b8dcd5f3f9d448.mockapi.io/users?email=${formdata.email}`);
        const data = await res.json();

        // перевіряємо на наявність такого користувача
        if (data === "Not found") {
            alert("User does not exists. Please register");
            navigate("/register");
        } else {

            // перевіряємо на правильність пароля
            if (data[0].password === formdata.password) {

                // Генеруємо випадковий кусок тексту
                const token = setNewToken();

                // зберігаємо дані в базу даних
                fetch("https://673c673c96b8dcd5f3f9d448.mockapi.io/users/" + data[0].id,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ token: token })
                    })

                setuser(data[0]);

                // зберігаємо мітку регістрації в локал сторедж
                localStorage.setItem("token", token);

                navigate("/");
            } else {
                alert("Wrong password");
            }
        }

    }

    return (
        <form className={styles.container} onSubmit={loginuser}>
            <h2>Login</h2>
            <input className={styles.input} type="text" placeholder="Email" onChange={saveformdata} name="email" value={formdata.email} />
            <input className={styles.input} type="password" placeholder="Password" onChange={saveformdata} name="password" value={formdata.password} />
            <button className={styles.button}>Login</button>
        </form>
    );
}

export default Login;

