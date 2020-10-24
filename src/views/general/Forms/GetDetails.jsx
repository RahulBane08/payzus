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
import Mobile from "./countryCode";

const database = firebaseApp.database().ref("Users");
const StorageRef = firebaseApp.storage().ref('Images');

class FormPremade extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            uid:"",
            mobile:"",
            photoIdNumber:"",
            IdFile1:null,
            IdFile2:null,
            kycStatus:null,
            IdURL1:"",
            IdURL2:""
            

        }

    }

    componentDidMount = async () => {

        await this.setState({uid:this.props.uid});

        await database
            .child(this.state.uid + '/KYCSubmitted')
            .once('value', snapshot => {
                this.setState({kycStatus:snapshot.val()});
               
            })
    }

    onFileUpload = (event) => {

     let files = event.target.files;

        files.length === 2 
        ?   
           this.setState({IdFile1: files[0], IdFile2:files[1]}, () => {
               console.log(this.state.IdFile1) 
               console.log(this.state.IdFile2)
            })
            // this.setState({aadharFile2: files[1]}, () => {console.log(this.state.aadharFile2)})
           
        : 

        swal({
            content: generateElement(`Please select 2 files both front and back`),
            icon: "error",

        });


   
    }

    // getUrl = (value) => {
    //     this.setState({IdURL1:value},() => {
    //         console.log(this.state.IdURL1)
    //     })
    // }

    handleSubmit = async() => {

        var mobile = this.state.mobile;
        var photoIdNumber = this.state.photoIdNumber;
        var IdFile1 = this.state.IdFile1;
        var IdFile2 = this.state.IdFile2;
        var URL1;
        var URL2;

        if(mobile === "" || photoIdNumber === "" ){
            swal({
                content: generateElement(`Please fill all the details first`),
                icon: "error",
            });
            return;
        }

        if(IdFile1 === null || IdFile2 === null){
            swal({
                content: generateElement(`Please upload 2 files both front and back`),
                icon: "error",
            });

            return;
        }

        var uploadTask1 = StorageRef.child(this.state.uid + "/File1").put(IdFile1);
        var uploadTask2 = StorageRef.child(this.state.uid + "/File2").put(IdFile2);

        await uploadTask1.on('state_changed', function(snapshot) {

            var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            // console.log("upload is "+ progress +" done");
        },function(error) {
            console.log(error);
        },
         function() {
            uploadTask1.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                // console.log(downloadURL);
                URL1 = downloadURL;
            })
        })

        

        await uploadTask2.on('state_changed', function(snapshot) {

            var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            // console.log("upload is "+ progress +" done");
        },function(error) {
            console.log(error);
        },
         function() {
            uploadTask2.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                // console.log(downloadURL);
                URL2 = downloadURL;
            })
        })

        

        await database
            .child(this.state.uid)
            .update({Mobile:mobile, PhotoIdNumber: photoIdNumber,KYCSubmitted:true})
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
                                    <h1 className="title">Get Your KYC Done For Widhdrawing PZS Rewards</h1>
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
                                                            <label htmlFor="inputAddress">Your Mobile (With Country Code)</label>
                                                                <div className="form-row">
                                                                    
                                                                    <div className="form-group col-md-3">  
                                                                        <Mobile uid={this.state.uid}/>
                                                                    </div>
                                                                    <div className="form-group col-md-9">
                                                                        
                                                                        <input type="text"  className="form-control" id="inputMobile" placeholder=""
                                                                            value={this.state.mobile}
                                                                            onChange={event => this.setState({mobile:event.target.value})}
                                                                        />

                                                                    </div>

                                                                </div>
                                                                
                                                                <div className="form-group">                                                                  
                                                                    <label htmlFor="inputEmail4">Identity Proof Number</label>
                                                                    <input type="text" className="form-control" id="inputAadhar" placeholder=""
                                                                        value={this.state.aadharNumber}
                                                                        onChange={event => this.setState({photoIdNumber:event.target.value})}
                                                                    />                                                                                                                                     
                                                                </div>
                                                                
                                                                <div className="form-group">                                                                  
                                                                    <label htmlFor="inputEmail4">Identity Proof</label>
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
