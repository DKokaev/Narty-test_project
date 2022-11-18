export const ComicsOptions = {
	hostname: 'msofter.com',
	headers: {
		Accept: 'application/json',
	},
	comisclist: {
		method: 'GET',
		path: '/narty/api/comics/?lang=ru&',
		// path: '/narty/api/comics/?lang=ru&search=boy',
		maxRedirects: 20,
	},
	comicsId: {
		method: 'GET',
		path: '/narty/api/comics/13',
		maxRedirects: 20,
	},
	langList: {
		method: 'GET',
		path: '/narty/api/langs',
		maxRedirects: 20,
	},
	sns: {
		method: 'GET',
		path: '/narty/api/sns',
		maxRedirects: 20,
	},
	feedback: {
		method: 'POST',
		path: '/narty/api/feedback',
		maxRedirects: 20,
	},
};
