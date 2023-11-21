import tw from 'twin.macro'
import { useGet } from '../../../hooks/api'
import { ColumnContainer, PageContainer } from '../../common/Container'
import Loader from '../../common/Loader'
import ListItem from './ListItem'

const BigTextContainer = tw.div`
  flex flex-col items-center justify-center py-5 md:py-8 lg:py-12
`

const BigText = tw.span`
  text-2xl md:([font-size:4vw] [line-height:4vw]) 2xl:([font-size:3vw] [line-height:3vw]) font-bold text-neutral-400 select-none dark:text-neutral-600
`

const List = tw.div`
  flex flex-col gap-3 md:gap-4 xl:gap-8
`

export default function ReviewList(props) {
  const { data: reviews, isLoading: reviewsLoading, isError: reviewsError } = useGet('reviews?populate[album][populate]=*&sort=createdAt:desc')

  if (reviewsError) {
    return (
      <PageContainer>
        <ColumnContainer>
          <BigTextContainer>
            <BigText>Couldn't get reviews.</BigText>
            Sorry, try again later.
          </BigTextContainer>
        </ColumnContainer>
      </PageContainer>
    )
  } else {
    return (
      <Loader loading={reviewsLoading}>
        <PageContainer>
          <BigTextContainer>
            <BigText>The music pushing us forward.</BigText>
          </BigTextContainer>
          <List>
            {reviews?.data.map((review) => (
              <ListItem review={review} key={review.id} />
            ))}
          </List>
        </PageContainer>
      </Loader>
    )
  }


}
