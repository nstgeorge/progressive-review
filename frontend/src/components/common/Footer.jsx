import { Link } from 'react-router-dom'
import tw from 'twin.macro'
import { ReactComponent as Instagram } from './resources/instagram.svg'
import { ReactComponent as CircleLogo } from './resources/logo_circle.svg'

const FooterContainer = tw.div`
  translate-y-10 // Somewhere something is adding padding to the bottom, this hides it. sorry
  h-72 w-full py-8 z-20
  bg-gradient-to-tr from-blue-700 to-rose-600
  relative

  before:(
    content-[''] z-10
    absolute left-0 right-0 bottom-10 top-1
    bg-gradient-to-r from-purple-900 to-rose-500
    blur-xl saturate-200 opacity-80
  )

  after:(
    content-[''] z-10
    absolute left-0 right-0 bottom-0 top-0
    bg-gradient-to-tl from-purple-900 to-yellow-500
    blur-lg saturate-200 opacity-50
  )
`

const FooterContent = tw.div`
  z-20 h-full w-full relative
  flex flex-col md:flex-row items-center justify-center gap-8
`

const FooterChild = tw.div`
  md:flex-1 order-2 md:order-none flex text-white!
  first:(md:justify-end) last:(md:justify-start)
`

const FooterLink = tw(Link)`
  font-semibold uppercase cursor-pointer hover:opacity-70 transition-opacity text-white no-underline
  visited:text-white
`

const FilmGrain = tw.img`
  w-full h-full overflow-hidden absolute top-0 mix-blend-screen opacity-60 object-cover z-10 pointer-events-none
`

const StyledCircleLogo = tw(CircleLogo)`
  h-48 text-neutral-50 fill-current md:flex-1 order-1 md:order-none transform-gpu
`

const InstagramLogo = tw(Instagram)`
    fill-white w-7 h-7
`

export default function Footer(props) {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterChild>
          <FooterLink to={'/about'}>ABOUT</FooterLink>
        </FooterChild>

        <StyledCircleLogo />
        <FooterChild>
          <FooterLink as="a" href={'https://instagram.com/progressivereview'}><InstagramLogo /></FooterLink>
        </FooterChild>
      </FooterContent>

      <FilmGrain src={'/img/filmgrain.jpg'} />
    </FooterContainer>
  )
}
