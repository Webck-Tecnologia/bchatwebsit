import React from 'react'
// import SVG from 'react-inlinesvg'
import { Container, Flex, Box, css } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import ContentText from '@solid-ui-components/ContentText'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'
import bolt360 from './bolt360.png'
import pegado from './pegado.png'
import pensarClube from './pensarClube.png'
import alfa from './alfa.png'
import "./styles.css"

const styles = {
  logo: {
    width: [100, 150],
    height: [50, 75]
  },
}

const CompaniesBlock01 = ({ content }) => {
  const { text, collection, buttons } = content

  return (
    <Container sx={{ textAlign: `center`}}>
      <ContentText content={text} />
      {text && collection && <Divider />}
      <Flex sx={{ flexWrap: `wrap`, m: -3 }}>


      <Box sx={{ flexGrow: 1, p: [1, 3] }}>
        
             <div className='companiesimgs'>
              {<img src={alfa} css={css(styles.logo)} alt="Alfa" />}
              {<img src={pensarClube} css={css(styles.logo)} alt="Alfa" />}
              {<img src={pegado} css={css(styles.logo)} alt="Alfa" />}
              {<img src={bolt360} css={css(styles.logo)} alt="Alfa" />}
             </div>
          </Box>
      </Flex>
      {buttons && (
        <>
          <Divider space={3} />
          <ContentButtons content={buttons} />
        </>
      )}
    </Container>
  )
}

export default WithDefaultContent(CompaniesBlock01)


