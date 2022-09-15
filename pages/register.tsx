import styles from '../styles/Login.module.css'

import { signIn } from "next-auth/react"
import ContentForm from '../components/ContentForm';
import Link from 'next/link';

export default function Register() {
    const state = {
        nickname: '',
        email: '',
        password: '',
        password2: ''
    }

    const handleChange = event => {
        state[event.target.name] = event.target.value;
    }

    const handleSubmit = async event => {
        event.preventDefault();

        const messageField = document.getElementById("message");

        const usernameRegex = /^[A-Za-z0-9_]{3,16}$/gu;
        const emailRegex = /^[A-Za-z0-9][A-Za-z0-9\.]+[A-Za-z0-9]@[A-Za-z0-9]+\.[A-Za-z0-9]+$/gu;
        if(state.nickname.search(usernameRegex) !== 0){
            messageField.innerHTML = "Неверный формат ника";
        }
        else if(state.email.search(emailRegex) !== 0){
            messageField.innerHTML = "Неверный формат почты";
        }
        else if(state.password == state.password2){
            const response = await fetch("/api/auth/register", {
                method: 'POST',
                body: JSON.stringify({ 
                    username: state.nickname,
                    email: state.email,
                    password: state.password
                })
            });
            if(response.status == 200){
                signIn('credentials', { callbackUrl: '/profile', username: state.nickname, password: state.password });
            }
            else if(response.status == 409) {
                messageField.innerHTML = "Пользователь с такими данными уже существует"
            }
            else {
                messageField.innerHTML = "ERROR";
            }
        } else {
            messageField.innerHTML = "Пароли не совпадают!"
        }
    }

    return (
        <ContentForm>
            <div className={`row ${styles.loginBlock}`}>
                <form onSubmit={handleSubmit}>
                    <h2>Регистрация</h2>
                    <div id="message"></div>
                    <label htmlFor="nickname">Никнейм</label>
                    <input type="text" name="nickname" id="nickname" onChange={handleChange} required/>
                    <label htmlFor="email">Почта</label>
                    <input type="text" name="email" id="email" onChange={handleChange} required/>
                    <label htmlFor="password">Пароль</label>
                    <input type="password" name="password" id="password" onChange={handleChange} required/>
                    <label htmlFor="password2">Повторить пароль</label>
                    <input type="password" name="password2" id="password2" onChange={handleChange} required/>
                    <Link href="/login">
                        <a className="link">Войти</a>
                    </Link>
                    <button type='submit'>Подтвердить</button>
                </form>
            </div>
        </ContentForm>
    )
}