export async function deleteAsync(url) {
	let response = await fetch(url)
	if(response.status >= 200 && response.status < 300) {
		if(response.redirected === true) {
			window.location.replace(response.url);
		}
	}
}