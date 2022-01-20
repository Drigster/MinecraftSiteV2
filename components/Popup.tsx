import styles from '../styles/Popup.module.css'

const Popup = (header, message) => {
  return (
    <div className={styles.popupBlock}>
      <h3>{ header }</h3>
      <p>{ message }</p>
    </div>
  )
}

export default Popup