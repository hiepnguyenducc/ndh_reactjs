import Home from "../components/frontend/Home";
import About from "../components/frontend/About";
import Contact from "../components/frontend/Contact";
import Page404 from "../components/errors/Page404";
import {FC} from "react";
import Details from "../components/frontend/Details.tsx";
import Cart from "../components/frontend/Cart.tsx";

import ViewCollection from "../components/frontend/collections/ViewCollection.tsx";
import ViewCategory from "../components/frontend/ViewCategory.tsx";
import Review from "../components/frontend/Review.tsx";
import WishList from "../components/frontend/WishList.tsx";
import Compare from "../components/frontend/Compare.tsx";
import Checkout from "../components/frontend/Checkout.tsx";
import Blog from "../components/frontend/Blog.tsx";
import BlogDetail from "../components/frontend/BlogDetail.tsx";

interface RouteConfig {
  path: string;
  exact: boolean;
  name: string;
  component: FC;
}

const publicrouteslist: RouteConfig[] = [
  { path: '*', exact:true, name: '404', component: Page404},
  { path: '/', exact:true, name: 'Home', component: Home },
  { path: '/about', exact:true, name: 'About', component: About },
  { path: '/contact', exact:true, name: 'Contact', component: Contact },
  {path:'/cart', exact:true, name:'Cart', component:Cart},
  {path:'/collections/:id',exact:true,name:'Collections',component:ViewCollection},
  {path:'/:slug',exact:true,name:'Details',component:Details},
  {path:'/category/:slug',exact:true,name:'Category',component:ViewCategory},
  {path:'/category/:slug/:slug',exact:true, name:'Details',component:Details},
  {path:'/:slug/review',exact:true,name:'Review',component:Review},
  {path:'/wishlist',exact:true,name:'WishList',component:WishList},
  {path:'/compare',exact:true,name:'Compare',component:Compare},
  {path:'/checkout',exact:true,name:'Checkout',component:Checkout},
  {path:'/blog',exact:true,name:'Blog',component:Blog},
  {path:'/blog/:slug',exact:true,name:'BlogDetail',component:BlogDetail},
];

export default publicrouteslist;
