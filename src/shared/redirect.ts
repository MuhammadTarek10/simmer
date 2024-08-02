import { redirect } from 'react-router-dom'

function mutateResponse(path) {
  const response = redirect(path)
  return response
}

export { mutateResponse as redirect }
