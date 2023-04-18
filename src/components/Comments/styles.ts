import {ScreenSize} from "src/styles";
import {Typography} from "src/typography/typography";
import styled from "styled-components";

interface Comment {
    level: number;
}

const Container = styled.div`
    max-width: 562px;
    font-family: ${Typography.fontFamily.main};
`;
const Top = styled.div`
    height: 30px;
    display: flex;
    align-items: top;
    justify-content: space-between;
    margin-bottom: 32px;
    border-bottom: 1px solid rgba(118, 118, 118, 0.13);
`;
const Button = styled.button`
    all: unset;
    display: block;
    margin: 0 auto;
    height: 36px;
    width: 236px;
    font-family: ${Typography.fontFamily.main};
    font-size: 16px;
    color: ${Typography.color.white};
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: center;
    background: #313439;
    backdrop-filter: blur(13.5px);
    border-radius: 4px;

    transition: background-color 0.2s;

    &:hover {
        background-color: rgba(40, 40, 40, 1);
        cursor: pointer;
    }

    &:active {
        background-color: #313439;
    }
`;

const CommentsContainaer = styled.ul`
    all: unset;
    display: flex;
    align-items: end;
    flex-direction: column;
    margin-bottom: 60px;

    > li {
        margin-bottom: 32px;
    }

    @media (max-width: ${ScreenSize.MOBILE_WIDTH}) {
        > li {
            margin-bottom: 24px;
        }
    }
`;
const CommentContainer = styled.li<Comment>`
    all: unset;
    width: ${(props) => 0.95 ** (props.level - 1) * 100}%;
`;

const LikeNumber = styled.div`
    display: flex;
    justify-content: space-between;
`;

const LikeIcon = styled.img`
    width: 22px;
    height: 22px;
    margin-right: 8px;
`;

const CommentNumber = styled.header`
    color: ${Typography.color.white};
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
`;

const Likes = styled.div`
    color: ${Typography.color.white};
    font-size: 15px;
    font-weight: 700;
    line-height: 23px;
    letter-spacing: 0em;
`;

export const Styles = {
    Likes,
    CommentNumber,
    LikeIcon,
    LikeNumber,
    Container,
    Top,
    Button,
    CommentsContainaer,
    CommentContainer,
};
