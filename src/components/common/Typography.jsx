import tw from 'twin.macro'

export const Title = tw.h1`
  text-2xl md:text-4xl xl:text-6xl font-semibold font-serif dark:text-neutral-200
`

export const TitleContainer = tw.div`
  flex flex-col items-start justify-start gap-1
`

export const TextWithIconContainer = tw(TitleContainer)`
  flex flex-row items-center
`

export const Subtitle = tw.h2`
  text-sm text-neutral-400 font-medium uppercase dark:text-neutral-200
`

export const SmallTitle = tw.h3`
  text-lg font-semibold
`

export const SmallerTitle = tw.h4`
  font-semibold text-sm text-neutral-600 dark:text-neutral-400
`

export const MutedText = tw.div`
  text-neutral-500
`

export const SmallMutedText = tw(MutedText)`
  text-sm
`

export const Header1 = tw.h1`
  text-4xl md:text-6xl
  mt-6 md:mt-8
  font-serif font-semibold text-neutral-600 dark:text-neutral-300
`

export const Header2 = tw.h2`
  text-3xl md:text-4xl
  mt-4 md:mt-6
  font-serif font-light text-neutral-600 dark:text-neutral-300
`

export const Header3 = tw.h3`
  text-xl md:text-2xl
  mt-4 md:mt-6
  font-semibold text-neutral-400 
`

export const Paragraph = tw.p`
mt-4
`