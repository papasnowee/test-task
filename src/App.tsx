import { Comments } from './components/Comments'
import { Styles } from './styles'

function App() {
    return (
        <Styles.Container>
            <Styles.CommentsContainer>
                <Comments />
            </Styles.CommentsContainer>
        </Styles.Container>
    )
}

export default App
