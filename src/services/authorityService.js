const code = 'X-MESSAGE-RESPONSE-CODE';
const TOKEN = 'X-TOKEN-BLOG';

export function getToken() {
  let token = getAuthority(code);

  if (!!token === false) return '';
  else return `Bearer ${token}`
}

export function getAuthority(str) {
  const authorityString =
    typeof str === 'undefined' ? localStorage.getItem(TOKEN) : localStorage.getItem(str);
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  return authority;
}