import { Transition } from '@headlessui/react'
import { ChatBubbleLeftIcon, MusicalNoteIcon } from '@heroicons/react/20/solid'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { Apple, Bandcamp, Spotify } from '@icons-pack/react-simple-icons'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import RadarChart from 'react-svg-radar-chart'
import { Tooltip } from 'react-tooltip'
import { siApplemusic, siBandcamp, siSpotify } from 'simple-icons'
import styled, { css } from 'styled-components'
import tw from 'twin.macro'
import { BASE_URL } from '../../../hooks/api'
import { reviewQuery } from '../../../hooks/loaders/reviewLoader'
import { commaify } from '../../../hooks/util/commify'
import { ColumnContainer, PageContainer } from '../../common/Container'
import Markdown from '../../common/Markdown'
import { Title } from '../../common/Typography'

const Shade = styled.div(({ show }) => [
  tw`
    fixed top-0 left-0 w-screen h-screen z-50
    flex justify-center items-center
    opacity-0 transition-all duration-500 ease-in-out
    pointer-events-none cursor-pointer
    bg-black/80 backdrop-blur-none
  `,
  show && tw`opacity-100 pointer-events-auto backdrop-blur-lg backdrop-saturate-0`
])

const CoverContainer = tw(ColumnContainer)`
  p-10 lg:p-20 items-stretch h-screen w-fit
`

const Cover = tw.img`
  object-scale-down overflow-hidden cursor-default w-[min(80vw, 80vh)] h-[min(80vw, 80vh)] lg:(w-[min(50vw, 80vh)] h-[min(50vw, 80vh)]) mb-1
`

const BigText = styled.div(({ length }) => [
  tw`
    uppercase text-5xl text-white font-extralight font-serif text-justify tracking-wider
    mb-1 lg:mb-0 
    // [font-size:min(7vw, 7vh)] [line-height:min(7vw, 7vh)] [min-height:min(7vw, 7vh)]
    // md:([font-size:min(5vw, 5vh)] [line-height:min(5vw, 5vh)] [min-height:min(5vw, 5vh)])
    // 2xl:([font-size:min(5vw, 7vh)] [line-height:min(5vw, 7vh)] [min-height:min(5vw, 7vh)])
    select-none drop-shadow-xl
  `,
  css`
    @media(min-width: 512px) {
      font-size: calc(min(10vw, 10vh) - ${length}px);
      min-height: calc(min(10vw, 10vh) - ${length}px);
    };
    @media(min-width: 768px) {
      font-size: calc(min(8vw, 8vh) - ${length}px);
      min-height: calc(min(8vw, 8vh) - ${length}px);
    };
    font-size: calc(min(16vw, 16vh) - ${length}px);
    min-height: calc(min(16vw, 16vh) - ${length}px);
  `
])

const CoverTextContainer = tw.div`
  flex flex-col justify-center z-10 relative w-fit
  h-48 sm:h-56 md:h-72 lg:h-96 2xl:h-[28rem]
  first-line:(text-sm)
`

const LargeHr = tw.div`
  block mb-2 lg:mb-4 border-b border-white
`

const CoverText = tw.div`
  flex flex-row flex-wrap justify-between items-baseline lg:text-lg text-neutral-300 font-bold drop-shadow-xl h-7
  text-sm md:text-base
  [&>a]:(text-neutral-500 font-normal text-xs lg:text-base)
`

const BigCoverContainer = tw.div`
  absolute left-0 w-screen cursor-pointer
  h-48 sm:h-56 md:h-72 lg:h-96 2xl:h-[28rem]
  overflow-hidden flex justify-center items-center
`

const BigCover = styled.img(({ scrollOffset }) => [
  tw`w-full blur-xl absolute brightness-50 duration-300 transform-gpu ease-in-out
    group-hover:(brightness-75 blur-md)`,
  css`
    transform: scale(1.3) translateY(${-(scrollOffset / 4.5)}px);
    transition-property: filter;
    will-change: transform;
  `
])

const FilmGrain = tw.img`
  w-full absolute mix-blend-screen opacity-20 group-hover:blur-sm transition-all
`

const ContentContainer = tw.div`
  pt-48 sm:pt-56 md:pt-72 lg:pt-96 2xl:pt-[28rem]
`

const Content = tw.div`
  text-xl my-8 flex flex-col items-start
  // max-w-prose mx-auto
`

