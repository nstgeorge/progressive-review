import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { Blurhash } from 'react-blurhash'
import tw, { styled } from 'twin.macro'

const Container = tw.div`
  relative max-w-full max-h-full
`

const RealImage = styled(motion.img)(({ isLoaded }) => [
  tw`
    absolute top-0 left-0
    opacity-0 transition-opacity block
  `,
  isLoaded && tw`opacity-100`
])

const Blur = tw(motion.div)`
  [&>div]:(absolute top-0 left-0 overflow-hidden saturate-50 block!)
`

export default function Image({ src, hash, width, height, ...others} ) {
  const [isLoaded, setIsLoaded]  = useState(false)

  return (
    <Container {...others}>
      {
        hash 
        ?
        <Blur>
          <Blurhash hash={hash} width={width} height={height} punch={0} {...others} />
        </Blur>
        : <></>
      }
      <RealImage src={src} width={width} height={height} {...others} onLoad={() => setIsLoaded(true)} isLoaded={isLoaded} />
    </Container>
  )
}
