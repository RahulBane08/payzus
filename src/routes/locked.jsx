
// import GeneralLayout from 'layouts/General.jsx';
import UIBSDatatable from 'views/general/Tables/BSDatatable.jsx';

import Register from "../views/general/Forms/Register";
import Login from "../views/general/Forms/Login";
import Home from "../views/general/Forms/home";


var indexRoutes = [

    
    { path: "/register", name: "Register", icon:"speedometer", component: Register },
    { path: "/login", name: "Login", icon:"speedometer", component: Login },
    { path: "/market",icon:"speedometer", name: "Market", component: UIBSDatatable },
    {path: "/home", name:"WhatNext", icon:"speedometer", component:Home },
    {redirect: true, path:"/", pathTo:"/home", name:"home"},
    
    
];

export default indexRoutes;
