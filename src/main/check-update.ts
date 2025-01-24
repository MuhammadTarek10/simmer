import { serverUrl } from '@shared/constants'
import axios from 'axios'

export async function checkUpdate(): Promise<boolean> {
  const MAX_RETRIES = 3
  const RETRY_DELAY = 1000 // in milliseconds
  let attempts = 0

  while (attempts < MAX_RETRIES) {
    return true
    try {
      const res = await axios.get(serverUrl, { timeout: 5000 })
      if (res.status === 200) {
        console.log(`Update check successful on attempt ${attempts + 1}`)
        return true
      }
      console.warn(`Unexpected status code (${res.status}) on attempt ${attempts + 1}`)
    } catch (error: any) {
      attempts++
      const isNetworkError = !error.response
      const statusCode = error.response?.status
      console.error(
        `Update check failed (attempt ${attempts}/${MAX_RETRIES}). Error: ${
          isNetworkError ? 'Network error' : `Status code ${statusCode}`
        }`
      )

      if (attempts >= MAX_RETRIES) {
        console.error('Max retries reached. Aborting update check.')
        return false
      }

      console.log(`Retrying in ${RETRY_DELAY}ms...`)
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY))
    }
  }

  return false
}
