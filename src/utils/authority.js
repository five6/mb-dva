
const code = 'X-MESSAGE-RESPONSE-CODE';
const blogToken = 'X-TOKEN-BLOG';

export function getErrorMessage(str) {
  const messageString =
    typeof str === 'undefined' ? localStorage.getItem(`${code}`) : localStorage.getItem(str);
  let message;
  try {
    message = JSON.parse(messageString);
  } catch (e) {
    message = messageString;
  }
  return message;
}

export function clearAuthority() {
  localStorage.removeItem(blogToken);
}


export function setAuthority(authority,) {
  try {
    localStorage.setItem(blogToken, authority);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}