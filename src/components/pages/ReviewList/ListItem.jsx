import { StarIcon as HollowStarIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import tw from 'twin.macro'
import { BASE_URL } from '../../../hooks/api'
import { commaify } from '../../../hooks/util/commify'
import { ColumnContainer } from '../../common/Container'
import { Title } from '../../common/Typography'

const ListItemContainer = tw(Link)`
  bg-white relative
  flex flex-row items-center justify-between
  gap-4 md:gap-8 xl:gap-16
  cursor-pointer rounded-md 
  hover:(bg-neutral-50 shadow-lg)
  transition-all
  p-1 md:p-2 lg:p-4
  overflow-hidden
  border border-neutral-100 shadow-md
  dark:(
  bg-neutral-800 hover:bg-neutral-700
  border-neutral-800
  )
`

const CoverImage = tw.img`
  rounded-md h-16 md:h-32
`

const Info = tw.div`
  flex flex-col grow min-w-0 overflow-hidden
`

const AlbumTitle = tw(Title)`
  text-neutral-600 dark:text-neutral-200 h-fit uppercase text-ellipsis whitespace-nowrap overflow-hidden
`

const Artist = tw.div`
  text-neutral-500 dark:text-neutral-400 italic md:text-xl font-bold -mt-2 xl:-mt-3
`

const PeekAndRating = tw(ColumnContainer)`
  shrink-0 overflow-hidden gap-0 md:gap-1 hidden sm:flex pr-5
`

const Peek = tw(Title)`
  font-serif md:text-2xl xl:text-4xl italic text-neutral-400 dark:text-neutral-400 min-w-0 whitespace-nowrap overflow-hidden text-ellipsis
`

const Stars = tw.div`
 flex flex-row gap-1 h-3 md:h-5
`

const Star = tw(StarIcon)`
  fill-current text-rose-500 overflow-hidden h-3 lg:h-5
`

const HollowStar = tw(HollowStarIcon)`
  stroke-current text-rose-500 overflow-hidden h-3 lg:h-5
`

const ReleaseDate = tw.div`
text-neutral-400 italic md:text-lg -mt-1.5
`

export default function ListItem({ review }) {
  const album = review.attributes.album.data.attributes
  const coverUrl = new URL(album.cover.data.attributes.formats.thumbnail.url, BASE_URL)
  const rDate = new Date(album.releaseDate)

  return (
    <ListItemContainer to={`review/${review.id}`}>
      <CoverImage src={coverUrl} />
      <Info>
        <AlbumTitle>{album.title}</AlbumTitle>
        <Artist>{commaify(album.artists.data.map(artist => artist.attributes.name))}</Artist>
        <ReleaseDate>{rDate.toLocaleDateString()}</ReleaseDate>
      </Info>
      <PeekAndRating>
        <Peek>{review.attributes.title}</Peek>
        {/* <Stars>
          {
            Array.from({ length: review.attributes.rating }, (_, i) => {
              return <Star key={i} />
            })
          }
          {
            Array.from({ length: 10 - review.attributes.rating }, (_, i) => {
              return <HollowStar key={review.attributes.rating + i} />
            })
          }
        </Stars> */}
      </PeekAndRating>
    </ListItemContainer>
  )
}
