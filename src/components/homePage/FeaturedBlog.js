import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { FeaturedBlogsStyles } from '../../styles/homePage/FeaturedBlogsStyles';
import BlogGrid from '../blog/BlogGrid';
import ParagraphText from '../typography/ParagraphText';
import { SectionTitle } from '../typography/Title';
import GlobalStyles from '../../styles/GlobalStyles';
import TopCategories from './TopCategories';
import './featured.css';

function FeaturedBlogs() {
  const data = useStaticQuery(graphql`
    {
      allSanityFeatured(filter: {_id: {eq: "featuredItems"}}) {
        nodes {
          blogs {
            id
            title
            publishedAt
            categories {
              title
              slug {
                current
              }
            }
            coverImage {
              alt
              asset {
                gatsbyImageData
              }
            }
            slug {
              current
            }
            author {
              id
              name
              profileImage {
                alt
                asset {
                  gatsbyImageData
                }
              }
            }
            excerpt {
              children {
                text
              }
            }
          }
        }
      }
    }
  `);

  const featuredBlogs = data.allSanityFeatured.nodes[0].blogs;

  // Mapeia os dados da imagem para o formato esperado pelo BlogGrid
  const mappedBlogs = featuredBlogs.map(blog => ({
    id: blog.id,
    title: blog.title,
    publishedAt: blog.publishedAt,
    categories: blog.categories,
    coverImage: {
      src: {
        gatsbyImageData: blog.coverImage.asset.gatsbyImageData,
        alt: blog.coverImage.alt
      }
    },
    slug: blog.slug,
    authorImage: {
      src: {
        gatsbyImageData: blog.author.profileImage.asset.gatsbyImageData,
        alt: blog.author.profileImage.alt
      }
    },
    author: blog.author.name,
    excerpt: blog.excerpt
  }));

  return (
    <FeaturedBlogsStyles className='featuredText'>
      <div className='postagens'>
        <SectionTitle className="featuredBlogs__Title">Postagens Recentes</SectionTitle>
        <ParagraphText className="featuredBlogs__text">
          Saiba mais sobre IA nas nossas postagens!
        </ParagraphText>
        {/* Passa os dados mapeados para o BlogGrid */}
        <BlogGrid blogs={mappedBlogs} />
      </div>
    </FeaturedBlogsStyles>
  );
}

export default FeaturedBlogs;
