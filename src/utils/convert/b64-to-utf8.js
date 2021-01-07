// b64_to_utf8.js
// Декодирование строки из base-64 в Unicode

export function b64_to_utf8(str) {
  if (!!window) {
    return decodeURIComponent(escape(window.atob(str)));
  }
  return str;
}
