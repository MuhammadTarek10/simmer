import { defer } from 'react-router-dom'

export async function cardDetailsLoader() {
  return defer({ card: {} })
}

const CardDetails = () => {
  return <div>CardDetails</div>
}
export default CardDetails
