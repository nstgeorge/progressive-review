import { motion, useScroll } from 'framer-motion';
import { Link, Outlet, ScrollRestoration, useNavigation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import Footer from './components/common/Footer';

const AppContainer = tw.div`
  flex flex-col min-h-[calc(100vh - 40px)] dark:(bg-neutral-900 text-white)
`

const TopBar = styled.div(({ dark }) => [
  tw`bg-white text-neutral-800! flex flex-col items-center justify-between py-3 md:py-4 h-12 md:h-16 sticky top-0 w-full z-40 transition-colors dark:(bg-neutral-900 text-white)`,
  dark && tw`bg-neutral-900 shadow-xl text-white!`
])

const Strikethrough = styled(Link)(({ dark }) => [
  tw`
    [max-width:600px] md:[height:15px] md:border-b border-neutral-800 text-center md:px-12 transition-all
    dark:(bg-neutral-900 border-white)
  `,
  dark && tw`border-white!`
])

const SiteName = styled.span(({ dark }) => [
  tw`
    font-serif text-xl md:text-3xl font-semibold bg-white px-3 transition-all md:group-hover:px-5 group-hover:cursor-pointer
    dark:(bg-neutral-900 text-white)
  `,
  dark && tw`bg-neutral-900`
])

const PageContent = styled.div(({ loading }) => [
  tw`transition-opacity duration-500 opacity-100 flex-grow`,
  loading && tw`opacity-50`
])

const ProgressBar = styled(motion.div)(({ isVisible }) => [
  tw`
    absolute bottom-0 left-0 right-0
    h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-red-500 bg-fixed
    origin-left opacity-0 transition-opacity
  `,
  isVisible && tw`opacity-100`
])

function App() {
  const navigation = useNavigation()
  const params = useParams()
  const { scrollYProgress } = useScroll()

  return (
    <AppContainer>
      <TopBar dark={params.reviewId ? 'true' : undefined}>
        <Strikethrough dark={params.reviewId ? 'true' : undefined} className="group" to={"/"}>
          <SiteName dark={params.reviewId ? 'true' : undefined}>THE PROGRESSIVE REVIEW</SiteName>
        </Strikethrough>
        <ProgressBar style={{ scaleX: scrollYProgress }} isVisible={params.reviewId ? 'true' : undefined} />
      </TopBar>
      <PageContent loading={navigation.state === 'loading' ? 'true' : undefined}>
        <Outlet />
      </PageContent>
      <Footer />
      <ScrollRestoration />
    </AppContainer>
  );
}

export default App;
