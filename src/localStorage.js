export const saveData = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data))
}

export const getData = (name) => {
  const data = localStorage.getItem(name)
  return JSON.parse(data)
}

export const deleteData = name => {
  localStorage.removeItem(name)
}
