const sanityConfig = require('./sanity-config');

require('dotenv').config('./.env');

module.exports = {
  plugins: [
    {
      resolve: '@elegantstack/gatsby-theme-flexiblocks',
      options: {
        createDemoPages: true,
        colorMode: true
      }
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        ...sanityConfig
      }
    }
  ],
  // Customize your site metadata
  siteMetadata: {
    title: 'IA',
    name: 'Bchat IA',
    description: 'Desbloqueie o potencial total da sua comunicação com o cliente com o bchat IA, a solução definitiva para gerenciamento de canais omnichannel. Agregando todas as suas caixas de entrada em um único sistema intuitivo, o bchat IA simplifica e aprimora sua interação com os clientes. Com a poderosa inteligência artificial integrada, o bchat IA vai além da simples organização de mensagens, oferecendo insights valiosos e recomendações inteligentes para otimizar cada interação. Desde o primeiro contato até a resolução de problemas complexos, nossa IA está ao seu lado, ajudando a fornecer um serviço excepcional em todos os canais.'
  },
  developMiddleware: app => {
    // Defina o host de escuta como '0.0.0.0'
    app.set("host", "0.0.0.0");
  }
};
