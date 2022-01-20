import styles from '../styles/Nav.module.css'

import { signOut, useSession } from "next-auth/react"
import Link from 'next/link'

const Nav = () => {

	const { data: session } = useSession();

	return (
		<nav className={`navbar navbar-expand-md navbar-dark p-2 ${styles.nav}`}>
			<a className='navbar-brand'></a>
			<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarNav">
				<ul className="navbar-nav mx-auto">
					<li className="nav-item text-center">
						<Link href="http://disepvp.ee:9274/Launcher.exe">
							<a className={`nav-link ${styles.navbarLink}`}>Скачать лаунчер</a>
						</Link>
					</li>
					<li className="nav-item text-center">
						<Link href="/server">
							<a className={`nav-link ${styles.navbarLink}`}>Сервера</a>
						</Link>
					</li>
					<li className="nav-item text-center">
						<Link href="/rules">
							<a className={`nav-link ${styles.navbarLink}`}>Правила</a>
						</Link>
					</li>
					<li className="nav-item text-center">
						{session ?
							<a href='#' className={`nav-link ${styles.navbarLink}`} onClick={() => signOut()}>Выйти</a>
						:
							<Link href="/login">
								<a className={`nav-link ${styles.navbarLink}`}>Войти</a>
							</Link>
						}
					</li>
				</ul>
				{session ?
					<div className={`nav-item ${styles.profileCard}`}>
						<Link href="/profile">
							<a className={`nav-link ${styles.navbarLink}`}>
								<div className='row w-15'>
									<div className='col text-end text-md-center'>
										<img alt='${skin HeadImg}' src={session.user['skin']['head']} height="50rem" />
									</div>
									<div className='col text-start text-md-center' style={{ textAlign: 'center' }}>
										<div>{session.user.name}</div>
										<div style={{ fontSize: "0.7rem" }}>В профиль</div>
									</div>
								</div>
							</a>
						</Link>
					</div>
				: null}
			</div>
		</nav>
	)
}

export default Nav
