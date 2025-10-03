export function guardar(key, valor) {
  localStorage.setItem(key, JSON.stringify(valor));
}

export function recuperar(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}