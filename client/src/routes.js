/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// import Dashboard from "views/Dashboard.js";
import Home from "views/Home.js";
import Detail from "views/Detail.js";
import Register from "views/Register";
// import TableList from "views/TableList.js";
// import Notifications from "views/Notifications.js";

const homeRoutes = [
  {
    path: "/users",
    name: "Home",
    icon: "nc-icon nc-circle-09",
    component: Home,
    layout: "/home",
    sitebar: true
  },
  {
    path: "/user/detail/:id",
    name: "Detail",
    icon: null,
    component: Detail,
    layout: "/home",
    sitebar: false
  },
  {
    path: "/user/register",
    name: "Register",
    icon: null,
    component: Register,
    layout: "/home",
    sitebar: false
  }
];

export default homeRoutes;
