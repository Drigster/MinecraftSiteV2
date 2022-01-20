import styles from '../styles/Change.module.css';

import { signOut, useSession } from "next-auth/react"

export default function Change({ header, fieldText, fieldName }) {

  const { data: session } = useSession();

  const state = {
    field: '',
    password: ''
  }

  const handleChange = event => {
    state[event.target.name] = event.target.value;
  }

  const handleSubmit = async event => {
    event.preventDefault();
    const response = await fetch(`/api/change/${fieldName}`, {
      method: 'POST',
      body: JSON.stringify({ username: session.user.name, password: state.password, newData: state.field })
    });
    document.getElementById('message').innerHTML = response.json()["message"];
    setTimeout(() => {
      signOut();
  }, 500);
  }

  const hide = event => {
    const element = document.getElementsByClassName(`${fieldName}Change`)[0] as HTMLElement;
    element.style.display = "none";
  }

  return (
    <div className={`${styles.changeParrent} ${fieldName}Change`}>
      <div className={styles.change}>
        <button className={styles.hide} onClick={hide} >X</button>
        <form onSubmit={handleSubmit}>
          <h3>{header}</h3>
          <div id="message"></div>
          <label htmlFor="password">Пароль</label>
          <input type="password" name="password" id="password" onChange={handleChange} required/>
          <label htmlFor="field">{fieldText}</label>
          <input type="text" name="field" id="field" onChange={handleChange} required/>
          <p>После успешного изменения будет выполнен выход из аккаунта!</p>
          <button type='submit'>Подтвердить</button>
        </form>
      </div>
    </div>
  )
}