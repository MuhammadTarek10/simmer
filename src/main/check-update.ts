import { serverUrl } from '@shared/constants'
import axios from 'axios'

export const checkUpdate = async () => {
  try {
    const res = await axios.get(serverUrl)
    if (res.status === 200) {
      return true
    }
    return setTimeout(checkUpdate, 1000)
  } catch (error) {
    console.log(error)
    return false
  }
}
