
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

export const getMoviesByID = async (id) => {
  const response = await fetch('/api/omdb/' + id)
  const body = await response.json()
  if (response.status !== 200) throw Error(body.message)

  return body
}

export const getMoviesBySearch = async (query) => {
  const response = await fetch('/api/omdb?search=' + query)
  const body = await response.json()
  if (response.status !== 200) throw Error(body.message)

  return body
}

export const createCampaign = async (campaign) => {
  const options = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(campaign)
  }

  const response = await fetch('/api/campaign', options)
  if (response.status !== 201) throw Error(response.message)

  return response.json()
}

export const getScreenTypes = async () => {
  const response = await fetch('/api/screenTypes')
  const body = await response.json()
  if (response.status !== 200) throw Error(body.message)

  return body
}
