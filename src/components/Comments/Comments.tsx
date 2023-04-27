import { useEffect, useState } from 'react'

import { Comment } from './Comment'

import { Styles } from './styles'
import getAuthorsRequest from 'src/api/authors/getAuthorsRequest'
import getCommentsRequest, { CommentsResponce, IComment } from 'src/api/comments/getCommentsRequest'
import heart from './heart.svg'
import { moveChildrenToParent, sortByDate } from './utils'
import { AuthorsObj, CommentWithChildren } from './types'
import { formatNumber } from 'src/utils/utils'
import getLikesAndCommentsNumbersRequest from 'src/api/likesAndCommentsNumbers/getLikesAndCommentsNumbersRequest'

export const Comments = () => {
    const [authors, setAuthors] = useState<AuthorsObj>({})
    const [pageNumber, setPageNumber] = useState(1)
    const [commentsPerPage, setCommentsPerPage] = useState(0)
    const [comments, setComments] = useState<IComment[]>([])
    const [totalPg, setTotalPage] = useState(1)
    const [likes, setLikes] = useState(0)
    const [commentsAmmount, setCommentsAmmount] = useState(0)

    useEffect(() => {
        async function getAuthors() {
            const authorsList = await getAuthorsRequest()
            const authorsObj: AuthorsObj = {}

            // чтобы быстрее искать авторов по айди
            authorsList.forEach((author) => {
                authorsObj[author['id']] = author
            })
            setAuthors(authorsObj)
        }
        getAuthors()
    }, [])

    useEffect(() => {
        async function likesAndCommentsNumbers() {
            const data = await getLikesAndCommentsNumbersRequest()

            setLikes(data.likes)
            setCommentsAmmount(data.comments)
        }
        likesAndCommentsNumbers()
    }, [])

    //TODO refactoring
    useEffect(() => {
        async function getComments() {
            const firstPage = await getCommentsRequest(1)
            const totalPage: number = firstPage.pagination?.total_pages
            const responceArray: Promise<CommentsResponce>[] = []

            for (let i = 2; i <= totalPage; i++) {
                responceArray.push(getCommentsRequest(i))
            }
            const responceArr: CommentsResponce[] = await Promise.all(responceArray)
            let comments = [...firstPage.data]
            responceArr.forEach((element: CommentsResponce) => {
                comments = [...comments, ...element.data]
            })

            moveChildrenToParent(comments) // TODO should return new array
            const firstLevelComments = comments.filter((item) => !item.parent)

            sortByDate(firstLevelComments)

            setComments(firstLevelComments)
            setCommentsPerPage(firstPage.pagination.size)
            setTotalPage(totalPage)
        }
        getComments()
    }, [])

    const handleLike = (commentID: IComment['id'], isLiked: boolean) => {
        const index = comments.findIndex((item) => commentID === item.id)
        comments[index].likes = isLiked ? comments[index].likes + 1 : comments[index].likes - 1
        const newComments = [...comments]
        setLikes((previousLikes) => {
            return isLiked ? previousLikes + 1 : previousLikes - 1
        })
        setComments(newComments)
    }

    function renderComments(commentList: CommentWithChildren[]) {
        const list: JSX.Element[] = []
        function createComment(comment: CommentWithChildren, lvl = 1) {
            list.push(
                <Styles.CommentContainer key={comment.id} level={lvl}>
                    <Comment
                        authorName={authors[comment.author].name}
                        avatar={authors[comment.author].avatar}
                        created={comment.created}
                        text={comment.text}
                        likes={comment.likes}
                        makeLike={(isLiked: boolean) => {
                            handleLike(comment.id, isLiked)
                        }}
                    />
                </Styles.CommentContainer>,
            )
            if (comment.children?.length) {
                comment.children.forEach((child) => {
                    createComment(child, lvl + 1)
                })
                sortByDate(comment.children)
            }
        }

        for (let i = 0; i < pageNumber * commentsPerPage; i++) {
            createComment(commentList[i])
        }

        return list
    }

    const prettyLikeNumber = formatNumber(likes)
    const prettyCommentNumber = formatNumber(commentsAmmount)

    const handlePress = () => {
        if (pageNumber + 1 <= totalPg) {
            setPageNumber(pageNumber + 1)
        }
    }

    return (
        <Styles.Container>
            <Styles.Top>
                <Styles.CommentNumber>{`${prettyCommentNumber} comments`}</Styles.CommentNumber>
                <Styles.Likes>
                    <Styles.LikeIcon src={heart} />
                    <Styles.LikeNumber>{prettyLikeNumber}</Styles.LikeNumber>
                </Styles.Likes>
            </Styles.Top>
            <Styles.CommentsContainaer>{renderComments(comments)}</Styles.CommentsContainaer>
            <Styles.Button onClick={handlePress}>Download more</Styles.Button>
        </Styles.Container>
    )
}
