import Meta from './Meta'
import Header from './Header'
import Nav from './Nav'

import styles from '../styles/Layout.module.css'
import Footer from './Footer'


const Layout = ({ children }) => {
	return (
		<div className='body'>
			<Meta />
			<Header />
			<Nav />
			{children}
			<Footer />
		</div>
	)
}

export default Layout
