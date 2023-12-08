import { CogIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { Blurhash } from 'react-blurhash'
import { css } from 'styled-components'
import tw, { styled } from 'twin.macro'

const Container = tw.div`
  relative max-w-full max-h-full
`

const RealImage = styled(motion.img)(({ isLoaded }) => [
  tw`
    absolute top-0 left-0
    opacity-0 transition-opacity duration-500 block
  `,
  isLoaded && tw`opacity-100`
])

const Blur = styled(motion.div)(({ width, height }) => [
  tw`
    flex items-center justify-center
    [&>div]:(absolute top-0 left-0 overflow-hidden saturate-50 block!)
  `,
  css`
    width: ${width};
    height: ${height};
  `
])

const Hash = styled(Blurhash)(({ show }) => [
  tw`
    w-full h-full opacity-0 transition-opacity duration-500
  `,
  show && tw`opacity-100`
])

const Spinner = styled(CogIcon)(({ show }) => [
  tw`
    animate-spin-slow stroke-white w-2/5 absolute opacity-0 duration-1000 delay-1000
  `,
  show && tw`opacity-100`
])

export default function Image({ src, hash, width, height, hideSpinner, ...others} ) {
  const [isLoaded, setIsLoaded]  = useState(false)
  const [takingTooLong, setTakingTooLong] = useState(false)

  useEffect(() => {
    setTimeout(() =>
      setTakingTooLong(true),
    1000)
  }, [])

  return (
    <Container {...others}>
      {
        hash
        ?
        <Blur {...others}>
          <Hash show={takingTooLong ? 'true' : undefined} hash={hash} width={width} height={height} punch={0} {...others} />
          {
            !hideSpinner &&
            <Spinner show={takingTooLong ? 'true' : undefined} />
          }
        </Blur>
        : <></>
      }
      <RealImage src={src} width={width} height={height} {...others} onLoad={() => setIsLoaded(true)} isLoaded={isLoaded} />
    </Container>
  )
}
