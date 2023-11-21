import tw from 'twin.macro'
import { ColumnContainer } from '../common/Container'
import { MutedText } from '../common/Typography'

const Container = tw.div`
  h-screen dark:bg-neutral-900
`

const FourOhFour = tw.span`
  text-7xl font-black text-neutral-400
`

export default function Error(props) {
  return (
    <Container>
      <ColumnContainer>
        <FourOhFour>404.</FourOhFour>
        <MutedText>You won't find us here.</MutedText>
      </ColumnContainer>
    </Container>
  )
}
