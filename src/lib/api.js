import { error } from '@sveltejs/kit';

export async function get(fetch, url, params) {
	const q = new URLSearchParams(params);
	url = `${url}?${q}`;
	const response = await fetch(url);
	if (!response.ok) {
		error(response.status);
	}
	const result = await response.json();
	return result;
}

export async function post(fetch, url, data) {
	const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data)
  });
	if (!response.ok) {
		error(response.status);
	}
	const result = await response.json();
	return result;
}

export async function patch(fetch, url, data) {
	const response = await fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(data)
  });
	if (!response.ok) {
		error(response.status);
	}
	const result = await response.json();
	return result;
}

export async function del(fetch, url, data = {}) {
	const response = await fetch(url, {
    method: 'DELETE',
		body: JSON.stringify(data)
  });
	if (!response.ok) {
		error(response.status);
	}
	const result = await response.json();
	return result;
}