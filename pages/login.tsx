import styles from '../styles/Login.module.css'

import { signIn } from "next-auth/react"
import ContentForm from '../components/ContentForm';
import Link from 'next/link';
import router from 'next/router';

export default function Login() {
    const state = {
        nickname: '',
        password: ''
    }

    const handleChange = event => {
        state[event.target.name] = event.target.value;
    }

    const handleSubmit = event => {
        event.preventDefault();
        signIn("credentials", { callbackUrl: `/profile`, username: state.nickname, password: state.password, redirect: false })
            .then(({ ok, error }) => {
                if (ok) {
                    router.push("/profile");
                } else {
                    document.getElementById(`${styles.error}`).innerHTML = "Пароль или никнейм не верны";
                }
            })
    }

    return (
        <ContentForm>
            <div className={`row ${styles.loginBlock}`}>
                <div id={`${styles.error}`}></div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nickname">Никнейм или почта</label>
                    <input type="text" name="nickname" id="nickname" onChange={handleChange} required/>
                    <label htmlFor="password">Пароль</label>
                    <input type="password" name="password" id="password" onChange={handleChange} required/>
                    <Link href="/register">
                        <a className="link">Зарегистрироватся</a>
                    </Link>
                    <button type='submit'>Подтвердить</button>
                </form>
            </div>
        </ContentForm>
    )
}