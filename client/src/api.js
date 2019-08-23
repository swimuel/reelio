// contains functions to interact with the back-end

export const getExamples = async () => {
  const response = await fetch('/api/examples')
  const body = await response.json()
  if (response.status !== 200) throw Error(body.message)

  return body
}

export const getTime = async () => {
  return "5 days"
}
