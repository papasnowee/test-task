import {useEffect, useState} from "react";

import {Comment} from "./Comment";

import {Styles} from "./styles";
import getAuthorsRequest from "src/api/authors/getAuthorsRequest";
import getCommentsRequest from "src/api/comments/getCommentsRequest";
import heart from "./heart.svg";
import {calcLikes, moveChildrenToParent, sortByDate} from "./utils";
import {
    Author,
    AuthorsObj,
    CommentWithChildren,
    CommentsResponce,
    IComment,
} from "./types";
import {formatNumber} from "src/utils/utils";

export const Comments = () => {
    const [authors, setAuthors] = useState<AuthorsObj>({});
    const [pageNumber, setPageNumber] = useState(1);
    const [commentsPerPage, setCommentsPerPage] = useState(0);
    const [comments, setComments] = useState<IComment[]>([]); // show this comments
    const [totalPg, setTotalPage] = useState(1);

    useEffect(() => {
        async function getAuthors() {
            const authorsList: Author[] = await getAuthorsRequest().catch(
                (err: Error) => {
                    console.log(`getAuthorsRequest error: ${err}`);
                },
            );
            const authorsObj: AuthorsObj = {};

            // чтобы быстрее искать авторов по айди
            authorsList.forEach((author) => {
                authorsObj[author["id"]] = author;
            });
            setAuthors(authorsObj);
        }
        getAuthors();
    }, []);

    //TODO refactoring
    useEffect(() => {
        async function getComments() {
            const firstPage: CommentsResponce = await getCommentsRequest(
                1,
            ).catch((err: Error) => {
                console.log(`getCommentsRequest error: ${err}`);
            });

            const totalPage: number = firstPage.pagination.total_pages;
            const responceArray: Promise<CommentsResponce>[] = [];

            for (let i = 2; i <= totalPage; i++) {
                responceArray.push(getCommentsRequest(i));
            }
            const responceArr: CommentsResponce[] =
                (await Promise.all(responceArray).catch((err) => {
                    console.log(`getCommentsRequest error: ${err}`);
                })) ?? [];

            let comments = [...firstPage.data];
            responceArr.forEach((element: CommentsResponce) => {
                comments = [...comments, ...element.data];
            });

            moveChildrenToParent(comments); // TODO должна возвращать новый массив
            const firstLevelComments = comments.filter((item) => !item.parent);

            sortByDate(firstLevelComments);

            setComments(firstLevelComments);
            setCommentsPerPage(firstPage.pagination.size);
            setTotalPage(totalPage);
        }
        getComments();
    }, []);

    const handleLike = (commentID: IComment["id"], isLiked: boolean) => {
        const index = comments.findIndex((item) => commentID === item.id);
        comments[index].likes = isLiked
            ? comments[index].likes + 1
            : comments[index].likes - 1;
        const newComments = [...comments];
        setComments(newComments);
    };

    function renderComments(commentList: CommentWithChildren[]) {
        const list: JSX.Element[] = [];
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
                            handleLike(comment.id, isLiked);
                        }}
                    />
                </Styles.CommentContainer>,
            );
            if (comment.children?.length) {
                comment.children.forEach((child) => {
                    createComment(child, lvl + 1);
                });
                sortByDate(comment.children);
            }
        }

        for (let i = 0; i < pageNumber * commentsPerPage; i++) {
            createComment(commentList[i]);
        }

        return list;
    }

    const prettyLikeNumber = formatNumber(calcLikes(comments));
    const prettyCommentNumber = formatNumber(comments.length);

    const handlePress = () => {
        if (pageNumber + 1 <= totalPg) {
            setPageNumber(pageNumber + 1);
        }
    };

    return (
        <Styles.Container>
            <Styles.Top>
                <Styles.CommentNumber>{`${prettyCommentNumber} комментариев`}</Styles.CommentNumber>
                <Styles.Likes>
                    <Styles.LikeIcon src={heart} />
                    <Styles.LikeNumber>{prettyLikeNumber}</Styles.LikeNumber>
                </Styles.Likes>
            </Styles.Top>
            <Styles.CommentsContainaer>
                {renderComments(comments)}
            </Styles.CommentsContainaer>
            <Styles.Button onClick={handlePress}>Загрузить еще</Styles.Button>
        </Styles.Container>
    );
};
