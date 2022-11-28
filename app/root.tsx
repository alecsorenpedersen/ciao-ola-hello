import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	useCatch,
} from '@remix-run/react';

import { withEmotionCache } from '@emotion/react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import { MetaFunction, LinksFunction, LoaderFunction } from '@remix-run/node'; // Depends on the runtime you choose

import { ServerStyleContext, ClientStyleContext } from './context';

import { json } from '@remix-run/node';
import { useChangeLanguage } from 'remix-i18next';
import remixI18n from './i18n.server';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect } from 'react';

export const loader: LoaderFunction = async ({ request }) => {
	const locale = await remixI18n.getLocale(request);
	const t = await remixI18n.getFixedT(request, 'common');
	const title = t('headTitle');
	return json({ locale, title });
};

export const handle = {
	// In the handle export, we could add a i18n key with namespaces our route
	// will need to load. This key can be a single string or an array of strings.
	i18n: ['common'],
};

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: 'ola',
	viewport: 'width=device-width,initial-scale=1',
});

export let links: LinksFunction = () => {
	return [
		{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
		{ rel: 'preconnect', href: 'https://fonts.gstatic.com' },
		{
			rel: 'stylesheet',
			href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap',
		},
	];
};

interface DocumentProps {
	children: React.ReactNode;
	title?: string;
}

const Document = withEmotionCache(
	({ children }: DocumentProps, emotionCache) => {
		const serverStyleData = useContext(ServerStyleContext);
		const clientStyleData = useContext(ClientStyleContext);

		// Only executed on client
		useEffect(() => {
			// re-link sheet container
			emotionCache.sheet.container = document.head;
			// re-inject tags
			const tags = emotionCache.sheet.tags;
			emotionCache.sheet.flush();
			tags.forEach((tag) => {
				(emotionCache.sheet as any)._insertTag(tag);
			});
			// reset cache to reapply global styles
			clientStyleData?.reset();
		}, []);

		const { i18n } = useTranslation();
		const { locale } = useLoaderData();

		// This hook will change the i18n instance language to the current locale
		// detected by the loader, this way, when we do something to change the
		// language, this locale will change and i18next will load the correct
		// translation files
		useChangeLanguage(locale);

		return (
			<html lang={i18n.language}>
				<head>
					<Meta />
					<Links />
					{serverStyleData?.map(({ key, ids, css }) => (
						<style
							key={key}
							data-emotion={`${key} ${ids.join(' ')}`}
							dangerouslySetInnerHTML={{ __html: css }}
						/>
					))}
				</head>
				<body>
					{children}
					<ScrollRestoration />
					<Scripts />
					<LiveReload />
				</body>
			</html>
		);
	},
);

const colors = {
	brand: {
		900: '#1a365d',
		800: '#153e75',
		700: '#2a69ac',
	},
};

const theme = extendTheme({ colors });

export default function App() {
	return (
		<Document>
			<ChakraProvider theme={theme}>
				<Outlet />
			</ChakraProvider>
		</Document>
	);
}
// ...
export function CatchBoundary() {
	const caught = useCatch();
	let message;

	switch (caught.status) {
		case 401:
			message = <text>401 nope</text>;
			break;
		case 404:
			message = <text>404</text>;
			break;

		default:
			throw new Error(caught.data || caught.statusText);
	}
	return (
		<Document title={`${caught.status} ${caught.statusText}`}>
			<Layout>
				<h1>
					{caught.status}: {caught.statusText}
				</h1>
				{message}
			</Layout>
		</Document>
	);
}
function Layout({ children }: React.PropsWithChildren<{}>) {
	return <main>{children}</main>;
}
