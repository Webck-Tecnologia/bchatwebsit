import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { format } from 'date-fns';
import imagemHeader from './assets/banner.png';
import './bootstrap.css'; // Importe os estilos necessários, se houver
import './style.css'; // Importe os estilos necessários, se houver
import userIcon from './icon/1.png';
import dateIcon from './icon/2.png';
import commenticon from './icon/3.png';
import { ptBR } from 'date-fns/locale';

export const combinedQuery = graphql`
  query CombinedBlogQueries($id: String!) {
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
    sanityBlog(id: { eq: $id }) {
      title
      publishedAt
      coverImage {
        alt
        asset {
          url
        }
      }
      body {
        children {
          text
        }
      }
      author {
        name
        profileImage {
          asset {
            url
          }
        }
      }
    }
  }
`;

const SingleBlog = ({ data }) => {
  const blog = data.sanityBlog;
  const recentPosts = data.allSanityBlog.edges;
  const categorias = data.allSanityBlog.edges.reduce((accumulator, current) => {
    // Verifica se há categorias na postagem atual
    if (current.node.categories) {
      // Itera sobre as categorias da postagem atual
      current.node.categories.forEach(category => {
        // Verifica se a categoria já está no acumulador
        const existingCategoryIndex = accumulator.findIndex(cat => cat.title === category.title);
        if (existingCategoryIndex === -1) {
          // Se a categoria não existe no acumulador, adiciona ela
          accumulator.push({
            title: category.title,
            slug: category.slug.current,
            count: 1 // Inicializa o contador como 1
          });
        } else {
          // Se a categoria já existe no acumulador, incrementa o contador
          accumulator[existingCategoryIndex].count++;
        }
      });
    }
    return accumulator;
  }, []);




  const handleSearchSubmit = event => {
    event.preventDefault(); // Impede o comportamento padrão do formulário
    // Aqui você pode implementar qualquer lógica adicional necessária ao enviar o formulário
  };



  // Função para formatar a data no formato desejadoimport { ptBR } from 'date-fns/locale';
  const formatDate = (date) => {
    return format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  const blogs = data.allSanityBlog.edges;
  const blogsWithExcerpt = blogs.filter(blog => blog.node.excerpt);
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

  return (
    <html lang="pt-br">
      <head>
        <title>{blog.title}</title>
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

        {/* Seção do blog */}
        <div className="blog-details padding-top padding-bottom section-bg-color">
          <div className="container">
            <div className="blog-details__wrapper">
              <div className="row g-5">
                <div className="col-lg-8">
                  <div className="blog-details__item">
                    <div className="blog-details__item-inner">
                      <div className="blog-details__thumb">
                        <div className="blog-details__thumb-inner" data-aos="fade-up" data-aos-duration="800">
                          <img src={blog.coverImage.asset.url} alt={blog.coverImage.alt} />
                        </div>
                      </div>
                      <div className="blog-details__content">
                        <h3>{blog.title}</h3>
                        <div className="blog-details__meta">
                          <ul>
                            <li><img src={userIcon} alt="user-icon"/>
                              {blog.author.name}</li>
                            <li><img src={dateIcon} alt="date-icon"/>
                              {formatDate(blog.publishedAt)}</li>
                          </ul>
                        </div>
                      </div>
                      <div className="blog-details__segment" data-aos="fade-up" data-aos-duration="1000">
                        <div className="blog-details__segment-inner">
                          <div className="blog-details__segment-item">
                            <div className="blog-details__body">
                              {/* Renderizar o conteúdo do blog */}
                              {blog.body &&
                                blog.body.map((paragraph, index) => {
                                  // Verifica se o texto do parágrafo não está vazio
                                  if (paragraph.children[0] && paragraph.children[0].text.trim() !== '') {
                                    return (
                                      <div key={index}>
                                        <p>{paragraph.children[0].text}</p>
                                      </div>
                                    );
                                  }
                                  return null; // Retorna null para parágrafos vazios
                                })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-8  col-12">
                  <div className="sidebar">
                    <div className="row g-4">
                      <div className="col-12">
                        <div className="sidebar__search" data-aos="fade-up" data-aos-duration="800">
                          <h6 className="mb-10">Pesquisar</h6>
                          <div className="sidebar__search-body">
                          <div className="search-bar2">
                            <input
                                    type="text"
                                    value={searchValue}
                                    onChange={handleSearchChange}
                                    placeholder="Buscar postagens..."
                                />
                                {/* Renderiza os resultados filtrados somente se houver texto na barra de busca */}
                                {searchValue && (
                                    <div className="search-results2">
                                        {filteredBlogs.map(({ node: blog }) => (
                                            <div key={blog.id} className="search-result2">
                                                <a href={`/blogs/${blog.slug.current}`}>{blog.title}</a>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="sidebar__categorie" data-aos="fade-up" data-aos-duration="900">
                          <div className="sidebar__head">
                            <h6>Categorias</h6>
                          </div>
                          <div className="sidebar__categorie-body">
                            <div className="sidebar__categorie-content">
                              <ul>
                                {categorias.map(categoria => (
                                  <li key={categoria.slug}>
                                    <a href="#">{categoria.title}</a>
                                    <span>{categoria.count}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="sidebar__recentpost" data-aos="fade-up" data-aos-duration="1000">
                          <div className="sidebar__head">
                            <h6>Posts Recentes</h6>
                          </div>
                          <div className="sidebar__recentpost-body">
                            <ul>
                              {recentPosts.map(post => (
                                <li key={post.node.id}>
                                  <div className="sidebar__recentpost-item">
                                    <div className="sidebar__recentpost-inner">
                                      <div className="sidebar__recentpost-thumb">
                                        <a href={`/blogs/${post.node.slug.current}`}>
                                          {/* Substitua a imagem do post pela imagem real do post */}
                                          <img src={post.node.coverImage.asset.url} alt={post.node.coverImage.alt} />
                                        </a>
                                      </div>
                                      <div className="sidebar__recentpost-content">
                                        <p><a href={`/blogs/${post.node.slug.current}`}>{post.node.title}</a></p>
                                        {/* Use a função 'formatDate' para formatar a data */}
                                        <span>{formatDate(post.node.publishedAt)}</span>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scripts e links adicionais, se necessário */}
      </body>
    </html>
  );
};

export default SingleBlog;
