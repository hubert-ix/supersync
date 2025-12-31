import * as api from '$lib/api';

export function formatDate(date) {
  date = new Date(date);
  let str = date.toLocaleDateString();
  return str;
}

export function sortByWeight(a,b) {
  if (a.weight == b.weight) return 0;
  return (a.weight > b.weight)?1:-1;
}

export function sortByOrder(a,b) {
  if (a.display_order == b.display_order) return 0;
  return (a.display_order > b.display_order)?1:-1;
}

export function sortByDay(a,b) {
  if (a.day == b.day) return 0;
  return (a.day > b.day)?1:-1;
}

export function nl2br(str) {
  if (str) {
    str = str.replace(/\n{2}/g, '</p><p>');
    str = str.replace(/\n/g, '<br />');
    str = '<p>' + str + '</p>';
  }
  return str;
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function uploadFile(url, file, user) {
  let headers = {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/octet-stream',
    'Content-Disposition': 'file; filename="' + file.name + '"',
  };
  if (user) {
    headers.Authorization = 'Bearer ' + user.access_token
  }
  let res = await fetch(url, {
    method: 'POST',
    body: file,
    headers
  });
  let response = await res.json();
  return response;
}

export function validateEmail(email) {
  //if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function getMachineName(str) {
  str = str.replace(/[^\w\s]/gi, '');
  str = str.replace(/\s+/g, '-').toLowerCase();
  str = str.substring(0,32);
  return str;
}

export function getFirstParagraph(text) {
  let str = "";
  // extract the first paragraph
  let paragraphs = [];
  text.replace(/<p>(.*?)<\/p>/g, function () {
    paragraphs.push(arguments[0]);
  });
  str = paragraphs[0];
  // remove html tags
  str = str.replace(/(<([^>]+)>)/gi, "");
  return str;
}

export function capitalise(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const includesAll = (arr, values) => values.every(v => arr.includes(v));

export function validatePassword(password) {
  const regex = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/; // Anything with less than 8 characters OR anything with no numbers OR anything with no uppercase OR or anything with no lowercase OR anything with no special characters.
  let valid = true;
  let message = "";
  if (password === "") {
    valid = false;
    message = "Please choose a password";
  }
  else if (password.length < 8) {
    valid = false;
    message = "Please enter at least 8 characters";
  }
  else if (password.match(regex)) {
    valid = false;
    message = "Please include an uppercase letter, one number, and one special character";
  }
  return { valid, message }
}

export function generateSlug(str) {
  let temp = str.trim().replace(/\s+/g, " ");
  let slug = temp.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  return slug;
}

export function generateString(length, includeSpecialCharacters = true) {
  let string = "";
  let chars = "0123456789abcdefghijklmnopqrstuvwxyz";
  if (includeSpecialCharacters) {
    chars += "!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  for (let i = 0; i <= length; i++) {
    let randomNumber = Math.floor(Math.random() * chars.length);
    string += chars.substring(randomNumber, randomNumber +1);
  }
  return string;
}
