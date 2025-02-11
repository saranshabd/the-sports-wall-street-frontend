/*!

=========================================================
* Vision UI Free Chakra - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-chakra
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-chakra/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// import
import Dashboard from "views/Dashboard/Dashboard.js";
import ExtraCash from "views/Dashboard/ExtraCash.js";
import Tables from "views/Dashboard/Tables.js";
import GlobalRankings from "views/Dashboard/GlobalRankings.js";
import Portfolio from "views/Dashboard/Portfolio.js";
import Settings from "views/Dashboard/Settings.js";
import SignIn from "views/Pages/SignIn.js";
import SignUp from "views/Pages/SignUp.js";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
  WalletIcon,
} from "components/Icons/Icons";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <HomeIcon color="inherit" />,
    component: Portfolio,
    layout: "/admin",
  },
  // {
  //   path: "/marketplace",
  //   name: "Marketplace",
  //   icon: <CreditIcon color="inherit" />,
  //   component: Tables,
  //   layout: "/admin",
  // },
  {
    path: "/global-rankings",
    name: "Global Rankings",
    icon: <StatsIcon color="inherit" />,
    component: GlobalRankings,
    layout: "/admin",
  },
  {
    path: "/extra-cash",
    name: "✨ Extra Cash ✨",
    icon: <WalletIcon color="inherit" />,
    component: ExtraCash,
    layout: "/admin",
  },
  {
    path: "/settings",
    name: "Settings",
    rtlName: "لوحة القيادة",
    icon: <SupportIcon color="inherit" />,
    component: Settings,
    layout: "/admin",
  },
  {
    path: "/signin",
    name: "Sign Out",
    icon: <DocumentIcon color="inherit" />,
    component: SignIn,
    layout: "/auth",
  },
  // {
  //   name: "ACCOUNT PAGES",
  //   category: "account",
  //   rtlName: "صفحات",
  //   state: "pageCollapse",
  //   views: [
  //     {
  //       path: "/profile",
  //       name: "Profile",
  //       rtlName: "لوحة القيادة",
  //       icon: <PersonIcon color='inherit' />,
  //       secondaryNavbar: true,
  //       component: Profile,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/signup",
  //       name: "Feedback",
  //       rtlName: "لوحة القيادة",
  //       icon: <RocketIcon color='inherit' />,
  //       secondaryNavbar: true,
  //       component: SignUp,
  //       layout: "/auth",
  //     },
  //     {
  //       path: "/signin",
  //       name: "Sign Out",
  //       rtlName: "لوحة القيادة",
  //       icon: <DocumentIcon color='inherit' />,
  //       component: SignIn,
  //       layout: "/auth",
  //     },
  //   ],
  // },
];
export default dashRoutes;
