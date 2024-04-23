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
        






  <div className="blog-details padding-top padding-bottom section-bg-color">
    <div className="container">
      <div className="blog-details__wrapper">
        <div className="row g-5">
          <div className="col-lg-8">
            <div className="blog-details__item">
              <div className="blog-details__item-inner">
                <div className="blog-details__thumb">
                  <div className="blog-details__thumb-inner" data-aos="fade-up" data-aos-duration="800">
                    <img src="assets/images/blog/details/1.png" alt="blog-image"/>
                  </div>
                </div>
                <div className="blog-details__content">
                  <h3> Advantages of day trading </h3>
                  <div className="blog-details__meta">
                    <ul>
                      <li><img src="assets/images/blog/icon/1.png" alt="user-icon"/>
                        Mobarok Hossain</li>
                      <li><img src="assets/images/blog/icon/2.png" alt="date-icon"/>
                        April 25, 2023</li>
                      <li>
                        <a href="#"><img src="assets/images/blog/icon/3.png" alt="comment-icon"/>
                          4 Comments</a>
                      </li>
                    </ul>
                  </div>
                  <p className="mb-0">Lorem ipsum dolor sit amet consectetur. At sed amet viverra etiam elit vivamus ultrices pharetra. Diam augue in dictumst nisl varius libero morbi dolor. Diam nibh lectus lectus volutpat praesent vulputate condimentum. Leo ipsum mi amet ut at vitae. Eu proin lacus maecenas nibh lectus lectus .</p>
                </div>
                <div className="blog-details__segment" data-aos="fade-up" data-aos-duration="1000">
                  <div className="blog-details__segment-inner">
                    <div className="blog-details__segment-item">
                      <div className="row gy-4">
                        <div className="col-xl-6">
                          <div className="blog-details__segment-thumb">
                            <img src="assets/images/blog/details/2.png" alt="blog-image"/>
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="blog-details__segment-content">
                            <h5>Short-term investment to
                              the marker</h5>
                            <p>Looking to make some quick cash in the market? Short-term investments might be just the
                              ticket. </p>
                            <p>
                              They can be risky, but with a little research and some luck, you could see some solid
                              returns
                              in no time the market!</p>
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="blog-details__segment-content">
                            <h5>long-term investment to
                              higher return</h5>
                            <p className="mb-0">If you're looking to make some serious cash, a long-term investment is
                              definitely the way
                              to go. Sure, it may take a little patience, but the returns will be worth it in the end!
                              Don't settle for mediocre gains when you could be making bank with a smart.</p>
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="blog-details__segment-thumb">
                            <img src="assets/images/blog/details/3.png" alt="blog-image"/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="blog-details__action" data-aos="fade-up" data-aos-duration="1000">
                  <div className="blog-details__action-inner">
                    <div className="blog-details__tag">
                      <div className="tags tags--style2">
                        <ul>
                          <li>
                            <h6 className="mb-0">Tags</h6>
                          </li>
                          <li><a href="#" className="active">trading</a></li>
                          <li><a href="#">investor</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className="blog-details__social">
                      <ul className="social">
                        <li className="social__item">
                            <h6 className="mb-0">Share</h6>
                          </li>
                        <li className="social__item">
                          <a href="#" className="social__link social__link--style2 active"><i className="fab fa-facebook-f"></i></a>
                        </li>
                        <li className="social__item">
                          <a href="#" className="social__link social__link--style2 "><i className="fab fa-instagram"></i></a>
                        </li>
                        <li className="social__item">
                          <a href="#" className="social__link social__link--style2 "><i
                              className="fa-brands fa-linkedin-in"></i></a>
                        </li>
                        <li className="social__item">
                          <a href="#" className="social__link social__link--style2"><i
                              className="fab fa-youtube"></i></a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="blog-details__comment" data-aos="fade-up" data-aos-duration="1000">
                  <div className="sidebar">
                    <div className="sidebar__comment">
                      <div className="sidebar__head">
                        <h3>Comment</h3>
                      </div>
                      <div className="sidebar__comment-body">
                        <ul>
                          <li className="sidebar__comment-item">
                            <div className="comment">
                              <div className="comment__inner">
                                <div className="comment__head">
                                  <div className="comment__author">
                                    <div className="comment__author-thumb">
                                      <img src="assets/images/blog/user/3.png" alt="comment-author"/>
                                    </div>
                                    <div className="comment__author-info">
                                      <h6 className="mb-0">Johanna Erika</h6>
                                      <span>26 Marrch 2023 , at 02:00 pm</span>
                                    </div>
                                  </div>
                                  <div className="comment__action">
                                    <a href="#post"> <img src="assets/images/blog/user/replay.svg" alt="reply-icon"/>
                                      reply</a>
                                  </div>
                                </div>
                                <div className="comment__body">
                                  <div className="comment__body-inner">
                                    <p className="mb-0">We invite you to explore our trading blog for the latest industry
                                      insights and expert analysis and make decisions.</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="sidebar__comment-item sidebar__comment-item--reply">
                            <div className="comment">
                              <div className="comment__inner">
                                <div className="comment__head">
                                  <div className="comment__author">
                                    <div className="comment__author-thumb">
                                      <img src="assets/images/blog/user/1.png" alt="comment-author"/>
                                    </div>
                                    <div className="comment__author-info">
                                      <h6 className="mb-0">Tommy Reed</h6>
                                      <span>20 Marrch 2023 , at 02:00 pm</span>
                                    </div>
                                  </div>
                                  <div className="comment__action">
                                    <a href="#post"> <img src="assets/images/blog/user/replay.svg" alt="reply-icon"/>
                                      reply</a>
                                  </div>
                                </div>
                                <div className="comment__body">
                                  <div className="comment__body-inner">
                                    <p className="mb-0">We invite you to explore our trading blog for the latest industry
                                      insights and expert analysis and make decisions.</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="sidebar__comment-item sidebar__comment-item--reply">
                            <div className="comment">
                              <div className="comment__inner">
                                <div className="comment__head">
                                  <div className="comment__author">
                                    <div className="comment__author-thumb">
                                      <img src="assets/images/blog/user/2.png" alt="comment-author"/>
                                    </div>
                                    <div className="comment__author-info">
                                      <h6 className="mb-0">Max Adams.</h6>
                                      <span>15 July 2023 , at 01:00 pm</span>
                                    </div>
                                  </div>
                                  <div className="comment__action">
                                    <a href="#post"> <img src="assets/images/blog/user/replay.svg" alt="reply-icon"/>
                                      reply</a>
                                  </div>
                                </div>
                                <div className="comment__body">
                                  <div className="comment__body-inner">
                                    <p className="mb-0">We invite you to explore our trading blog for the latest industry
                                      insights and expert analysis and make decisions.</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="sidebar__comment-item">
                            <div className="comment">
                              <div className="comment__inner">
                                <div className="comment__head">
                                  <div className="comment__author">
                                    <div className="comment__author-thumb">
                                      <img src="assets/images/blog/user/4.png" alt="comment-author"/>
                                    </div>
                                    <div className="comment__author-info">
                                      <h6 className="mb-0">Chris Scott</h6>
                                      <span>19 Dec 2023 , at 04:00 pm</span>
                                    </div>
                                  </div>
                                  <div className="comment__action">
                                    <a href="#post"> <img src="assets/images/blog/user/replay.svg" alt="reply-icon"/>
                                      reply</a>
                                  </div>
                                </div>
                                <div className="comment__body">
                                  <div className="comment__body-inner">
                                    <p className="mb-0">We invite you to explore our trading blog for the latest industry
                                      insights and expert analysis and make decisions.</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="blog-details__commentform " data-aos="fade-up" data-aos-duration="1000">
                  <div className="sidebar">
                    <div className="sidebar__commentform" id="post">
                      <div className="sidebar__head">
                        <h3>Leave A Comment</h3>
                      </div>
                      <div className="sidebar__commentform-body pt-25">
                        <form action="https://thetork.com/">
                          <div className="row g-4">
                            <div className="col-md-6">
                              <div>
                                <label for="name" className="form-label">Name</label>
                                <input className="form-control" type="text" id="name" placeholder="Full Name"/>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div>
                                <label for="email" className="form-label">Email</label>
                                <input className="form-control" type="email" id="email" placeholder="Email here"/>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div>
                                <label for="textarea" className="form-label">Message</label>
                                <textarea cols="30" rows="5" className="form-control" id="textarea"
                                  placeholder="Enter Your Message"></textarea>
                              </div>
                            </div>
                          </div>
                          <button type="submit" className="trk-btn trk-btn--border trk-btn--primary mt-4">Send
                            message</button>
                        </form>
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
                    <h6 className="mb-10">Search Here</h6>
                    <div className="sidebar__search-body">
                      <form className="" action="#">
                        <div className="input">
                          <input type="text" className="form-control" placeholder="Search articles"/>
                          <button type="submit" className="search-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="sidebar__categorie" data-aos="fade-up" data-aos-duration="900">
                    <div className="sidebar__head">
                      <h6>Categories</h6>
                    </div>
                    <div className="sidebar__categorie-body">
                      <div className="sidebar__categorie-content">
                        <ul>
                          <li >
                            <a href="#">
                              Large-cap stocks.</a>
                            <span>2</span>
                          </li>
                          <li className="active">
                            <a href="#">
                              Value stocks</a>
                            <span>4</span>
                          </li>
                          <li>
                            <a href="#">
                              IPO stocks</a>
                            <span>3</span>
                          </li>
                          <li>
                            <a href="#">
                              Dividend stocks</a>
                            <span>5</span>
                          </li>
                          <li>
                            <a href="#">
                              Non-dividend stocks</a>
                            <span>1</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="sidebar__recentpost" data-aos="fade-up" data-aos-duration="1000">
                    <div className="sidebar__head">
                      <h6>Recent Post</h6>
                    </div>
                    <div className="sidebar__recentpost-body">
                      <ul>
                        <li>
                          <div className="sidebar__recentpost-item">
                            <div className="sidebar__recentpost-inner">
                              <div className="sidebar__recentpost-thumb">
                                <a href="blog-details.html"><img src="assets/images/blog/recent/1.png"
                                    alt="recentpost-image"/></a>
                              </div>
                              <div className="sidebar__recentpost-content">
                                <p><a href="blog-details.html">Real Estate Investing</a></p>
                                <span>Dec 22, 2023</span>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="sidebar__recentpost-item">
                            <div className="sidebar__recentpost-inner">
                              <div className="sidebar__recentpost-thumb">
                                <a href="blog-details.html"><img src="assets/images/blog/recent/2.png"
                                    alt="recentpost-image"/></a>
                              </div>
                              <div className="sidebar__recentpost-content">
                                <p><a href="blog-details.html">Technical analysis </a></p>
                                <span>July 28, 2023</span>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="sidebar__recentpost-item">
                            <div className="sidebar__recentpost-inner">
                              <div className="sidebar__recentpost-thumb">
                                <a href="blog-details.html"><img src="assets/images/blog/recent/3.png"
                                    alt="recentpost-image"/></a>
                              </div>
                              <div className="sidebar__recentpost-content">
                                <p><a href="blog-details.html">Trading risk tolerance</a></p>
                                <span>May 18, 2023</span>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="sidebar__recentpost-item">
                            <div className="sidebar__recentpost-inner">
                              <div className="sidebar__recentpost-thumb">
                                <a href="blog-details.html"><img src="assets/images/blog/recent/4.png"
                                    alt="recentpost-image"/></a>
                              </div>
                              <div className="sidebar__recentpost-content">
                                <p><a href="blog-details.html">Harmonic price pattern</a></p>
                                <span>Feb 16, 2023</span>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="sidebar__tags" data-aos="fade-up" data-aos-duration="1100">
                    <div className="sidebar__head">
                      <h6>Popular Tag</h6>
                    </div>
                    <div className="sidebar__tags-body">
                      <div className="tags tags--style2">
                        <ul>
                          <li><a href="#" className="active">Analysis</a></li>
                          <li><a href="#">Research</a></li>
                          <li><a href="#">Mentoring</a></li>
                          <li><a href="#">Strategy</a></li>
                          <li><a href="#">Planning</a></li>
                          <li><a href="#">Business</a></li>
                          <li><a href="#">Leadership</a></li>
                          <li><a href="#">Management</a></li>
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
  </div>














        {/* Scripts e links adicionais, se necessário */}        
      </body>
    </html>
  );
}

export default IndexPage;
