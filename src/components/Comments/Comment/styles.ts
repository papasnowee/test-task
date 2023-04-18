import {ScreenSize} from "src/styles";
import {Typography} from "src/typography/typography";
import styled from "styled-components";

const grayFont = "rgba(130, 151, 171, 1)";

const avatarHeight = "68px";
const avatarHeightMobile = "40px";

const likesWidth = "57px";

const Container = styled.article`
    display: flex;
`;

const Avatar = styled.img`
    object-fit: cover;
    border-radius: 50%;
    width: ${avatarHeight};
    height: ${avatarHeight};
    margin-right: 20px;
    flex-shrink: 0;
    overflow: hidden;

    @media (max-width: ${ScreenSize.MOBILE_WIDTH}) {
        width: ${avatarHeightMobile};
        height: ${avatarHeightMobile};
    }
`;

const Wrapper = styled.div`
    flex-grow: 1;
`;
const NameLikesWrapper = styled.div`
    height: ${avatarHeight};
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: ${ScreenSize.MOBILE_WIDTH}) {
        height: ${avatarHeightMobile};
        margin-bottom: 8px;
    }
`;

const NameTimeWrapper = styled.header`
    height: 43px;
    display: flex;
    max-width: calc(100% - ${likesWidth} - 30px);
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    white-space: nowrap;
`;

const Name = styled.div`
    font-size: 16px;
    font-weight: 700;
    font-family: ${Typography.fontFamily.main};
    color: ${Typography.color.white};
    line-height: 20px;
    height: 20px;

    @media (max-width: ${ScreenSize.MOBILE_WIDTH}) {
        font-size: 14px;
        line-height: 22px;
    }
`;

const Time = styled.div`
    font-size: 16px;
    font-weight: 700;
    font-family: ${Typography.fontFamily.main};
    color: ${grayFont};
    line-height: 19px;
    height: 19px;

    @media (max-width: ${ScreenSize.MOBILE_WIDTH}) {
        font-size: 14px;
        line-height: 16.8px;
    }
`;

const Text = styled.div`
    font-family: ${Typography.fontFamily.main};
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: ${Typography.color.white};

    @media (max-width: ${ScreenSize.MOBILE_WIDTH}) {
        font-size: 14px;
        line-height: 16.8px;
    }
`;

const Likes = styled.div`
    height: 23px;
    color: ${Typography.color.white};
    font-family: ${Typography.fontFamily.main};
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 150%;

    @media (max-width: ${ScreenSize.MOBILE_WIDTH}) {
        font-size: 14px;
        line-height: 21px;
    }
`;

const LikesContainer = styled.button`
    all: unset;
    display: flex;
    align-items: center;

    &:hover {
        cursor: pointer;
    }
`;

const HeartIcon = styled.img`
    margin-right: 8px;

    @media (max-width: ${ScreenSize.MOBILE_WIDTH}) {
        width: 20px;
        height: 20px;
    }
`;

export const Styles = {
    HeartIcon,
    LikesContainer,
    Likes,
    Text,
    Time,
    Name,
    NameTimeWrapper,
    NameLikesWrapper,
    Wrapper,
    Container,
    Avatar,
};
