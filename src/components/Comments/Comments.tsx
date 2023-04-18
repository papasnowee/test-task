import {useEffect, useState} from "react";

import {Comment} from "./Comment";

import {Styles} from "./styles";
import getAuthorsRequest from "src/api/authors/getAuthorsRequest";
import getCommentsRequest from "src/api/comments/getCommentsRequest";
import heart from "./heart.svg";
import {
    calcLikes,
    createObjectList,
    moveChildrenToParent,
    sortByDate,
} from "./utils";
import {Author, AuthorsObj, CommentWithChildren, IComment} from "./types";
import {formatNumber} from "src/utils/utils";

export const Comments = () => {
    const [authors, setAuthors] = useState<AuthorsObj>({});
    const [pageNumber, setPageNumber] = useState(1);
    const [comments, setComments] = useState<IComment[]>([]);

    useEffect(() => {
        async function getAuthors() {
            const authorsList: Author[] = await getAuthorsRequest();
            const authorsObj: AuthorsObj = {};

            // чтобы быстрее искать авторов по айди
            authorsList.forEach((author) => {
                authorsObj[author["id"]] = author;
            });
            setAuthors(authorsObj);
        }
        getAuthors();
    }, []);

    useEffect(() => {
        async function getComments() {
            const newComments = await getCommentsRequest(pageNumber);
            setComments([...comments, ...newComments.data]);
        }
        getComments();
    }, [pageNumber]);

    const newComments = createObjectList(comments);

    moveChildrenToParent(newComments);

    const firstLevelComments = newComments.filter((item) => !item.parent);
    sortByDate(firstLevelComments);

    const handleLike = (commentID: IComment["id"], isLiked: boolean) => {
        const index = comments.findIndex((item) => commentID === item.id);
        console.log({like: comments[index].likes});
        comments[index].likes = isLiked
            ? comments[index].likes + 1
            : comments[index].likes - 1;
        const newComments = [...comments];
        setComments(newComments);

        console.log({like: comments[index].likes});
    };

    function renderComments(firstLevelList: CommentWithChildren[]) {
        const list: JSX.Element[] = [];
        function createComment(comment: CommentWithChildren, lvl = 1) {
            list.push(
                <Styles.CommentContainer level={lvl}>
                    <Comment
                        key={comment.id}
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

        firstLevelList.forEach((item) => {
            createComment(item);
        });

        return list;
    }

    const prettyLikeNumber = formatNumber(calcLikes(comments));
    const prettyCommentNumber = formatNumber(comments.length);

    const handlePress = () => {
        setPageNumber((prevoiusPageNumber) => {
            return prevoiusPageNumber + 1;
        });
    };

    return (
        <Styles.Container>
            <Styles.Top>
                <Styles.CommentNumber>{`${prettyCommentNumber} комментариев`}</Styles.CommentNumber>
                <Styles.LikeNumber>
                    <Styles.LikeIcon src={heart} />
                    <Styles.Likes>{prettyLikeNumber}</Styles.Likes>
                </Styles.LikeNumber>
            </Styles.Top>
            <Styles.CommentsContainaer>
                {renderComments(firstLevelComments)}
            </Styles.CommentsContainaer>
            <Styles.Button onClick={handlePress}>Загрузить еще</Styles.Button>
        </Styles.Container>
    );
};
