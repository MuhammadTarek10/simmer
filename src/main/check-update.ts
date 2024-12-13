import { serverUrl } from '@shared/constants'
import axios from 'axios'

export async function checkUpdate(): Promise<boolean> {
  const MAX_RETRIES = 3
  const RETRY_DELAY = 1000
  let attempts = 0

  while (attempts < MAX_RETRIES) {
    try {
      const res = await axios.get(serverUrl)
      return res.status === 200
    } catch (error) {
      attempts++
      console.error(`Update check failed (attempt ${attempts}/${MAX_RETRIES}):`, error)

      if (attempts < MAX_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY))
        continue
      }

      return false
    }
  }

  return false
}
