import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { format, differenceInDays } from 'date-fns';
import React from 'react';
import { BlogItemStyles } from '../../styles/blog/BlogItemStyles';
import ParagraphText from '../typography/ParagraphText';
import { Title } from '../typography/Title';
import { ptBR } from 'date-fns/locale';
import { BsClock } from 'react-icons/bs';
import './blogItem.css'

function BlogItem({ path, title, image, categories, publishedAt, excerpt, author, authorImage, createdAt }) {
  // Formata a data de criação
  const formattedDate = format(new Date(createdAt), "d 'de' MMMM 'de' yyyy", { locale: ptBR });

  // Calcula a quantidade de dias desde a criação do post
  const daysSinceCreation = differenceInDays(new Date(), new Date(createdAt));

  return (
    <div className='containerBlog'>
      <div  className="imgBlog">
        <Link to={`/blogs/${path}`}>
          <GatsbyImage
            image={image.imageData}
            alt={image.altText}
            class='imgBlogs'
          />
        </Link>
      </div>
      <div className='blog-text-content'>
        <h1 className="categoriaBlog">
          {categories.map((item, index) => (
            <span key={item.slug.current}>
              <Link to={`/categories/${item.slug.current}`}>{item.title}</Link>
              {index < categories.length - 1 ? ', ' : ''}
            </span>
          ))}
        </h1>
        <Link to={`/blogs/${path}`}>
          <Title className="title">{title}</Title>
        </Link>
        <h1 className="excerpt">{excerpt}</h1>
        <div className='autorContainer'>
          <GatsbyImage
            image={authorImage.imageData}
            alt={authorImage.altText}
            className="img"
          />
          <div className='autorText'>
            <h1>{author}</h1>
            <h1>{formattedDate}</h1>
              <BsClock/>
            <h1>{daysSinceCreation} Dia(s)</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogItem;
