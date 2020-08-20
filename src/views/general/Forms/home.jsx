import React, { Component } from 'react';
import {
    Button, Form, FormGroup, Label, Input,
    
    Row, Col,
} from 'reactstrap';
import BImage from "assets/img/img.png";

export default class home extends Component {
    render() {
        return (
            // <div style={{height:"430px",textAlign:"center", marginTop:'100px'}}>
            //     <h1 >where to go now??</h1>
            //     <h3>Simply just register yourself and start using payzus</h3>
            //     <a target="_blank" href="#!">

            //         <img src={BImage} width="600px" height="300px"/>
            //     </a>
            // </div>
            <div>
                <div className="content">
                    <Row>
                        <Col xs={12} md={12}>

                    <div className="page-title">
                        <div className="float-left">
                            <h1 className="title">Expolre</h1>
                        </div>
                    </div>



                    <div className="col-12" style={{height:"400px", marginBottom:'40px'}}>
                        <section className="box ">
                            <header className="panel_header">
                                <h2 className="title float-left">Visit Our Medium blog to get the insights of payzus</h2>
                                
                            </header>
                            <div className="content-body">
                                <div className="row">
                                    <div className="col-lg-8 col-md-9 col-12" >

                                      
                                        <a target="_blank" href="https://medium.com/@payzus">

                                        <img src={BImage} width="600px" height="300px"/>
                                        </a>

                                    </div>
                                    <div className="col-lg-4 col-md-3 ">
                                        <div>
                                            <h3>Payzus: The Future of Digital Banking and Crypto Currency is here</h3>
                                            <p>Payzus has a vision to create an ecosystem that makes it easier to use crypto currencies, facilitates routine purchases, and a single wallet for daily use.</p>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </section>
                    </div>


                    </Col>

                    </Row>
                </div>
            </div>
        )
    }
}
