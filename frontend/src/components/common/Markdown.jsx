import { Remark } from 'react-remark'
import tw from 'twin.macro'
import { Header1, Header2, Header3, Link, Paragraph } from './Typography'

const MdHeader1 = tw(Header1)`
  mb-2 md:mb-4
`

const HeaderContainer = tw.div`
  mb-3
`

const StyledHr = tw.hr`
  dark:border-neutral-600
`

export default function Markdown({ markdown }) {
  return (
    <Remark
      rehypeReactOptions={{
        components: {
          h1: ({ node, ...props }) => (
            <HeaderContainer>
              <MdHeader1 {...props} />
              <StyledHr />
            </HeaderContainer>
          ),
          h2: ({ node, ...props }) => <Header2 {...props} />,
          h3: ({ node, ...props }) => <Header3 {...props} />,
          p: ({ node, ...props }) => <Paragraph {...props} />,
          a: ({ node, ...props }) => <Link {...props} />
        }
      }}
    >
      {markdown}
    </Remark>
  )
}
