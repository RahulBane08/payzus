import React from 'react';
import {
    Row, Col
} from 'reactstrap';

import {
    
} from 'components';
import swal from "sweetalert";
import generateElement from "../../../generateElement";
// import web3 from "web3";
// import PayzusContractABI from "../../../contracts/pyzusReferral.json";
import firebaseApp from '../../../firebase-config';

const database = firebaseApp.database().ref("Users");

class FormPremade extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            uid:"",
            mobile:"",
            aadharNumber:"",
            aadharFile1:null,
            aadharFile2:null,
            kycStatus:null
            

        }

    }

    componentDidMount = async () => {

        // let uid;

        // await firebaseApp.auth().onAuthStateChanged(function(user) {
        //     if(user){
        //         user = firebaseApp.auth().currentUser;
        //         uid = user.uid;
        //     }
        // })

        await this.setState({uid:this.props.uid});

        console.log(this.state.uid);

        await database
            .child(this.state.uid + '/KYCSubmitted')
            .once('value', snapshot => {
                this.setState({kycStatus:snapshot.val()});
                // console.log(snapshot.val())
            })

            console.log(this.state.kycStatus);
       
    }

    onFileUpload = (event) => {

     let files = event.target.files;

        files.length === 2 
        ?   
           this.setState({aadharFile1: files[0], aadharFile2:files[1]}, () => {
               console.log(this.state.aadharFile1) 
               console.log(this.state.aadharFile2)
            })
            // this.setState({aadharFile2: files[1]}, () => {console.log(this.state.aadharFile2)})
           
        : 

        swal({
            content: generateElement(`Please select 2 files both front and back`),
            icon: "error",

        });


   
    }

    handleSubmit = () => {

        var mobile = this.state.mobile;
        var aadharNumber = this.state.aadharNumber;
        var aadharFile1 = this.state.aadharFile1;
        var aadharFile2 = this.state.aadharFile2;

        if(aadharFile1 === null || aadharFile2 === null){
            swal({
                content: generateElement(`Please upload 2 files both front and back`),
                icon: "error",
            });

            return;
        }

        database
            .child(this.state.uid)
            .update({Mobile:mobile, AadharNumber: aadharNumber, AadharFile1: aadharFile1, AadharFile2: aadharFile2 ,KYCSubmitted:true})
            .then(() => {

                swal({
                    content: generateElement(`Your KYC is submitted. Please wait untill you are WhiteListed`),
                    icon: "info",
                  });
                
            })
            .catch((error) =>  {
                console.log(error);
            })

        this.setState({mobile:"", aadharNumber:"", aadharFile1:null, aadharFile2:null})    
                  
    }

    render(){

        return (
            <div>
                <div className="content">
                    <Row>
                        <Col xs={12} md={12}>
                            <div className="page-title">
                                <div className="float-left">
                                    <h1 className="title">Get Your KYC Done</h1>
                                </div>
                            </div>
                            {
                                this.state.kycStatus ?
                                (
                                    <div style={{textAlign:"center"}}>
                                        <h2> Your KYC is already submitted</h2>
                                    </div>
                                )
                                :
                                (
                                    <div className="row margin-0">
                                    <div className="col-12">
                                        <section className="box ">
                                            <header className="panel_header" >
                                                <h2 className="title float-left"></h2>
                                                
                                            </header>
                                            <div className="content-body">
                                                <div className="row">
                                                        <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-8">
                                                            
                                                            <form>
                                                                <div className="form-group">
                                                                    <label htmlFor="inputAddress">Your Mobile</label>
                                                                    <input type="text"  className="form-control" id="inputMobile" placeholder=""
                                                                        value={this.state.mobile}
                                                                        onChange={event => this.setState({mobile:event.target.value})}
                                                                    />

                                                                </div>
                                                                <div className="form-group">                                                                  
                                                                    <label htmlFor="inputEmail4">Aadhar Number</label>
                                                                    <input type="text" className="form-control" id="inputAadhar" placeholder=""
                                                                        value={this.state.aadharNumber}
                                                                        onChange={event => this.setState({aadharNumber:event.target.value})}
                                                                    />                                                                                                                                     
                                                                </div>
                                                                
                                                                <div className="form-group">                                                                  
                                                                    <label htmlFor="inputEmail4">Upload Aadhar</label>
                                                                    <input type="file" className="form-control" id="uploadAadhar" multiple placeholder=""
                                                                       onChange={event => this.onFileUpload(event)}
                                                                       onClick={(e) => (e.target.value = null)}
                                                                    />                                                                                                                                     
                                                                </div>
                                                                <p style={{color:"#26a69a"}}>Please Upload both front and back</p>
                                                            </form>
                                                                <div className="col-md-12" style={{textAlign:"center",marginTop:'20px'}}>
                                                                    <button type="submit" className="btn btn-primary" 
                                                                        onClick={this.handleSubmit}
                                                                        style={{width:'150px'}}
                                                                    >
                                                                        Submit
                                                                    </button>
                                                                </div>
                                                                
                                                            

                                                        </div>
                                                    
                                                    
                                                </div>

                                            </div>
                                        </section>
                                    </div>
                                </div>
                                )
                                
                            }

                                
                                                            
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default FormPremade;
