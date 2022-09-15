import { createOrbitControls, SkinViewer } from "skinview3d";
import styles from "../styles/Profile.module.css";
import Disabled from "../components/Disabled";
import Change from "../components/Change";

import { getSession, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import Content from "../components/Content";

export const getServerSideProps = async ({ req, res }) => {
	const session = await getSession({ req });
	if (!session) {
	  res.statusCode = 403;
	  return { props: { drafts: [] } };
	}
  
	const user = await prisma.user.findUnique({
	  where: {
		id: session.user.id
	  }
	});
	const userInfo = await prisma.userInfo.findUnique({
		where: {
			userId: user.id
		}
	})
	return {
	  props: { 
		user: user,
		regDate: userInfo.regDate.getTime(),
		lastPlayed: userInfo.lastPlayed.getTime()
	  },
	};
};

export default function Profile(props) {
  let skinViewer;
  const {data: session}= useSession();

  const load = () => {
    const canvas = document.getElementById("skin_container") as HTMLCanvasElement;
    skinViewer = new SkinViewer({
      canvas: canvas,
      width: canvas.parentElement.clientWidth,
      height: canvas.parentElement.clientHeight,
      skin: props.user["skin"]["skin"]
    });
    let control = createOrbitControls(skinViewer);
    control.enableRotate = true;
  }

  const resize = () => {
    const canvas = document.getElementById("skin_container") as HTMLCanvasElement;
    skinViewer.width = canvas.parentElement.clientWidth;
    skinViewer.height = canvas.parentElement.clientHeight;
  }

  useEffect(() => {
	  window.addEventListener('resize', resize);
	  return () => window.removeEventListener('resize', resize);
  }, [resize]);

  useEffect(() => {
	  window.addEventListener('load', load);
    return () => window.removeEventListener('load', load);
  }, [load]);
  	console.log(props.regDate);
	const regDate = new Date(props.regDate);
	const lastPlayed = new Date(props.lastPlayed);

	const fileSelectedHandler = async event => {
		const response = await fetch("/api/skin/upload", {
			method: 'POST',
			body: event.target.files[0],
			headers: {
				'Content-Type': 'image/png',
				'username': `${session.user.name}`,
				'type': `${event.target.name}`
			}
		});
		const messageField = document.getElementById("message");
		console.log(response.status);
		if(response.status == 202){
			messageField.innerHTML = "Успешно!"
		} 
		else if (response.status == 500){
			messageField.innerHTML = "Ошибка сервера, попробуйте ешё раз!"
		}
		else if (response.status == 500){
			messageField.innerHTML = "Request syntax error!"
		}
		else {
			messageField.innerHTML = "Пользователь не найден"
		}
	}

	const show = event => {
		const element = event.target.parentElement.lastChild;
		element.style.display = 'block';
	}

	const timeOptions = {
		year: '2-digit',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	} as const;

	return (
		<Content>
			<div className="row">
				<h2>Привет, {props.user.username}!</h2>
				<div className={`col-12 col-xxl-5 col-xl-6 p-3 ${styles.infoBlock}`}>
					<div className='row'>
						<div className='col-12 col-sm-4 text-center'>
							<canvas style={{width: "100", height:"100"}}  id="skin_container" onLoad={load} onLoadStart={load}></canvas>
						</div>
						<div className='col-12 col-sm-8 p-2'>
							<div style={{position: "relative"}} className='mb-5'>
								<h4>Скин</h4>
								<label>Размер скина должен быть 64x64</label><br />
								<input onChange={fileSelectedHandler} type="file" name="skin" />
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
							<span id="nickname">{props.user.username}</span>
						</li>
						<li className='d-flex justify-content-between'>
							<span>Почта:</span>
							<span>{props.user.email}</span>
						</li>
						<li className='d-flex justify-content-between'>
							<span>Дата регистрации:</span>
							<span>{`${regDate.toLocaleString("ru", timeOptions)}`}</span>
						</li>
						<li className='d-flex justify-content-between'>
							<span>Последняя активность:</span>
							<span>{`${lastPlayed.toLocaleString("ru", timeOptions)}`}</span>
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
					<div className={styles.tableBlock} style={{position: "relative"}}>
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
						<Disabled><h5>Недоступно...</h5></Disabled>
					</div>
				</div>
			</div>
		</Content>
	);
}