import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import './bootstrap.css';
import './style.css';
import './swiper-bundle.min.css';
import imagemHeader from './assets/banner.png';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Header from '../../components/Header';

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    {
      allSanityBlog {
        edges {
          node {
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
                url
              }
            }
            slug {
              current
            }
            author {
              name
              profileImage {
                asset {
                  url
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

  const blogs = data.allSanityBlog.edges;
  const blogsWithExcerpt = blogs.filter(blog => blog.node.excerpt);

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const [searchValue, setSearchValue] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState(blogsWithExcerpt);
  const handleSearchChange = event => {
    const { value } = event.target;
    setSearchValue(value);
    const filtered = blogsWithExcerpt.filter(blog =>
      blog.node.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredBlogs(filtered);
  };

  const totalPages = Math.ceil(blogsWithExcerpt.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBlogs = blogsWithExcerpt.slice(startIndex, endIndex);

  const handlePageChange = page => {
    setCurrentPage(page);
  };



  return (
    <html lang="pt-br">
      <head>
        <title>Blog | Bchat IA</title>
      </head>
      <body>
        {/* Conteúdo da página */}
        <section className="page-header bg--cover" style={{backgroundImage: `url(${imagemHeader})`}}>
          <div className="container">
            <div className="page-header__content" data-aos="fade-right" data-aos-duration="1000">
              <h2 className='blog-Title'>Blog - Grid</h2>
              <nav style={{'--bs-breadcrumb-divider': '/'}} aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item"><a href="/" className='title-link'>Home</a></li>
                  <li className="breadcrumb-item active blog-Title" aria-current="page">Blog - Postagens</li>
                </ol>
              </nav>
            </div>
          </div>
        </section>


     {/* Barra de busca */}
<div className="search-bar">
    <input
        type="text"
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="Buscar postagens..."
    />
    {/* Renderiza os resultados filtrados somente se houver texto na barra de busca */}
    {searchValue && (
        <div className="search-results">
            {filteredBlogs.map(({ node: blog }) => (
                <div key={blog.id} className="search-result">
                    <a href={`/blogs/${blog.slug.current}`}>{blog.title}</a>
                </div>
            ))}
        </div>
    )}
</div>

        {/* Seu conteúdo HTML dentro do body vai aqui */}
        <div className="blog padding-top padding-bottom section-bg-color">
          <div className="container">
            <div className="blog__wrapper">
              <div className='row g-4'>
                {/* Mapeie os dados do blog e renderize cada item */}
                {currentBlogs.map(({ node: blog }) => (
                  <div className="col-sm-6 col-lg-4" key={blog.id}>
                    <div className="blog__item" data-aos="fade-up" data-aos-duration="1200">
                      <div className="blog__item-inner blog__item-inner--style2">
                        <div className="blog__thumb">
                          <img src={blog.coverImage.asset.url} alt={blog.coverImage.alt} className='imageCard' />
                        </div>
                        <div className="blog__content">
                          <div className="blog__meta">
                            {/* Renderize as categorias */}
                            {blog.categories.map(category => (
                              <span key={category.slug.current} className="blog__meta-tag blog__meta-tag--style2 tagComunication">
                                {category.title}
                              </span>
                            ))}
                          </div>
                          <h5 className="10 style2"><a href={`/blogs/${blog.slug.current}`}>{blog.title}</a></h5>
                          {/* Verifica se blog.publishedAt existe antes de formatar */}
                          {blog.publishedAt && (
                            <p className="mb-15">{format(new Date(blog.publishedAt), "MMM dd',' yyyy", { locale: ptBR })}</p>
                          )}
                          <div className="blog__writer">
                            <div className="blog__writer-thumb">
                              <img className='profilePhoto' src={blog.author.profileImage.asset.url} alt="writer" />
                            </div>
                            <div className="blog__writer-designation">
                              <p>{blog.author.name}</p>
                              {/* Renderiza a data com o novo formato */}
                              {blog.publishedAt && (
                                <span>{format(new Date(blog.publishedAt), "MMM dd',' yyyy", { locale: ptBR })}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="paginations" data-aos="fade-up" data-aos-duration="1200">
              <ul className="lab-ul d-flex flex-wrap justify-content-center mb-1">
              <li>
                {/* Verifica se a página atual é maior que 1 */}
                {currentPage > 1 && (
                  <a href="#" onClick={() => handlePageChange(currentPage - 1)}>
                    <i className="fa-solid fa-angle-left me-2"></i> Anterior
                  </a>
                )}
              </li>
              {/* Mapeia as páginas disponíveis e cria os links */}
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                return (
                  <li key={pageNumber} className={pageNumber === currentPage ? 'itemativo' : ''}>
                    <a
                      href="#"
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </a>
                  </li>
                );
              })}
              <li>
                {/* Verifica se a página atual é menor que o total de páginas */}
                {currentPage < totalPages && (
                  <a href="#" onClick={() => handlePageChange(currentPage + 1)}>
                    Próximo <i className="fa-solid fa-angle-right ms-2"></i>
                  </a>
                )}
              </li>
            </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Scripts e links adicionais, se necessário */}        
      </body>
    </html>
  );
}

export default IndexPage;
