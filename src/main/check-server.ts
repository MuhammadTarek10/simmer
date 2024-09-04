export const checkServer = async () => {
  const url = 'https://simmer-server.onrender.com/'
  const res = await fetch(url)
  if (res.status === 200) {
    return false
  }
  return false
}
