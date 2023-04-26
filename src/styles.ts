import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content: center;
`

// просто для красоты, чтобы компонент Comments не прилипал к верху или низу экрана
const CommentsContainer = styled.div`
    margin-top: 52px;
    margin-bottom: 64px;
    margin-left: 24px;
    margin-right: 24px;
`

export const Styles = {
    Container,
    CommentsContainer,
}

export const ScreenSize = {
    MOBILE_CONTAINER_WIDTH: '320px',
    MOBILE_WIDTH: '480px',
}
