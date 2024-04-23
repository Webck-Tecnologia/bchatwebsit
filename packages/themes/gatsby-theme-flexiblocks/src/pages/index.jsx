// HomePage.js
import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import { Container } from 'theme-ui';
import Layout from '@solid-ui-layout/Layout';
import Seo from '@solid-ui-components/Seo';
import Divider from '@solid-ui-components/Divider';
import ModalWithTabs from '@solid-ui-blocks/Modal/Block01';
import ModalSimple from '@solid-ui-blocks/Modal/Block02';
import Header from '@solid-ui-blocks/Header/Block01';
import Hero from '@solid-ui-blocks/Hero/Block02';
import FeatureTabOne from '@solid-ui-blocks/FeaturesWithPhoto/Block05';
import FeatureTabTwo from '@solid-ui-blocks/FeaturesWithPhoto/Block06';
import FeatureTabThree from '@solid-ui-blocks/FeaturesWithPhoto/Block01';
import Testimonials from '@solid-ui-blocks/Testimonials/Block03';
import Companies from '@solid-ui-blocks/Companies/Block01';
import Footer from '@solid-ui-blocks/Footer/Block01';
import { normalizeBlockContentNodes } from '@blocks-helpers';
import theme from './_theme';
import styles from './_styles';
import Faq from '@solid-ui-blocks/Faq/Block01';
import './styles.css';
import foto from './imagemForm.png';
import FeaturedBlog from '../../../../../src/components/homePage/FeaturedBlog';

const HomePage = props => {
  const { allBlockContent } = props.data;
  const content = normalizeBlockContentNodes(allBlockContent?.nodes);

  // Estado para controlar se o painel está aberto ou fechado
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  // Função para abrir e fechar o painel
  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const toggleNotification = () => {
    setIsNotification(!isNotification);
  };

  useEffect(() => {
    let timeout;
    if (isNotification) {
      timeout = setTimeout(() => {
        setIsNotification(null);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [isNotification]);


  // Função para fechar o painel ao clicar fora dele
  const handleCloseOutside = e => {
    if (e.target.classList.contains('modal2')) {
      setIsPanelOpen(false);
    }
  };

  // Função para enviar a solicitação POST
  const enviarSolicitacao = async () => {
    try {
      // Dados do formulário
      const formData = {
        nome: document.querySelector('input[name="nome"]').value,
        contato: document.querySelector('input[name="contato"]').value,
        termos: document.querySelector('input[name="termos"]').checked
      };

      // Configuração da solicitação
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'bolt360key': 'hasbolt360api'
        },
        body: JSON.stringify(formData)
      };

      // Enviar solicitação
      const response = await fetch('https://prodn8n.bolt360.com.br/webhook/bchatia', requestOptions);
      const data = await response.json();

      // Verificar se a solicitação foi bem-sucedida
      if (response.ok) {
        console.log('Solicitação enviada com sucesso!', data);
        // Fechar o modal
        setIsPanelOpen(false);
        setIsNotification('success');
      } else {
        console.error('Erro ao enviar solicitação:', data);
        // Fechar o modal
        setIsPanelOpen(false);
        setIsNotification('error');
      }
    } catch (error) {
      console.error('Erro ao processar a solicitação:', error);
      setIsNotification('error');
    }
  };

  // Event listener para o envio do formulário
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário
    await enviarSolicitacao(); // Chama a função para enviar a solicitação
  };

  return (
    <Layout theme={theme} {...props}>
      <Seo title='Bchat' />
      {/* Modais */}
      <ModalWithTabs content={content['authentication']} reverse />
      <ModalWithTabs content={content['contact']} />
      <ModalSimple content={content['advertisement']} />
      {/* Blocos */}
      <Header content={content['header']} />
      <Divider space='5' />
      <Container variant='full' sx={styles.heroContainer}>
        <Hero content={content['hero']} togglePanel={togglePanel} />
      </Container>
      <Divider space='5' />
      <Container>
        <Companies content={content['companies']} />
      </Container>
      <Divider space='5' />
      <Divider space='5' />
      <Container id="solucoes" variant='wide' sx={styles.featuresContainer}>
        <FeatureTabOne content={content['feature-tab-one']} reverse />
        {/* Botão para abrir o painel */}
        <button onClick={togglePanel} className='button' style={{
          backgroundColor: '#088E60',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '5px',
          border: 'none',
          fontSize: '1.2rem',
          cursor: 'pointer',
          margin: '40px 10%' /* Centralizar horizontalmente */
        }}>
          Impulsione seu atendimento com IA
        </button>
        <Divider space='2' />
        <FeatureTabTwo content={content['feature-tab-two']} />
        <Divider space='5' />
        <Divider space='5' />
        <FeatureTabThree content={content['feature-tab-three']} reverse />
        <button onClick={togglePanel} className='button' style={{
          backgroundColor: '#26292B',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '5px',
          border: 'none',
          fontSize: '1.2rem',
          cursor: 'pointer',
          margin: '40px 7.5%' /* Centralizar horizontalmente */
        }}>
          Agendar uma avaliação gratuita
        </button>
      </Container>
      <Divider space='5' />
      <Divider space='5' />
      <Container id="testemonials">
        <Testimonials content={content['testimonials']} togglePanel={togglePanel} />
        <Divider space='5' />
      </Container >
      <Container variant='narrow'>
        <Faq id="faq" content={content['faq']} />
      </Container>
      <Divider space='5' />
      <div className='container'>
        <FeaturedBlog/>
      </div>
      <Divider space='5' />
      <Footer content={content['footer']} />

      {/* Painel centralizado */}
      {isPanelOpen && (
        <div className="modal2" onClick={handleCloseOutside}>
          <div className="modal2-content">
            <div className='left'>
              <h1>
                Agende uma conversa com nossos especialistas
              </h1>
              <div>
                <p>Junte-se à comunidade do futuro</p>
              </div>
              <h1 className='main'>BChat IA</h1>
              <div>
                <form onSubmit={handleFormSubmit}>
                  <div className='inputBox'>
                    <input type="text" name="nome" required="required" /> <span>Seu nome</span>
                  </div>
                  <div className='inputBox'>
                    <input type="text" name="contato" required="required" /> <span>Contato</span>
                  </div>
                  <Divider space='1' />
                  <div>
                    <input type="checkbox" id="termos" name="termos" required="required" />
                    <label htmlFor="termos">Eu li e aceito os <span className="termos"><a target='blank' href="https://bolt360.com.br/privacidade.html">termos de uso</a></span>.</label>
                    <div className="g-recaptcha" data-sitekey="6LezPpkpAAAAAJ85tXGqm0oNuWVJs1KU5u2556U_E"></div>
                  </div>
                  <button type='submit'>
                    Enviar
                  </button>
                </form>
              </div>
            </div>
            <div className='right'>
              <img className='imagem-right' src={foto} alt="Imagem Formulário" />
            </div>
          </div>
        </div>
      )}

    {isNotification && (
        <div className={`notification ${isNotification === 'success' ? 'success' : 'error'}`}>
          <h1>{isNotification === 'success' ? 'Parabéns, um de nossos especialistas vai entrar em contato em breve!' : 'Erro, tente novamente mais tarde!'}</h1>
        </div>
      )}
    </Layout>
  );
}

export const query = graphql`
  query homepageSaasBlockContent {
    allBlockContent(filter: { page: { in: ["homepage/saas", "shared"] } }) {
      nodes {
        ...BlockContent
      }
    }
  }
`

export default HomePage;
