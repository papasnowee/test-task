import { FC, useState } from 'react'
import { Styles } from './styles'
import filledHeart from './icons/filledHeart.svg'
import emptyHeart from './icons/emptyHeart.svg'
import { timeAgo } from '../utils'
import { formatNumber } from 'src/utils/utils'

interface Props {
    authorName: string
    avatar: string
    created: string
    likes: number
    text: string
    makeLike: (isClicked: boolean) => void
}

export const Comment: FC<Props> = (props) => {
    const { authorName, avatar, created, likes, text, makeLike } = props

    const [isLiked, setClick] = useState(false)
    const handleLike = () => {
        setClick(!isLiked)

        // тут должен отправляться запрос на сервер о том, что лайков стало больше или меньше
        makeLike(!isLiked)
    }
    return (
        <Styles.Container>
            <Styles.Avatar src={avatar} />
            <Styles.Wrapper>
                <Styles.NameLikesWrapper>
                    <Styles.NameTimeWrapper>
                        <Styles.Name>{authorName}</Styles.Name>
                        <Styles.Time>{timeAgo(new Date(created))}</Styles.Time>
                    </Styles.NameTimeWrapper>
                    <Styles.LikesContainer onClick={handleLike}>
                        {isLiked && <Styles.HeartIcon src={filledHeart} />}
                        {!isLiked && <Styles.HeartIcon src={emptyHeart} />}

                        <Styles.Likes>{formatNumber(likes)}</Styles.Likes>
                    </Styles.LikesContainer>
                </Styles.NameLikesWrapper>
                <Styles.Text>{text}</Styles.Text>
            </Styles.Wrapper>
        </Styles.Container>
    )
}
