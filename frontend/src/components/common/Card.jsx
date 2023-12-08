import tw from "twin.macro";
import { Title } from "./Typography";

export const Card = tw.div`
  relative
  max-w-3xl
  flex flex-col 
  px-8 lg:px-12
  bg-gradient-to-tl
  from-neutral-100 to-neutral-50 dark:(from-neutral-900 to-neutral-800) rounded-lg shadow-xl pb-10 pt-8 lg:pt-5 mt-10 mx-auto
`

export const CardTitle = tw(Title)`
  text-4xl mb-5 lg:mb-10 text-neutral-600 dark:text-neutral-300 text-center lg:text-left
`