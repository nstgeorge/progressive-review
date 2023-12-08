import { useEffect, useState } from 'react'

function getWindowDimensions () {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  }
}

export default function useWindowDimensions () {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}