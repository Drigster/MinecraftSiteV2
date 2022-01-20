import Meta from './Meta'
import Header from './Header'
import Nav from './Nav'

import styles from '../styles/Content.module.css'


const Content = ({ children }) => {
	return (
    <div className={`mx-lg-5 mx-3 h-auto ${styles.content}`}>
      {children}
    </div>
	)
}

export default Content
