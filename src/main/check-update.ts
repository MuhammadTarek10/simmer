export const checkUpdate = async () => {
  const url = 'https://simmer-server.onrender.com/'
  const res = await fetch(url)
  if (res.status === 200) {
    return true
  }
  return false
}
