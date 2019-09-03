
// contains functions to interact with the back-end

export const getExamples = async () => {
  const response = await fetch('/api/examples')
  const body = await response.json()
  if (response.status !== 200) throw Error(body.message)

  return body
}

export const getCampaigns = async () => {
  const response = await fetch('/api/campaigns')
  const body = await response.json()
  if (response.status !== 200) throw Error(body.message)

  return body
}

export const getCampaignById = async (id) => {
  const response = await fetch(`/api/campaigns/${id}`)
  const body = await response.json()
  if (response.status !== 200) throw Error(body.message)

  return body
}
