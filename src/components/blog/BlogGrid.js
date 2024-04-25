import React from 'react';
import { Container, Flex, Box, Badge } from 'theme-ui';
import ContentContainer from '@solid-ui-components/ContentContainer';
import Reveal from '@solid-ui-components/Reveal';
import Divider from '@solid-ui-components/Divider';
import ContentText from '@solid-ui-components/ContentText';
import ContentImages from '@solid-ui-components/ContentImages';
import ContentButtons from '@solid-ui-components/ContentButtons';
import { FaRegClock } from 'react-icons/fa';
import './grid.css';
import { GatsbyImage } from 'gatsby-plugin-image';
import renderImage from './renderImage'
import { Link } from 'gatsby';

const styles = {
  wrapper: {
    flex: [`100%`, null, null, 1],
    minWidth: 300,
    maxWidth: [`none`, null, null, 500],
    cursor: `pointer`,
    p: 3,
  },
  card: {
    overflow: `hidden`,
    height: `full`,
  },
  content: {
    alignItems: `stretch`,
    flexDirection: [`row`, null, null, `column`],
    height: `full`, // Definindo a altura do card
  },
  body: {
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `center`,
    flex: 1,
    p: 4,
  },
  footerWrapper: {
    alignItems: `center`,
  },
  postInfo: {
    flex: 1,
    flexWrap: `wrap`,
    justifyContent: `space-between`,
    color: `omega`,
    ml: 3,
  },
  imageWrapper: {
    textAlign: `center`,
    position: `relative`,
    display: `block`,
    height: `full`,
    minHeight: `15rem`,
  maxHeight: `15rem`, // Definindo uma altura máxima fixa
  },
  imageBlog: {
    display: `block`,
    height: `full`,
    borderRadius: `default`,
    minHeight: `15rem`,
    div: {
      p: `0 !important`,
    },
  },
  avatar: {
    size: 42,
    borderRadius: `full`,
    borderWidth: `md`,
    borderColor: `omegaLighter`,
    boxSizing: `content-box`,
    img: {
      objectPosition: 'top center !important',
    },
  },
};

function formatPublishDate(publishedAt) {
  const publishDate = new Date(publishedAt);
  const today = new Date();
  const differenceInTime = today.getTime() - publishDate.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

  if (differenceInDays === 0) {
    return "Hoje";
  } else if (differenceInDays === 1) {
    return "1 Dia";
  } else {
    return `${differenceInDays} Dias`;
  }
}

function formatPublishDate2(publishedAt) {
  const publishDate = new Date(publishedAt);

  // Array com os nomes dos meses em português
  const monthNames = [
    "Janeiro", "Fevereiro", "Março",
    "Abril", "Maio", "Junho", "Julho",
    "Agosto", "Setembro", "Outubro",
    "Novembro", "Dezembro"
  ];

  // Extrai o dia, mês e ano da data de publicação
  const day = publishDate.getDate();
  const monthIndex = publishDate.getMonth();
  const year = publishDate.getFullYear();

  // Calcula a diferença entre a data de publicação e a data atual em dias
  const today = new Date();
  const differenceInTime = today.getTime() - publishDate.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

  // Formata a data de publicação como "Dia, Mês (por extenso em pt/BR) e a diferença em dias"
  const formattedDate = `${day} de ${monthNames[monthIndex]}`;

  return formattedDate;
}

function BlogGrid({ blogs }) {
  return (
    <Container>
      <Divider />
      {blogs && (
        <Reveal effect='fadeIn'>
          <Flex sx={{ flexWrap: `wrap`, justifyContent: `center`, m: -3 }}>
            {blogs.map((item, index) => (
              console.log(item, "Seu item aqui"),
              <Box key={`item-${index}`} sx={styles.wrapper}>
                <Link to={`/blogs/${item.slug.current}`}>
                  <ContentContainer
                    content={item.container}
                    variant='cards.interactive'
                    sx={styles.card}
                  >
                    <Flex as='article' sx={styles.content}>
                      {/* Image */}
                      <Box sx={{ flex: [0, 1], m: 2, mb: [null, null, null, 0] }}>
                      <Link to={`/blogs/${item.slug.current}`}>
                        <Box sx={styles.imageWrapper}>
                          {renderImage(item.coverImage, { alt: item.coverImage.alt }, styles.imageBlog)}
                        </Box>
                      </Link>
                      </Box>
                      <Box sx={styles.body}>
                        {/* Category */}
                        {item.categories?.map(category => (
                          <Box key={category.title} sx={{ display: `inline-block` }}>
                            <Box mb='3'>
                              <Badge
                                variant='tag'
                                sx={{ bg: `alphaLighter` }}
                                color='secondary'
                              >
                                {category.title}
                              </Badge>
                            </Box>
                          </Box>
                        ))}
                        {/* Title */}
                        <ContentText
                          content={{ text: item.title }}
                          sx={{ flex: [0, 0, `auto`] }}
                          className='titleBlog'
                        />
                        {/* Excerpt */}
                        <ContentText
                            content={{ text: item.excerpt && item.excerpt[0]?.children && item.excerpt[0].children[0]?.text }}
                            variant='small'
                            sx={{ flex: `auto`, mb: 3 }}
                          />
                        {/* Footer */}
                        <Box sx={{ variant: `text.small` }}>
                          <Flex sx={styles.footerWrapper}>
                            {/* Renderiza a imagem do autor */}
                            {item.authorImage && renderImage(item.authorImage, { alt: item.authorImage.alt }, styles.avatar)}
                            <Flex sx={styles.postInfo}>
                              {/* Author */}
                            
                              {/* Info */}
                              <Flex sx={{ alignItems: `flex-start` }} className='autorEditt'>
                              <ContentText
                                content={{ text: item.author }}
                                sx={{
                                  display: `inline-block`,
                                  flexBasis: `full`,
                                }}
                              >
                                <Link>
                                  <strong className="titleBlog2">{item.author}</strong>
                                </Link>
                              </ContentText>
                            <div className='autorEdit'>
                            <ContentText //AQUI DEVE SSER A DATA DE PUBLICAÇÃO NO FORMATO DD/ MÊS (EM PT BR) / ANO
                                  content={{ text: [formatPublishDate2(item.publishedAt)] }}
                                  sx={{ display: `inline-block` }}
                                  mr='2'
                                />
                                <FaRegClock />
                                <h1>&nbsp;</h1>
                                <ContentText //AQUI ESTÁ CORRETO
                                  content={{ text: [formatPublishDate(item.publishedAt)] }}
                                  sx={{ display: `inline-block` }}
                                  mr='2'
                                />
                            </div>
                              </Flex>
                            </Flex>
                          </Flex>
                        </Box>
                      </Box>
                    </Flex>
                  </ContentContainer>
                </Link>
              </Box>
            ))}
          </Flex>
        </Reveal>
      )}
    </Container>
  );
}

export default BlogGrid;