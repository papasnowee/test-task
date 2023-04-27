import axios from 'axios'

interface likesAndCommentsNumbers {
    likes: number
    comments: number
}

async function getLikesAndCommentsNumbersRequest(): Promise<likesAndCommentsNumbers> {
    const { data } = (await axios
        .get<likesAndCommentsNumbers>('/api/comments/likesAndCommentsNumber')
        .catch((err) => console.log(`getLikesAndCommentsNumbers Error: ${err} `))) ?? {
        data: { likes: 0, comments: 0 },
    }
    return data
}

export default getLikesAndCommentsNumbersRequest
