export const fetchApi = (url: string, payload: any = {}) => {
	return fetch(url, {
		method: 'GET',
		cache: 'no-store',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		...payload
	})
	.then(data => data.json())
	.catch(err => err)
}