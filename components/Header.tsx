import Link from 'next/link'
import styles from '../styles/Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <h1>DisePVP</h1>
        </a>
      </Link>
    </header>
  )
}

export default Header