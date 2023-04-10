"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";

// import { IconButton } from "./button";
// import styles from "./home.module.scss";

// import SettingsIcon from "../icons/settings.svg";
// import GithubIcon from "../icons/github.svg";
// import ChatGptIcon from "../icons/chatgpt.svg";

// import BotIcon from "../icons/bot.svg";
// import AddIcon from "../icons/add.svg";
// import LoadingIcon from "../icons/three-dots.svg";
// import CloseIcon from "../icons/close.svg";

// import {
// 	Message,
// 	SubmitKey,
// 	useChatStore,
// 	ChatSession,
// 	BOT_HELLO,
// } from "../store";
// import {
// 	copyToClipboard,
// 	downloadAs,
// 	isMobileScreen,
// 	selectOrCopy,
// } from "../utils";
// import Locale from "../locales";
// import { ChatList } from "./chat-list";
// import { Chat } from "./chat";

// import dynamic from "next/dynamic";
// import { REPO_URL } from "../constant";

// export function Loading(props: { noLogo?: boolean }) {
// 	return (
// 		<div className={styles["loading-content"]}>
// 			{!props.noLogo && <BotIcon />}
// 			<LoadingIcon />
// 		</div>
// 	);
// }

// const Settings = dynamic(async () => (await import("./settings")).Settings, {
// 	loading: () => <Loading noLogo />,
// });

// function useSwitchTheme() {
// 	const config = useChatStore((state) => state.config);

// 	useEffect(() => {
// 		document.body.classList.remove("light");
// 		document.body.classList.remove("dark");

// 		if (config.theme === "dark") {
// 			document.body.classList.add("dark");
// 		} else if (config.theme === "light") {
// 			document.body.classList.add("light");
// 		}

// 		const themeColor = getComputedStyle(document.body)
// 			.getPropertyValue("--theme-color")
// 			.trim();
// 		const metaDescription = document.querySelector('meta[name="theme-color"]');
// 		metaDescription?.setAttribute("content", themeColor);
// 	}, [config.theme]);
// }

// const useHasHydrated = () => {
// 	const [hasHydrated, setHasHydrated] = useState<boolean>(false);

// 	useEffect(() => {
// 		setHasHydrated(true);
// 	}, []);

// 	return hasHydrated;
// };

export function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
	// const [createNewSession, currentIndex, removeSession] = useChatStore(
	// 	(state) => [
	// 		state.newSession,
	// 		state.currentSessionIndex,
	// 		state.removeSession,
	// 	],
	// );
	// // const loading = !useHasHydrated();
	// const [showSideBar, setShowSideBar] = useState(true);

	// // setting
	// const [openSettings, setOpenSettings] = useState(false);
	// const config = useChatStore((state) => state.config);

	// useSwitchTheme();

	// if (loading) {
	// 	return <Loading />;
	// }
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			alert('Login succeeded');
		}, 1000); // 模拟异步请求
	};

	return (
		<div style={{ padding: 20 }}>
			<h1>Login Page</h1>
			<form onSubmit={handleSubmit}>
				<div style={{ marginBottom: 20 }}>
					<label htmlFor="username" style={{ display: 'inline-block', width: 80, textAlign: 'right', marginRight: 10 }}>Username:</label>
					<input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
				</div>
				<div style={{ marginBottom: 20 }}>
					<label htmlFor="password" style={{ display: 'inline-block', width: 80, textAlign: 'right', marginRight: 10 }}>Password:</label>
					<input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
				</div>
				<button type="submit" disabled={loading}>Login</button>
			</form>
		</div>
	);
}
