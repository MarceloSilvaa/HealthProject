export function getAsync(url) {
	return new Promise(async function (resolve, reject) {
		let response = await fetch(url, {
			method: "GET",
			headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    	},
			credentials:"include"}
		)
		let data = await response.json()
		resolve(data)
	})
}

export async function deleteAsync(url) {
	let response = await fetch(url)
	if(response.status >= 200 && response.status < 300) {
		if(response.redirected === true) {
			window.location.replace(response.url)
		}
	}
}