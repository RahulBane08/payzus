import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'reactstrap';

import { Navmenudropdown } from 'components';
import { Navmenugroup } from 'components';

import PerfectScrollbar from 'perfect-scrollbar';

import userImage from "assets/img/icon1.jpg";


var ps;
var currentmenu = "notset";


class Sidebar extends React.Component{
    constructor(props){
        super(props);
        this.activeRoute.bind(this);
        this.state = {
          opendd: '',
          openmenu: 'none',
          profilename: 'Eric Nelson',
          profileimg: '',
          profileposition: 'Web Developer',
        };
        this.handleOpendd = this.handleOpendd.bind(this);
        this.handlecurrent = this.handlecurrent.bind(this);

    }

    truncate(str) {
        return str.length > 10  ? str.substring(0,6) + "..." + str.substring(38,42): str;
    }

    handlecurrent(currentmenu) {   
       //console.log("handlecurrent"+currentmenu);
       if(this.state.opendd !== ""){
           currentmenu = ""; 
       }
    }

    handleOpendd(open) {  
        currentmenu = "";
        if(this.state.opendd === open){
            this.setState({     
                opendd: ''    
            });  
        } else {
            this.setState({     
                opendd: open    
            });  
        }
        //currentmenu = "";
        //console.log(open + this.state.opendd);
    }
    

    // verifies if routeName is the one active (in browser input)
    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? ' active' : '';
    }
    componentDidMount(){

        if(this.props.admintype === 'general'){
            this.setState({     
                profileposition: '',
                profileimg: '',
                profilename: ''
            });  
        }

        if(navigator.platform.indexOf('Win') > -1){
            ps = new PerfectScrollbar(this.refs.sidebar,{suppressScrollX: true, suppressScrollY: false});
        }


    }
    componentWillUnmount(){
        if(navigator.platform.indexOf('Win') > -1){
            ps.destroy();
        }
    }
    render(){
        
        const children = (child, parent) => {
            var links = [];
            if (child) {
                for (var i = 0; i < child.length; i++) {
                    links.push(
                        <li key={i}>
                            <NavLink to={child[i].path} className="nav-link" activeClassName="active">
                                <span>{child[i].name}</span>
                            </NavLink>
                        </li>
                    );
                    //console.log(child[i].parent + this.props.location.pathname + child[i].path);
                    if(this.props.location.pathname === child[i].path){
                        //console.log("match found " + child[i].parent);
                        if(currentmenu === "notset" && this.state.opendd === ""){
                            currentmenu = parent; //child[i].parent;
                        }
                    }
                    if(this.props.location.pathname === "/"){
                        currentmenu = "dashboards";
                    }
                }

                //console.log(currentmenu);
                //console.log(this.props.location.pathname);
                //console.log(parent);
                return <Nav>{links}</Nav>
            }
        }
        


        return (
            <div className="sidebar menubar" data-color="black" style={{height:'100%'}}>

                <div className="logo">
                   
                </div> 
                
                <div className="sidebar-wrapper" ref="sidebar">
                <div className="profile-info row">
                    <div className="profile-image col-4">
                        
                        <img alt="" src={userImage} className="img-fluid avatar-image" style={{background:"transparent"}}/>
                       
                    </div>
                    <div className="profile-details col-8">
                        <h3>
                            <span style={{fontSize:'20px',color:"white"}}>{this.truncate(this.props.account)}</span>
                            <span className="profile-status online"></span>
                        </h3>
                        <p className="profile-title">
                            { 
                            this.props.account === ""
                            ? <span style={{color:"white"}}>MetaMask</span>
                            : <span style={{color:"#26a69a"}}>MetaMask</span>
                            }
                        </p>
                    </div>
                </div>

                    <Nav className="navigation">
                        {
                            this.props.routes.map((prop,key) => {
                                if(prop.redirect)
                                    return null;
                                if(prop.type === "child")
                                    return null;
                                if(prop.type === "navgroup")
                                    return ( 
                                      <Navmenugroup name={prop.name} key={key}>
                                      </Navmenugroup>
                                    );
                                if(prop.type === "dropdown")
                                    return ( 

                                        <li className={(prop.parentid) + " " + (( ( (prop.parentid === currentmenu) && (prop.parentid !== "") && (prop.parentid !== "multipurpose") ) || (this.state.opendd === prop.name)) ? 'active': '') + ' nav-parent '} data-toggle="collapse" key={key}>
                                            <a to={prop.path} className="nav-link" onClick={() => this.handleOpendd(prop.name)} href="#!">
                                                        <i className={"i-"+prop.icon}></i>
                                                        <p>{prop.name}</p>
                                                        <span className="badge">{prop.badge}</span>
                                                        <span className={"arrow i-arrow-left"}></span>
                                            </a>
                                            { children(prop.child, prop.parentid) }
                                        </li>

                                    );

                                if(prop.type === "dropdown-backup")
                                    return ( 
                                      <Navmenudropdown name={prop.name} icon={prop.icon} path={prop.path} badge={prop.badge} child={prop.child} key={key} openclass={this.state.opendd === prop.name ? 'activethis': ''}  onClick={() => this.handleOpendd(prop.name)}>
                                      </Navmenudropdown>
                                    );
                                return (
                                    <li className={this.activeRoute(prop.path) + ' nav-parent '} key={key} onClick={() => this.handleOpendd(prop.name)}>
                                        <NavLink to={prop.path} className="nav-link" activeClassName="active">
                                            <i className={"i-"+prop.icon}></i>
                                            <p>{prop.name}</p>
                                            <span className="badge">{prop.badge}</span>
                                        </NavLink>
                                  </li>
                                );
                            })

                        }

                    </Nav>
                </div>



            </div>
        );
    }
}

export default Sidebar;
