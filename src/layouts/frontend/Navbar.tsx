import axios from "axios";
import swal from "sweetalert";
import {Link, Link as RouterLink} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../../assests/frontend/css/style.css'

import logo from '../../../public/h.jpg';
import {useEffect, useState} from "react";

function Navbar() {
  const [collection, setCollection] = useState([]);
  const history = useNavigate();
  const logoutSubmit = (e) => {
    e.preventDefault();
    axios.post(`api/logout`).then(res => {
      if (res.data.status === 200) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name');
        swal('Success', res.data.message, 'success');
        history('/');
      }
      else {
        swal('Error', res.data.message, 'error');
      }
    });
  }
  useEffect(() => {
    axios.get('api/getCollection').then(res => {
      if (res.data.status === 200) {
        setCollection(res.data.collection);
      }
    });
  }, []);
  var AuthButtons = '';
  if (!localStorage.getItem('auth_token')) {
    AuthButtons = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <RouterLink className="nav-link" to="/login" >
            Login
          </RouterLink>
        </li>
        <li className="nav-item">
          <RouterLink className="nav-link" to="/register">
            Register
          </RouterLink>
        </li>
      </ul>
    )
  } else {
    AuthButtons = (
      <li className="nav-item">
        <button type="button" className="nav-link btn btn-danger btn-sm text-white" onClick={logoutSubmit}>Logout</button>
      </li>
    )
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-primary shadow stick-top navbar-dark">
        <div className="container">
          <RouterLink className="navbar-brand" to="">
            Navbar
          </RouterLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <RouterLink className="nav-link active" aria-current="page" to="/">
                  Home
                </RouterLink>
              </li>
              <li className="nav-item">
                <RouterLink className="nav-link active" aria-current="page" to="/about">
                  About
                </RouterLink>
              </li>
              <li className="nav-item">
                <RouterLink className="nav-link active" aria-current="page" to="/contact">
                  Contact
                </RouterLink>
              </li>
              <li className="nav-item">
                <RouterLink className="nav-link" to="#">
                  Collection
                </RouterLink>
              </li>
              {AuthButtons}

            </ul>
          </div>
        </div>
      </nav>

      <div id="pageWrapper">
        <header className="version_1">
          <div className="layer"></div>

          <div className="main_header">
            <div className="container">
              <div className="row small-gutters">
                <div className="col-xl-3 col-lg-3 d-lg-flex align-items-center">
                  <div id="logo">
                    <a href="index.html"><img src="h.jpg" alt="" width="100" height="35"/></a>
                  </div>
                </div>
                <nav className="col-xl-6 col-lg-7">
                  <a className="open_close" href="javascript:void(0);">
                    <div className="hamburger hamburger--spin">
                      <div className="hamburger-box">
                        <div className="hamburger-inner"></div>
                      </div>
                    </div>
                  </a>

                  <div className="main-menu">
                    <div id="header_menu">
                      <a href="index.html"><img src="img/logo_black.svg" alt="" width="100" height="35"/></a>
                      <a href="#" className="open_close" id="close_in"><i className="ti-close"></i></a>
                    </div>
                    <ul>
                      <li className="submenu">
                        <a href="javascript:void(0);" className="show-submenu">Collections</a>
                        <ul>
                          {collection.map((item)=>{
                            return (
                              <li><Link to={`/collections/${item.id}`}>{item.name}</Link></li>
                            )
                          })
                          }
                        </ul>
                      </li>
                      <li className="megamenu submenu">
                        <a href="javascript:void(0);" className="show-submenu-mega">Pages</a>
                        <div className="menu-wrapper">
                          <div className="row small-gutters">
                            <div className="col-lg-3">
                              <h3>Listing grid</h3>
                              <ul>
                                <li><a href="listing-grid-1-full.html">Grid Full Width</a></li>
                                <li><a href="listing-grid-2-full.html">Grid Full Width 2</a></li>
                                <li><a href="listing-grid-3.html">Grid Boxed</a></li>
                                <li><a href="listing-grid-4-sidebar-left.html">Grid Sidebar Left</a></li>
                                <li><a href="listing-grid-5-sidebar-right.html">Grid Sidebar Right</a></li>
                                <li><a href="listing-grid-6-sidebar-left.html">Grid Sidebar Left 2</a></li>
                                <li><a href="listing-grid-7-sidebar-right.html">Grid Sidebar Right 2</a></li>
                              </ul>
                            </div>
                            <div className="col-lg-3">
                              <h3>Listing row &amp; Product</h3>
                              <ul>
                                <li><a href="listing-row-1-sidebar-left.html">Row Sidebar Left</a></li>
                                <li><a href="listing-row-2-sidebar-right.html">Row Sidebar Right</a></li>
                                <li><a href="listing-row-3-sidebar-left.html">Row Sidebar Left 2</a></li>
                                <li><a href="listing-row-4-sidebar-extended.html">Row Sidebar Extended</a></li>
                                <li><a href="product-detail-1.html">Product Large Image</a></li>
                                <li><a href="product-detail-2.html">Product Carousel</a></li>
                                <li><a href="product-detail-3.html">Product Sticky Info</a></li>
                              </ul>
                            </div>
                            <div className="col-lg-3">
                              <h3>Other pages</h3>
                              <ul>
                                <li><a href="cart.html">Cart Page</a></li>
                                <li><a href="checkout.html">Check Out Page</a></li>
                                <li><a href="confirm.html">Confirm Purchase Page</a></li>
                                <li><a href="account.html">Create Account Page</a></li>
                                <li><a href="track-order.html">Track Order</a></li>
                                <li><a href="help.html">Help Page</a></li>
                                <li><a href="help-2.html">Help Page 2</a></li>
                                <li><a href="leave-review.html">Leave a Review</a></li>
                              </ul>
                            </div>
                            <div className="col-lg-3 d-xl-block d-lg-block d-md-none d-sm-none d-none">
                              <div className="banner_menu">
                                <a href="#0">
                                  <img
                                    src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                                    data-src="img/banner_menu.jpg" width="400" height="550" alt=""
                                    className="img-fluid lazy"/>
                                </a>
                              </div>
                            </div>
                          </div>

                        </div>

                      </li>
                      <li className="submenu">
                        <a href="javascript:void(0);" className="show-submenu">Extra Pages</a>
                        <ul>
                          <li><a href="header-2.html">Header Style 2</a></li>
                          <li><a href="header-3.html">Header Style 3</a></li>
                          <li><a href="header-4.html">Header Style 4</a></li>
                          <li><a href="header-5.html">Header Style 5</a></li>
                          <li><a href="404.html">404 Page</a></li>
                          <li><a href="sign-in-modal.html">Sign In Modal</a></li>
                          <li><a href="contacts.html">Contact Us</a></li>
                          <li><a href="about.html">About 1</a></li>
                          <li><a href="about-2.html">About 2</a></li>
                          <li><a href="modal-advertise.html">Modal Advertise</a></li>
                          <li><a href="modal-newsletter.html">Modal Newsletter</a></li>
                        </ul>
                      </li>
                      <li>
                        <a href="blog.html">Blog</a>
                      </li>
                      <li>
                        <a href="#0">Buy Template</a>
                      </li>
                    </ul>
                  </div>

                </nav>
                <div className="col-xl-3 col-lg-2 d-lg-flex align-items-center justify-content-end text-end">
                  <a className="phone_top" href="tel://0949985409"><strong><span>Need Help?</span>+84
                    949-985-409</strong></a>
                </div>
              </div>
            </div>
          </div>


          <div className="main_nav Sticky">
            <div className="container">
              <div className="row small-gutters">
                <div className="col-xl-3 col-lg-3 col-md-3">
                  <nav className="categories">
                    <ul className="clearfix">
                      <li><span>
										<a href="#">
											<span className="hamburger hamburger--spin">
												<span className="hamburger-box">
													<span className="hamburger-inner"></span>
												</span>
											</span>
											Categories
										</a>
									</span>
                        <div id="menu">
                          <ul>
                            <li><span><a href="#0" >Collections</a></span>
                              <ul>
                                <li><a href="listing-grid-1-full.html">Trending</a></li>
                                <li><a href="listing-grid-2-full.html">Life style</a></li>
                                <li><a href="listing-grid-3.html">Running</a></li>
                                <li><a href="listing-grid-4-sidebar-left.html">Training</a></li>
                                <li><a href="listing-grid-5-sidebar-right.html">View all Collections</a></li>
                              </ul>
                            </li>
                            <li><span><a href="#">Men</a></span>
                              <ul>
                                <li><a href="listing-grid-6-sidebar-left.html">Offers</a></li>
                                <li><a href="listing-grid-7-sidebar-right.html">Shoes</a></li>
                                <li><a href="listing-row-1-sidebar-left.html">Clothing</a></li>
                                <li><a href="listing-row-3-sidebar-left.html">Accessories</a></li>
                                <li><a href="listing-row-4-sidebar-extended.html">Equipment</a></li>
                              </ul>
                            </li>
                            <li><span><a href="#">Women</a></span>
                              <ul>
                                <li><a href="listing-grid-1-full.html">Best Sellers</a></li>
                                <li><a href="listing-grid-2-full.html">Clothing</a></li>
                                <li><a href="listing-grid-3.html">Accessories</a></li>
                                <li><a href="listing-grid-4-sidebar-left.html">Shoes</a></li>
                              </ul>
                            </li>
                            <li><span><a href="#">Boys</a></span>
                              <ul>
                                <li><a href="listing-grid-6-sidebar-left.html">Easy On Shoes</a></li>
                                <li><a href="listing-grid-7-sidebar-right.html">Clothing</a></li>
                                <li><a href="listing-row-3-sidebar-left.html">Must Have</a></li>
                                <li><a href="listing-row-4-sidebar-extended.html">All Boys</a></li>
                              </ul>
                            </li>
                            <li><span><a href="#">Girls</a></span>
                              <ul>
                                <li><a href="listing-grid-1-full.html">New Releases</a></li>
                                <li><a href="listing-grid-2-full.html">Clothing</a></li>
                                <li><a href="listing-grid-3.html">Sale</a></li>
                                <li><a href="listing-grid-4-sidebar-left.html">Best Sellers</a></li>
                              </ul>
                            </li>
                            <li><span><a href="#">Customize</a></span>
                              <ul>
                                <li><a href="listing-row-1-sidebar-left.html">For Men</a></li>
                                <li><a href="listing-row-2-sidebar-right.html">For Women</a></li>
                                <li><a href="listing-row-4-sidebar-extended.html">For Boys</a></li>
                                <li><a href="listing-grid-1-full.html">For Girls</a></li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="col-xl-6 col-lg-7 col-md-6 d-none d-md-block">
                  <div className="custom-search-input">
                    <input type="text" placeholder="Search over 10.000 products"/>
                    <button type="submit"><i className="header-icon_search_custom"></i></button>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-2 col-md-3">

                  <ul className="top_tools">

                    <li>
                      <div className="dropdown dropdown-cart">
                        <Link to="/cart" className="cart_bt submenu"><strong>2</strong></Link>
                        <div className="dropdown-menu show-submenu">
                          <ul>
                            <li>
                              <a href="product-detail-1.html">
                                <figure><img src="img/products/product_placeholder_square_small.jpg"
                                             data-src="img/products/shoes/thumb/1.jpg" alt="" width="50" height="50"
                                             className="lazy"/></figure>
                                <strong><span>1x Armor Air x Fear</span>$90.00</strong>
                              </a>
                              <a href="#0" className="action"><i className="ti-trash"></i></a>
                            </li>
                            <li>
                              <a href="product-detail-1.html">
                                <figure><img src="img/products/product_placeholder_square_small.jpg"
                                             data-src="img/products/shoes/thumb/2.jpg" alt="" width="50" height="50"
                                             className="lazy"/></figure>
                                <strong><span>1x Armor Okwahn II</span>$110.00</strong>
                              </a>
                              <a href="0" className="action"><i className="ti-trash"></i></a>
                            </li>
                          </ul>
                          <div className="total_drop">
                            <div className="clearfix"><strong>Total</strong><span>$200.00</span></div>
                            <a href="cart.html" className="btn_1 outline">View Cart</a><a href="checkout.html"
                                                                                          className="btn_1">Checkout</a>
                          </div>
                        </div>
                      </div>

                    </li>
                    <li>
                      <a href="#0" className="wishlist"><span>Wishlist</span></a>
                    </li>
                    <li>
                      <div className="dropdown dropdown-access">
                        <a href="account.html" className="access_link"><span>Account</span></a>
                        <div className="dropdown-menu">
                          <Link to="/login" className="btn_1">Sign In or Sign Up</Link>
                          <ul>
                            <li>
                              <a href="track-order.html"><i className="ti-truck"></i>Track your Order</a>
                            </li>
                            <li>
                              <a href="account.html"><i className="ti-package"></i>My Orders</a>
                            </li>
                            <li>
                              <a href="account.html"><i className="ti-user"></i>My Profile</a>
                            </li>
                            <li>
                              <a href="help.html"><i className="ti-help-alt"></i>Help and Faq</a>
                            </li>
                          </ul>
                        </div>
                      </div>

                    </li>
                    <li>
                      <a href="javascript:void(0);" className="btn_search_mob"><span>Search</span></a>
                    </li>
                    <li>
                      <a href="#menu" className="btn_cat_mob">
                        <div className="hamburger hamburger--spin" id="hamburger">
                          <div className="hamburger-box">
                            <div className="hamburger-inner"></div>
                          </div>
                        </div>
                        Categories
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
            <div className="search_mob_wp">
              <input type="text" className="form-control" placeholder="Search over 10.000 products"/>
              <input type="submit" className="btn_1 full-width" value="Search"/>
            </div>

          </div>

        </header>
      </div>


    </>
  );
}

export default Navbar;
