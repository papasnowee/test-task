import { Author } from 'src/api/authors/getAuthorsRequest'
import { IComment } from 'src/api/comments/getCommentsRequest'

export type AuthorsObj = {
  [key in Author['id']]: Author
}

export interface CommentWithChildren extends IComment {
  children?: IComment[]
}
