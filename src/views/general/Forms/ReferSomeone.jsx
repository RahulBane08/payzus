import React from 'react';
import {
    Row, Col
} from 'reactstrap';

import {
    
} from 'components';
import swal from "sweetalert";
import generateElement from "../../../generateElement";
import firebaseApp from '../../../firebase-config';

const database = firebaseApp.database().ref("Users");

class ReferSomeone extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            uid:"",
            copySuccess:false
        }
    }

    componentDidMount = async () => {

        await this.setState({uid:this.props.uid})
       console.log(this.state.uid)
    }

    handleCopy = () => {
        const el = this.referrralCode;
        el.select();
        document.execCommand("copy")
        this.setState({copySuccess:true}, () => {
            swal({
                content:generateElement(`Copied to Clipboard`),
                icon:"success"
            });
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
                                    <h1 className="title"></h1>
                                </div>
                            </div>
                                    <div className="row margin-0">
                                    <div className="col-12">
                                        <section className="box ">
                                            <header className="panel_header" >
                                                <h2 className="title float-left">Refer SomeOne to earn Rewards</h2>
                                                
                                            </header>
                                            <div className="content-body">
                                                <div className="row">
                                                    <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-8">
                                                        
                                                            <div className="form-row">
                                                                <div className="form-group col-md-8">
                                                                    <label htmlFor="referralCode">Your Referral code is</label>
                                                                    <input type="text"  className="form-control" id="referralCode" placeholder="" 
                                                                        value={this.state.uid}
                                                                        ref={(code) => this.referrralCode = code}

                                                                    />

                                                                </div>
                                                                <div className="form-group col-md-4" style={{paddingTop:'30px',paddingLeft:0}}>
                                                                
                                                                    <button
                                                                        className="btn btn-primary"
                                                                        onClick={this.handleCopy}
                                                                    >
                                                                        copy
                                                                    </button>
                                                                
                                                                </div>
                                                            </div>
                                                          
                                                    </div>        
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>                                                
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default ReferSomeone;
