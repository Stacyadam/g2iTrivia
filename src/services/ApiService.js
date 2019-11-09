export const fetchJson = async url => {
	const response = await fetch(url).catch(error => console.log('api error'));
	return response.json();
};
