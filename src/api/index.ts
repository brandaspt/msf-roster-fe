const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5001"

const fetchWithCredentials = async (
  route: string,
  options: RequestInit = {}
) => {
  return fetch(API_BASE_URL + route, {
    ...options,
    credentials: "include"
  })
}

export const getRoster = async () => {
  const resp = await fetchWithCredentials("/my-roster")
  return resp.json()
}

export const getMe = async () => {
  const resp = await fetchWithCredentials("/my-card")
  return resp.json()
}
