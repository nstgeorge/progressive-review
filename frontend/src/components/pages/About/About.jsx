import { Tab } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import tw from 'twin.macro'
import { aboutQuery } from '../../../hooks/loaders/aboutLoader'
import useTabs from '../../../hooks/useTabs'
import Markdown from '../../common/Markdown'

const AboutContainer = tw.div`
  max-w-prose mx-auto px-5 text-xl
`

const TabList = tw(Tab.List)`
  flex flex-col md:flex-row gap-2 md:justify-around mt-5
`

const StyledTab = tw(Tab)`
  px-3 pt-2 pb-1 md:rounded-md ui-selected:(text-transparent bg-clip-text bg-gradient-to-tr from-purple-600 to-rose-400) transition-colors font-semibold uppercase hover:(bg-neutral-200 dark:bg-neutral-700) 
`

const BASE_URL = '/about'
const TABS = ['about', 'about-characteristic']

export default function About(props) {
  const [activeTab, setActiveTab] = useTabs(BASE_URL, 'aboutId', TABS)
  const { data } = useQuery(aboutQuery(TABS[activeTab]))

  return (
    <AboutContainer>
      <Tab.Group selectedIndex={activeTab} onChange={(i) => setActiveTab(TABS[i])}>
        <TabList>
          <StyledTab>About TPR</StyledTab>
          <StyledTab>About Characteristics</StyledTab>
        </TabList>
        <Tab.Panels>
          <Tab.Panel>
            <Markdown markdown={data?.data?.attributes.content} />
          </Tab.Panel>
          <Tab.Panel>
            <Markdown markdown={data?.data?.attributes.content} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </AboutContainer>
  )
}
