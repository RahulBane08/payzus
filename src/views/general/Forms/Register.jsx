import React from 'react';
import {
    Button, Form, FormGroup, Label, Input,
    
    Row, Col,
} from 'reactstrap';

import {
    
} from 'components';
import swal from "sweetalert";
import generateElement from "../../../generateElement";
import firebase from "../../../firebase-config";
import firebaseApp from '../../../firebase-config';

const database = firebase.database().ref("Users");

class FormGrid extends React.Component{

    constructor(props) {
    super(props);

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.handleRegister = this.handleRegister.bind(this);

    this.state = {
      dropdownOpen: false,
      splitButtonOpen: false,
      name:"",
      email:"",
      password:"",
      // startDate: moment(),
      // file1:null,
      // file2:null
    };
  }

  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  toggleSplit() {
    this.setState({
      splitButtonOpen: !this.state.splitButtonOpen
    });
  }


  handleRegister = () => {

    var email = this.state.email;
    var password = this.state.password;
    var name = this.state.name;


    firebaseApp.auth().createUserWithEmailAndPassword(email,password)
      .then(() => {

          var user = firebaseApp.auth().currentUser;

          var uid = user.uid;

          var email_varified = user.emailVerified;

          // this.setState({email:"", name:"", password:""})

          if(!email_varified){
            user.sendEmailVerification().then(function() {
              // Email sent.
              // alert("email varification link has been sent")
              swal({
                content: generateElement(`Email varification link is sent to your email Id. Please verify !`),
                icon: "info",
              });
              
              database
                .child(uid)
                .set({Name:name, Email:email, WhiteListed: false, KYCSubmitted:false, Rewards:0, DirectReferred:0, IndirectReferred:0, Referrer:'0x00'})
                .then(() => {
                  database
                    .child(uid + '/Transactions')
                    .update({count:0})
                  
                })
                .catch(error => {
                  console.log(error)
                })

              
            }).catch(function(error) {
              // An error happened.
              console.log(error)
            });
          }
          
          else{
            window.location.href= "/zestreact"+"/login";
          }

          this.setState({email:"", name:"", password:""})

      })
      .catch(error => {
        console.log(error)
      })
       
  }

    render(){

        return (
            <div>
                <div className="content">
                    <Row>
                        <Col xs={12} md={12}>

                    <div className="page-title">
                        <div className="float-left">
                            <h1 className="title">Register form</h1>
                        </div>
                    </div>



                    <div className="col-12">
                        <section className="box ">
                            <header className="panel_header">
                                <h2 className="title float-left">Register</h2>
                                
                            </header>
                            <div className="content-body">
                                <div className="row">
                                    <div className="col-lg-8 col-md-9 col-10">




<Form>  
        <FormGroup row>
          <Label htmlFor="exampleName" sm={12}>Name</Label>
          <Col sm={12}>
            <Input type="text" name="name" id="exampleName" placeholder="" 
              value={this.state.name}
              onChange={event => this.setState({name:event.target.value})}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label htmlFor="exampleEmail" sm={12}>Email</Label>
          <Col sm={12}>
            <Input type="email" name="email" id="exampleEmail" placeholder="" 
              value={this.state.email}
              onChange={event => this.setState({email:event.target.value})}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label htmlFor="examplePassword" sm={12}>Password</Label>
          <Col sm={12}>
            <Input type="password" name="password" id="examplePassword" placeholder="" 
              value={this.state.password}
              onChange={event => this.setState({password:event.target.value})}
            />
          </Col>
        </FormGroup>
        
      </Form>
      <Button onClick={(event) => this.handleRegister(event)}>Register</Button>
      
      

                                    </div>
                                </div>


                            </div>
                        </section>
                    </div>


                    
                    
                    



                                
                        </Col>

                    </Row>
                </div>
            </div>
        );
    }
}

export default FormGrid;
