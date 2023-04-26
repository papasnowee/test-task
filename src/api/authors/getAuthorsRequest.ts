import axios from 'axios'
export interface Author {
  id: number
  name: string
  avatar: any // image
}

async function getAuthorsRequest(): Promise<Author[]> {
  const { data } = (await axios
    .get<Author[]>('/api/authors')
    .catch((err) => console.log(`getCommentsRequest Error: ${err} `))) ?? { data: [] }
  return data
}

export default getAuthorsRequest
