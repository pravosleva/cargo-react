// utf8_to_b64.js
// Кодирование строки Unicode в base-64

export function utf8_to_b64(str) {
  if (!!window) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }
  return str;
}
