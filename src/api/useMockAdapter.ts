import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import authors from 'src/mock/authors'
import { commentsPage1, commentsPage2, commentsPage3 } from 'src/mock/comments'

const useMockAdapter = () => {
    const mock = new MockAdapter(axios, { delayResponse: 600 })

    // authors
    mock.onGet('/api/authors').reply(200, authors)

    // comments number, likes number
    mock.onGet('/api/comments/likesAndCommentsNumber').reply(200, {
        comments: 29,
        likes: 3333,
    })

    // comments
    mock.onGet('/api/comments', { params: { page: 1 } }).reply(200, commentsPage1)

    mock.onGet('/api/comments', { params: { page: 2 } }).networkErrorOnce()
    mock.onGet('/api/comments', { params: { page: 2 } }).reply(200, commentsPage2)

    mock.onGet('/api/comments', { params: { page: 3 } }).reply(200, commentsPage3)
}

export default useMockAdapter
