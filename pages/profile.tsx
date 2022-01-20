import styles from "../styles/Profile.module.css";
import Disabled from "../components/Disabled";
import Popup from "../components/Popup";
import Change from "../components/Change";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import Content from "../components/Content";

export default function Profile() {
  const router = useRouter();

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
        console.log("Unauthenticated");
        router.push('/login')
    }
  })

  if (status === "loading") {
    return <div style={{textAlign: "center"}}><h2>Loading...</h2></div>;
  }
	
	const regDate = new Date(session.user['userInfo']['regDate']);
	const lastPlayed = new Date(session.user['userInfo']['lastPlayed']);

	const show = event => {
    const element = event.target.parentElement.lastChild;
    element.style.display = 'block';
  }

	return (
		<Content>
			<div className="row">
				<h2>Привет, {session.user.name}!</h2>
				<div className={`col-12 col-xxl-5 col-xl-6 p-3 ${styles.infoBlock}`}>
					<div className='row'>
						<div className='col-12 col-sm-4 text-center'>
							<img alt="${skinImg}" src={session.user['skin']['body']} />
						</div>
						<div className='col-12 col-sm-8 p-3'>
							<div style={{position: "relative"}} className='mb-5'>
								<h4>Скин</h4>
								<label>Размер скина должен быть 64x64</label><br />
								<input type="file" name="skin" />
								<Disabled><h5>Недоступно...</h5></Disabled>
							</div>
							<div style={{position: "relative"}}>
								<h4>Плащ</h4>
								<label></label><br />
								<input type="file" name="skin"/>
								<Disabled><h5>Недоступно...</h5></Disabled>
							</div>
						</div>
					</div>
				</div>
				<div className={`col-12 col-xxl-7 col-xl-6 p-3 ${styles.infoBlock}`} style={{ display: "flex", flexDirection: "column" }}>
					<ul style={{flex: 1, width: "100%"}}>
						<li className='d-flex justify-content-between'>
							<span>Никнейм:</span>
							<span id="nickname">{session.user.name}</span>
						</li>
						<li className='d-flex justify-content-between'>
							<span>Почта:</span>
							<span>{session.user.email}</span>
						</li>
						<li className='d-flex justify-content-between'>
							<span>Дата регистрации:</span>
							<span>{`${regDate.toLocaleString()}`}</span>
						</li>
						<li className='d-flex justify-content-between'>
							<span>Последняя активность:</span>
							<span>{`${lastPlayed.toLocaleString()}`}</span>
						</li>
					</ul>
					<div className="">
						<span>
							<button onClick={show}>Сменить ник</button>
							<Change header="Сменить ник" fieldText="Никнейм" fieldName="username" />
						</span>
						<span>
							<button onClick={show}>Сменить почту</button>
							<Change header="Сменить почту" fieldText="Почта" fieldName="email" />
						</span>
						{/*<span>
							<button>Сменить пароль</button>
							<Change header="Сменить пароль" fieldText="Новый пароль" fieldName="password" />
						</span>*/}
					</div>
				</div>
				<div className={`col-12 p-3 ${styles.infoBlock}`}>
					<h4>Активность за 30 дней</h4>
					<div className={styles.tableBlock}>
						<table>
							<thead>
								<tr>
									<td className='col-4'>IP аддрес</td>
									<td className='col-4'>Дата</td>
									<td className='col-4'>Тип</td>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
						<h5 style={{textAlign: "center", marginTop: "10px"}}>Скоро...</h5>
					</div>
				</div>
			</div>
		</Content>
	);
}