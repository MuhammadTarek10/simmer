import { redirect } from '../redirect'

export async function requireAuth() {
  return null
  const isLoggedIn = localStorage.getItem('loggedIn')

  if (!isLoggedIn) {
    throw redirect(`/login`)
  }
  return null
}
