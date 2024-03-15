import React from 'react'
import { Container, Box } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import ContentImages from '@solid-ui-components/ContentImages'
import ContentButtons from '@solid-ui-components/ContentButtons'
import QuickSignupForm from '@solid-ui-components/QuickSignupForm'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'
import "./styles.css"


const HeroBlock02 = ({ content: { buttons, form, images }, togglePanel }) => (
  <Container sx={{ textAlign: `center` }}>
    <Reveal effect='fadeInDown'>
      <h3 style={{ fontSize: '1.5rem', color: '#060D09', margin: '40px auto', lineHeight: '1.2' }}>Experimente a IA na sua empresa</h3>
      <h1 style={{ fontSize:'3.2rem', fontWeight: 'bold', color: '#060D09', margin: '20px auto', maxWidth: '80vw', minWidth: '280px', lineHeight: '1.3', '@media screen and (max-width: 500px)': { fontSize: '2.3rem' } }}>Solução completa de <span style={{ color: '#088E60' }}>atendimento com IA:</span> do marketing ao pós-venda</h1>
      <h2 style={{ fontSize: '1.25rem', color: '#4C5155', margin: '40px auto', lineHeight: '1.2' }}>Centralize o atendimento, otimize a comunicação e personalize seu fluxo.</h2>
    </Reveal>
    {buttons && (
      <>
        <Divider space={3} />
        <Reveal effect='fadeInUp' duration={0.7}>
          <button onClick={togglePanel} className='button' style={{ backgroundColor: '#088E60', color: '#fff', padding: '10px 20px', borderRadius: '5px', border: 'none', fontSize: '1.2rem', cursor: 'pointer', margin: '20px 0' }}>Obtenha um diagnóstico grátis da sua operação</button>
        </Reveal>
      </>
    )}
    {form && (
      <>
        <Divider space={4} />
        <Reveal effect='fadeInRight' delay={0.7}>
          <QuickSignupForm {...form} space={3} />
        </Reveal>
      </>
    )}
    {images && (
      <>
        <Divider space={4} />
        <Box sx={{ position: `relative` }}>
          <ContentImages
            content={{ images }}
            loading='eager'
            imagePosition='center'
            imageEffect='fadeInUp'
          />
        </Box>
      </>
    )}
  </Container>
)

export default WithDefaultContent(HeroBlock02)
