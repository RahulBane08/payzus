import React from 'react';
import {
    Row, Col,
    Button
} from 'reactstrap';

import {
    
} from 'components';

import { Line} from 'react-chartjs-2';

//import styles from 'jvectormap/jquery-jvectormap.css'


import {
    dashboardAllProductsChart,
    //dashboardAllProductsChart1,

} from 'variables/general/dashboard-charts.jsx';

//import CountTo from 'react-count-to';
import web3 from "web3";
import firebaseApp from "../../../firebase-config";
import PayzusContractABI from "../../../contracts/PAYZUS.json";

const database = firebaseApp.database().ref("Users");

class General extends React.Component{

   
    constructor(props) {
      super(props);
      this.state = {
        data1: [],
        rewards:0,
        directReferred:0,
        indirectReferred:0,
        referrerAddress:"0x00",
        tokenBalance:0,
        account:null
      };
    }
    
    componentDidMount = async () => {
       
        let temp;

      try{

              const Web3 = new web3(web3.givenProvider);
              const accounts = await Web3.eth.getAccounts();
              await this.setState({account:accounts[0]})

              const PayzusContract = new Web3.eth.Contract(PayzusContractABI,"0xe9eFf2c6EFa28232F376090a598384496dBF8c76");

              const result = await PayzusContract.methods.balanceOf(this.state.account).call()

              await this.setState({tokenBalance:result});

        firebaseApp.auth().onAuthStateChanged((user) => {
          if(user){
              var uid = user.uid
                      
              // console.log(uid)
              
      
              database
                  .child(uid)
                  .once("value", (snapshot) => {
      
                      temp = snapshot.val();
        
                      // console.log(temp);
                      this.setState({rewards:temp.Rewards, directReferred:temp.DirectReferred, indirectReferred:temp.IndirectReferred, referrerAddress:temp.Referrer});
                      console.log(this.state.rewards)
                                          
                  })
                                
          }
          else{
            // this.props.history.push("/home/login")
            window.location.href="/login"
          }               
        })
      }

      catch(error){
        console.log(error)
      }


    }
    componentWillUnmount(){
     
    }
    

    
    truncate(str) {
      return str.length > 10  ? str.substring(0,6) + "..." + str.substring(38,42): str;
    }

  