const NotableLyric = tw.div`
  flex flex-col z-10
  mx-auto text-center mt-8 relative
  text-xl md:text-2xl text-neutral-600 dark:text-neutral-400
  italic font-serif
  [&>p]:(
    my-0 lg:my-1 last-of-type:(text-3xl md:text-5xl! text-neutral-800 dark:text-neutral-200!)
  )
  before:(content-['“'] absolute left-0 -ml-8 md:-ml-24 text-6xl md:text-9xl text-neutral-100 dark:text-neutral-700 top-6 z-0)
  after:(content-['”'] absolute right-0 -mr-8 md:-mr-24 text-6xl md:text-9xl text-neutral-100 dark:text-neutral-700 top-6 z-0)
`

const LyricAttribution = tw.span`
  text-base md:text-xl text-neutral-500 mt-1 uppercase self-end
`

const Links = tw.div`
  flex flex-row flex-wrap gap-1 justify-around md:px-20 lg:justify-center w-full mb-4 h-9
`

const LinkBadge = styled.a(({ color }) => [
  tw`
    text-xs font-semibold md:mr-1 px-2 py-1 flex flex-row rounded-full gap-1 border opacity-70 dark:opacity-90 items-center justify-center
    leading-[1em]
    hover:opacity-40 transition-opacity
  `,
  css`
    color: #${color};
    border-color: #${color};
    > span {
      margin-top: 3px;
    }
  `
])

const LinkIcon = tw.div`
  h-4 w-4 md:h-6 md:w-6 p-0.5
`

const PublishDates = tw.div`
  text-neutral-500 text-base mt-2 xl:-mt-12
`

const Tags = tw.div`
  flex mt-1
`

const TagBadge = tw.div`
  text-xs font-semibold md:mr-1 px-2 py-1 flex flex-row gap-1.5 text-neutral-400 dark:text-neutral-500 fill-current uppercase items-center cursor-default
`

const TagIcon = tw(ChatBubbleLeftIcon)`
  h-5 w-5 fill-current mb-1
`

const CharacteristicsContainer = tw.div`
  relative
  scale-90 md:scale-100
  flex flex-col px-2 lg:px-10
  bg-neutral-50 dark:bg-neutral-800 rounded-lg shadow-xl pb-10 pt-8 lg:pt-5 mt-10 mx-auto
`


const CharacteristicsContent = tw.div`
  flex flex-col text-2xl lg:text-xl lg:flex-row gap-1 items-center
  px-3 md:px-10
`

const CharacteristicsTitle = tw(Title)`
  text-4xl mb-5 lg:mb-10 text-neutral-600 dark:text-neutral-300 text-center lg:text-left
`

const RadarChartContainer = tw.div`
  lg:scale-125 mx-auto w-fit
`

const Characteristics = tw.div`
  flex flex-col gap-1 justify-center items-end grow mt-5 lg:(ml-20 mt-0)
`

const Characteristic = tw.div`
  italic text-neutral-600 dark:text-neutral-300
`

const CharacteristicHelpIcon = tw(Link)`
  absolute bottom-0 right-0 m-4 cursor-pointer text-neutral-600 dark:text-neutral-400 hover:opacity-60 transition-opacity h-8 w-8
`

const SERVICE_COLOR_MAP = {
  'Apple Music': siApplemusic,
  Spotify: siSpotify,
  Bandcamp: siBandcamp
}

const SERVICE_ICON_MAP = {
  'Apple Music': Apple,
  Spotify: Spotify,
  Bandcamp: Bandcamp
}

