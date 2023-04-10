// use client
import { Analytics } from "@vercel/analytics/react";
import { AppProps } from 'next/app';

import "array.prototype.at";

import { Home } from "./components/home";
import { Login } from "./pages/login";


// export default MyApp;
export default function App({ Component, pageProps }: AppProps) {
	console.log(Component,'Component')
	switch (Component) {
		case Home:
			return (
				<>
					<Component {...pageProps} />
					<Analytics />
				</>
			);

		case Login:
			return (
				<>
					<Component {...pageProps} />
				</>
			);
		default:
			return (
				<>
					<Home />
					<Analytics />
				</>
			);
	}

}
