import Link from "next/link";
import Content from "../components/Content";

export default function Home() {
	return (
		<Content>
			<div className="row">
				<div className="col-12 col-md-6 p-3">
					<h2>Как играть?</h2>
					<p>
						<ol>
							<li>Для игры на нашем сервере необходимо <Link href="/register"><a className="link">зарегистрироватся</a></Link></li>
							<li>Для работы лаунчера и майнкрафта требуется <a href="https://java.com/" className="link">java</a></li>
							<li>И не забудь скачать сам <Link href="/download"><a className="link">лаунчер</a></Link></li>
							<li>Ну и конечно же наслаждайся</li>
						</ol>
						По ВСЕМ проблемам писать Drigster#7777
					</p>
				</div>
				<div className="col-12 col-lg-6 p-3">
					<h2>Наш дискорд!</h2>
					<iframe src="https://discord.com/widget?id=364741995954176000&amp;theme=dark" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts" style={{maxWidth: '350px', width: '100%'}} height="500" frameBorder="0"></iframe>
				</div>
			</div>
		</Content>
	)
}