export default function Review(props) {
  const { reviewId } = useParams()
  const { data: review } = useQuery(reviewQuery(reviewId))
  const [scrollY, setScrollY] = useState(0)
  const [showAlbumArt, setShowAlbumArt] = useState(false)

  const handleScroll = () => {
    setScrollY(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const album = review.data.attributes.album.data.attributes
  const coverUrl = new URL(album.cover.data.attributes.url.slice(1), BASE_URL)
  const rDate = new Date(album.releaseDate)
  const reviewPublishDate = new Date(review.data.attributes.publishedAt)
  const reviewUpdateDate = new Date(review.data.attributes.updatedAt)
  const characteristics = Object.entries(album.characteristics).filter(([key]) => key !== 'id').sort((a, b) => a[0] - b[0])

  const radarData = [
    {
      data: Object.fromEntries(characteristics.map(([key, c]) => [key, c / 10]))
    }
  ]

  const radarCaptions = Object.fromEntries(characteristics.map(([c, _]) => [c, `${c.charAt(0).toUpperCase()}${c.slice(1)}`]))

  const REVIEW_UPDATE_WINDOW = 1000 * 60 * 60 * 24 // Don't display review update date if it's less than 24 hours after initial publish

  return (
    <PageContainer>
      <Helmet>
        <title>{album.title} - The Progressive Review</title>
      </Helmet>
      <BigCoverContainer className="group" onClick={() => setShowAlbumArt(true)}>
        <BigCover src={coverUrl} scrollOffset={scrollY} />
        <FilmGrain src={'/img/filmgrain.jpg'} />
        <CoverTextContainer>
          <Transition show={true} appear={true}
            enter='transition-all ease-out duration-1000 delay-1000'
            enterFrom='opacity-0'
            enterTo='opacity-100'
          >
            <BigText length={album.title.length}>{album.title}</BigText>
          </Transition>
          <Transition show={true} appear={true}
            enter='transition-all ease-out duration-[2000ms] relative delay-500 transform-gpu will-change-[width,left]'
            enterFrom='left-1/2 w-0 opacity-30'
            enterTo='left-0 w-full opacity-100'
          >
            <LargeHr />
          </Transition>
          <Transition show={true} appear={true}
            enter='transition-all ease-out duration-1000 delay-[2000ms]'
            enterFrom='opacity-0'
            enterTo='opacity-100'
          >
            <CoverText>
              <span className="mr-2">{album.artists.data[0].attributes.name}</span>
              <span tw='font-extralight md:font-normal'>{rDate.toLocaleDateString()}</span>
            </CoverText>
          </Transition>
        </CoverTextContainer>
      </BigCoverContainer>
      <ContentContainer>
        <Content>
          <Links>
            {album.albumLinks.map((albumLink) => (
              <LinkBadge target='_blank' href={albumLink.link} color={SERVICE_COLOR_MAP[albumLink.name].hex} key={albumLink.link}>
                <LinkIcon as={SERVICE_ICON_MAP[albumLink.name]} />
                <span>{albumLink.name}</span>
              </LinkBadge>
            ))}
          </Links>
          <PublishDates>
            Review published {reviewPublishDate.toLocaleDateString()}
            {
              reviewUpdateDate - reviewPublishDate > REVIEW_UPDATE_WINDOW &&
              <span>, updated {reviewUpdateDate.toLocaleDateString()}</span>
            }
          </PublishDates>
          <Tags>
            <TagBadge id='vocal-style'><TagIcon /> {album.vocals}</TagBadge>
            <TagBadge id='genre'><TagIcon as={MusicalNoteIcon} /> {album.genre}</TagBadge>
            <Tooltip anchorId='vocal-style' content='Vocal Style' />
            <Tooltip anchorId='genre' content='Genre' />
          </Tags>
          <Markdown markdown={review.data.attributes.content} />
          {
            album.notableLyric && (
              <NotableLyric>
                <Markdown markdown={album.notableLyric} />
                <LyricAttribution>—{album.notableLyricTrack}</LyricAttribution>
              </NotableLyric>
            )
          }
          <CharacteristicsContainer>
            <CharacteristicsTitle>Characteristics</CharacteristicsTitle>
            <CharacteristicsContent>
              <RadarChartContainer>
                <RadarChart captions={radarCaptions} data={radarData} size={300} options={{
                  captionMargin: 15
                }} />
              </RadarChartContainer>
              <Characteristics>
                {
                  characteristics.map(([key, value]) => (
                    <Characteristic key={key}>{radarCaptions[key]}: <strong>{value}</strong></Characteristic>
                  ))
                }
              </Characteristics>
              <CharacteristicHelpIcon id='about-char' to={'/about/about-characteristic'}><InformationCircleIcon /></CharacteristicHelpIcon>
              <Tooltip anchorId='about-char' content='What does this mean?' style={{ fontSize: '12px' }} />
            </CharacteristicsContent>
          </CharacteristicsContainer>
        </Content>
      </ContentContainer>
      <Shade show={showAlbumArt} onClick={() => setShowAlbumArt(false)}>
        <Transition show={showAlbumArt}
          enter='transition-all ease-out duration-750'
          enterFrom='-translate-y-12 opacity-0 blur-xl scale-90'
          enterTo='translate-y-0 opacity-100 blur-none scale-100'
          leave='transition-all ease-in duration-750'
          leaveFrom='translate-y-0 opacity-100 blur-none scale-100'
          leaveTo='-translate-y-12 opacity-0 blur-xl scale-90'
        >
          <CoverContainer>
            <Cover src={coverUrl} />
            <CoverText>
              <span>{album.title}</span>
              <span>{commaify(album.artists.data.map(artist => artist.attributes.name))}</span>
            </CoverText>
          </CoverContainer>
        </Transition>
      </Shade>
    </PageContainer >
  )

}