    render(){



        return (
            <div>
                <div className="content">
                    <Row>
                        <Col xs={12} md={12}>

                    <div className="page-title">
                        <div className="float-right">
                            {/* <h1 className="title">DashBoard</h1> */}
                          <Button color="primary">Add funds</Button>
                          <Button color="primary">send</Button>
                         
                        </div>
                    </div>




                    <div className="clearfix"></div>
                    <div className="col-xl-12">
                        {/* <div className="row">
                                    <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                                        <div className="db_box graph_widget">
                                        <div className="float-left">
                                          <div className="chart-area" style={{height: 60+'px', maxWidth: 80+'px','marginTop': '-5px','marginBottom': '5px'}}>
                                            <Bar data={playlistCharts3.data} options={playlistCharts3.options} />
                                          </div>
                                        </div>                                        
                                        <div className="widdata float-left">
                                          <h2 className="widtitle">9754</h2>
                                          <p className="widtag">Sales this month</p>
                                        </div> 
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                                        <div className="db_box graph_widget">
                                        <div className="float-left">
                                          <div className="chart-area" style={{height: 60+'px', maxWidth: 80+'px','marginTop': '-5px','marginBottom': '5px'}}>
                                            <Bar data={playlistCharts4.data} options={playlistCharts4.options} />
                                          </div>
                                        </div>                                        
                                        <div className="widdata float-left">
                                          <h2 className="widtitle">$95000</h2>
                                          <p className="widtag">Monthly Earnings</p>
                                        </div> 
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                                        <div className="db_box graph_widget">
                                        <div className="float-left">
                                          <div className="chart-area" style={{height: 60+'px', maxWidth: 80+'px','marginTop': '-5px','marginBottom': '5px'}}>
                                            <Bar data={playlistCharts5.data} options={playlistCharts5.options} />
                                          </div>
                                        </div>                                        
                                        <div className="widdata float-left">
                                          <h2 className="widtitle">89.99%</h2>
                                          <p className="widtag">Target Achieved</p>
                                        </div> 
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-md-4 d-xl-block d-lg-none d-md-none d-sm-block col-sm-6 col-12">
                                        <div className="db_box graph_widget">
                                        <div className="float-left">
                                          <div className="chart-area" style={{height: 60+'px', maxWidth: 80+'px','marginTop': '-5px','marginBottom': '5px'}}>
                                            <Bar data={playlistCharts.data} options={playlistCharts.options} />
                                          </div>
                                        </div>                                        
                                        <div className="widdata float-left">
                                          <h2 className="widtitle">32000</h2>
                                          <p className="widtag">New Visitors</p>
                                        </div> 
                                        </div>
                                    </div>

                            </div> */}
                            <div style={{height:60+'px'}}></div>

                          </div>





                            <div className="row margin-0">

                                 <div className="col-12 col-lg-7 col-xl-8 col-md-7">
                                    <section className="box" >
                                        <header className="panel_header">
                                            <h2 className="title float-left">Balance</h2>
                                            
                                        </header>
                                        <div className="content-body">        <div className="row">
                                                <div className="col-12">
                                                    <div className="chart-container">
                                                        
                                                        <div className="chart-area" style={{height:'300px'}}>
                                                          {/* <h2>Your wallet is empty</h2>
                                                          <Button color="primary"><i class="fa fa-plus" aria-hidden="true" style={{margin:5,marginRight:10}}></i>Add funds</Button> */}
                                                          <Line data={dashboardAllProductsChart.data} options={dashboardAllProductsChart.options}/>
                                                        </div>

                                                    </div>


                                                </div>      
                                            </div> 
                                        </div>
                                    </section>    
                                </div>

                         <div className="col-12 col-lg-5 col-md-5 col-xl-4">

                                <section className="box ">
                                          <header className="panel_header">
                                              <h2 className="title float-left"> Payzus Token Stats</h2>
                                              
                                          </header>
                                          <div className="content-body">    <div className="row margin-0">
                                                  <div className="col-12">
                                                      <div className="wid-vectormap mapsmall">
                                                          <div className="row">
                                                              <div style={{width: 100+'%', height: 250}}>
                                                                    <ul style={{marginTop:"30px"}}>
                                                                    <p><li>Token Balance      <span style={{float:"right"}}>{(this.state.tokenBalance) / (10 ** 18)} PZS</span></li></p>
                                                                      <p><li>Rewards          <span style={{float:"right"}}>{(this.state.rewards) / (10 ** 18)} PZS</span></li></p>
                                                                      <p><li>DirectReferred   <span style={{float:"right"}}>{this.state.directReferred}</span></li></p>
                                                                      <p><li>IndirectReferred <span style={{float:"right"}}>{this.state.indirectReferred}</span></li></p>
                                                                      <p><li>Your referrer    <span style={{float:"right"}}>{this.truncate(this.state.referrerAddress)}</span></li></p>
                                                                    </ul>
                                                            
                                                                    
                                                                </div>
                                                              {/* <div className="map_progress col-12 col-md-12" style={{'marginTop': '-15px'}}>
                                                                  <h5>Unique Visitors</h5>
                                                                  <span className='text-muted'>Last Week Rise by 62%</span>
                                                                  <div className="progress"><div className="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="62" aria-valuemin="0" aria-valuemax="100" style={{width: 62+'%'}}></div></div>
                                                                  <br/>
                                                                  <h5>Registrations</h5>
                                                                  <span className='text-muted'>Up by 57% last 7 days</span>
                                                                  <div className="progress"><div className="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="57" aria-valuemin="0" aria-valuemax="100" style={{width: 57+'%'}}></div></div>
                                                              </div> */}
                                                          </div>
                                                      </div>
                                                  </div>      
                                              </div>

                                          </div>
                                      </section>
 
                          </div>


                          </div>




                    <div className="row margin-0">
                        
                        <div className="col-12 col-lg-6 col-md-6">
                            <section className="box ">
                                <header className="panel_header">
                                    <h2 className="title float-left">All Assets</h2>
                                    
                                </header>
                                <div className="content-body">        <div className="row">
                                        <div className="col-12">
                                            <div className="chart-container">

                                             


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

export default General;
