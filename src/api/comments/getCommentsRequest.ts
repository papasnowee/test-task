import axios from 'axios'
import { Author } from '../authors/getAuthorsRequest'

interface Pagination {
  page: number
  size: number
  total_pages: number
}
export interface CommentsResponce {
  data: IComment[]
  pagination: Pagination
}

export interface IComment {
  parent: null | number
  id: number
  created: string
  text: string
  author: Author['id']
  likes: number
}

async function getCommentsRequest(page: number): Promise<CommentsResponce> {
  const { data } = (await axios
    .get<CommentsResponce>('/api/comments', { params: { page } })
    .catch((err) => console.log(`getCommentsRequest Error: ${err} `))) ?? {
    data: { data: [], pagination: { page: 1, size: 1, total_pages: 1 } },
  }
  return data
}

export default getCommentsRequest
