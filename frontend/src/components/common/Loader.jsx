import { Transition } from '@headlessui/react'
import { useEffect, useState } from 'react'
import tw from 'twin.macro'
import { ReactComponent as CircleLogo } from './resources/logo_circle.svg'

const Container = tw.div`
  h-full w-full flex items-center justify-center
`

const LoaderContainer = tw.span`
  relative flex h-24 w-24 m-12
`

const StyledCircleLogo = tw(CircleLogo)`
  absolute h-full w-full bg-gradient-to-tr from-purple-900 to-rose-500 rounded-full p-1.5 text-white fill-current
`

const Ping = tw.span`
bg-gradient-to-tr from-purple-900 to-rose-500 rounded-full animate-ping h-full w-full inline-flex relative opacity-50
`

export default function Loader({ loading, loader, children }) {
  const [isEntering, setIsEntering] = useState(loading)
  const [isAnimating, setIsAnimating] = useState(loading)

  useEffect(() => {
    if (loading) {
      setIsAnimating(true)
    }
    if (!loading && isAnimating) {
      const endAnimating = setTimeout(() => setIsAnimating(false), 200)
      return () => clearTimeout(endAnimating)
    }
  }, [loading])

  useEffect(() => {
    const endEntering = setTimeout(() => setIsEntering(false), 1500)
    return () => clearTimeout(endEntering)
  }, [])

  if (loading || isAnimating) {
    return (
      <Container>
        <Transition show={loading} appear={true}
          enter='transition-all ease-in-out duration-500 delay-1000'
          enterFrom='opacity-0 blur-sm scale-90'
          enterTo='opacity-100 blur-none scale-100'
          leave='transition-all ease-in-out duration-200'
          leaveFrom='opacity-100 blur-none scale-100'
          leaveTo='opacity-0 blur-sm scale-90'
        >
          <LoaderContainer>
            {
              loader
                ? { loader }
                : <>
                  <Ping />
                  <StyledCircleLogo />
                </>
            }
          </LoaderContainer>
        </Transition>
      </Container>
    )
  } else {
    return (
      <Transition appear={true} show={!loading}
        enter='transition-all ease-in-out duration-200'
        enterFrom='opacity-0 blur-sm scale-90'
        enterTo='opacity-100 blur-none scale-100'
        leave='transition-all ease-in-out duration-200'
        leaveFrom='opacity-100 blur-none scale-100'
        leaveTo='opacity-0 blur-sm scale-90'
      >
        {children}
      </Transition>
    )
  }

}
