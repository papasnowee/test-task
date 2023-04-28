import { useEffect, useState } from 'react'

import { Comment } from './Comment'

import { Styles } from './styles'
import getAuthorsRequest from 'src/api/authors/getAuthorsRequest'
import getCommentsRequest, { IComment } from 'src/api/comments/getCommentsRequest'
import heart from './heart.svg'
import { moveChildrenToParent, sortByDate, updateLikeInComment } from './utils'
import { AuthorsObj, CommentWithChildren } from './types'
import { prettifyNumber } from 'src/utils/utils'
import getLikesAndCommentsNumbersRequest from 'src/api/likesAndCommentsNumbers/getLikesAndCommentsNumbersRequest'
import { useApiRequest } from 'src/services/useApiRequest'

export const Comments = () => {
    const [authors, setAuthors] = useState<AuthorsObj>({})
    const [pageNumber, setPageNumber] = useState(0)
    const [comments, setComments] = useState<IComment[]>([])
    const [totalPg, setTotalPage] = useState(1)
    const [likes, setLikes] = useState(0)
    const [commentsAmmount, setCommentsAmmount] = useState(0)

    const {
        loading: authorLoading,
        loaded: authorsList,
        error: authorsError,
        sendRequest: sendAuthorsRequest,
    } = useApiRequest(getAuthorsRequest)

    const {
        loading: pageLoading,
        loaded: page,
        error: pageError,
        sendRequest: sendCommentsRequest,
    } = useApiRequest(getCommentsRequest)

    // const {
    //     loading: getAuthorLoading,
    //     loaded: authorsList,
    //     error: getAuthorsError,
    //     sendRequest: sendAuthorsRequest,
    // } = useApiRequest(getAuthorsRequest)
    useEffect(() => {
        const authorsObj: AuthorsObj = {}
        if (authorsList) {
            // for faster searching
            authorsList.forEach((author) => {
                authorsObj[author['id']] = author
            })
            setAuthors(authorsObj)
        }
    }, [authorsList])

    useEffect(() => {
        sendAuthorsRequest()
    }, [])

    useEffect(() => {
        async function likesAndCommentsNumbers() {
            const data = await getLikesAndCommentsNumbersRequest()

            setLikes(data.likes)
            setCommentsAmmount(data.comments)
        }
        likesAndCommentsNumbers()
    }, [])

    useEffect(() => {
        sendCommentsRequest(1)
    }, [])

    useEffect(() => {
        if (page) {
            const totalPage: number = page.pagination.total_pages
            moveChildrenToParent(page.data)
            const firstLevelComments = page.data.filter((item) => !item.parent)

            sortByDate(firstLevelComments)
            setComments((previousComments) => {
                return [...previousComments, ...firstLevelComments]
            })
            setTotalPage(totalPage)
            setPageNumber((previousPageNumber) => {
                return previousPageNumber + 1
            })
        }
    }, [page])

    const handleLike = (commentID: IComment['id'], isLiked: boolean) => {
        updateLikeInComment(commentID, comments, isLiked, setComments)
        setLikes((previousLikes) => {
            return isLiked ? previousLikes + 1 : previousLikes - 1
        })
    }

    function renderComments(commentList: CommentWithChildren[]) {
        const list: JSX.Element[] = []
        function addJSXCommentAndItsChildrenToList(comment: CommentWithChildren, lvl = 1) {
            const commentJSX = (
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
                </Styles.CommentContainer>
            )
            list.push(commentJSX)
            if (comment.children?.length) {
                sortByDate(comment.children)
                comment.children.forEach((child) => {
                    addJSXCommentAndItsChildrenToList(child, lvl + 1)
                })
            }
        }

        commentList.forEach((comment) => {
            addJSXCommentAndItsChildrenToList(comment)
        })

        return list
    }

    const prettyLikeNumber = prettifyNumber(likes)
    const prettyCommentNumber = prettifyNumber(commentsAmmount)

    const handlePress = () => {
        sendCommentsRequest(pageNumber + 1)
    }

    const isShownButton = pageNumber === totalPg ? false : true

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
            {isShownButton && <Styles.Button onClick={handlePress}>Download more</Styles.Button>}
        </Styles.Container>
    )
}
