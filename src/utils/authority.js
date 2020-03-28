
import jwtDecode from 'jwt-decode';

const TOKEN = 'X-TOKEN-BLOG';

export function clearAuthority() {
  localStorage.removeItem(TOKEN);
}


export function setAuthority(authority,) {
  try {
    localStorage.setItem(TOKEN, authority);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export function getAuthority() {
  return localStorage.getItem(TOKEN);
}

export function getLoginUserInfo() {
  const jwt =  getAuthority();
  if(!jwt) return null;
  return jwtDecode(jwt);
}