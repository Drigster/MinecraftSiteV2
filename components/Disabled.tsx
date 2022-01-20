import styles from '../styles/Disabled.module.css';

export default function Change({ children }) {
  return (
    <div className={styles.disabled}>
      {children}
    </div>
  )
}