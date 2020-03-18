
const code = 'X-MESSAGE-RESPONSE-CODE';

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
