export default {
	debug: process.env.NODE_ENV !== 'production',
	fallbackLng: 'en',
	supportedLngs: ['en', 'it', 'pt'],
	defaultNS: 'common',
	react: { useSuspense: false },
};
