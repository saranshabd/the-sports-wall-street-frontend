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
import Tables from "views/Dashboard/Tables.js";
import Billing from "views/Dashboard/Billing.js";
import Profile from "views/Dashboard/Profile.js";
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
} from "components/Icons/Icons";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color='inherit' />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "League Table",
    rtlName: "لوحة القيادة",
    icon: <StatsIcon color='inherit' />,
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/billing",
    name: "Portfolio",
    rtlName: "لوحة القيادة",
    icon: <CreditIcon color='inherit' />,
    component: Billing,
    layout: "/admin",
  },
  {
    name: "ACCOUNT PAGES",
    category: "account",
    rtlName: "صفحات",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Profile",
        rtlName: "لوحة القيادة",
        icon: <PersonIcon color='inherit' />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
      },
      {
        path: "/signup",
        name: "Feedback",
        rtlName: "لوحة القيادة",
        icon: <RocketIcon color='inherit' />,
        secondaryNavbar: true,
        component: SignUp,
        layout: "/auth",
      },
      {
        path: "/signin",
        name: "Sign Out",
        rtlName: "لوحة القيادة",
        icon: <DocumentIcon color='inherit' />,
        component: SignIn,
        layout: "/auth",
      },
    ],
  },
];
export default dashRoutes;
