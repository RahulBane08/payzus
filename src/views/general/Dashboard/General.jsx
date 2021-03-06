import React from 'react';
import {
    Row, Col,
    Button
} from 'reactstrap';

import {

  StatsCard
} from '../../../components/';

import { Line} from 'react-chartjs-2';

import {
    dashboardAllProductsChart,
    //dashboardAllProductsChart1,

} from 'variables/general/dashboard-charts.jsx';

//import CountTo from 'react-count-to';
import web3 from "web3";
import swal from "sweetalert";
import firebaseApp from "../../../firebase-config";
import PayzusContractABI from "../../../contracts/PAYZUS.json";
import ReferralContractABI from "../../../contracts/pyzusReferral.json";
import generateElement from "../../../generateElement";


const database = firebaseApp.database().ref("Payzus");

class General extends React.Component{

   
    constructor(props) {
      super(props);
      this.state = {
        data1: [],
        rewards:0,
        firstPersonRewards:0,
        secondPersonRewards:0,
        thirdPersonRewards:0,
        fourthPersonRewards:0,
        fifthPersonRewards:0,
        sixthPersonRewards:0,
        seventhPersonRewards:0,
        directReferred:0,
        indirectReferred:0,
        referrerAddress:"0x00",
        referrerName:"",
        tokenBalance:0,
        account:null,
        indirectRewards:0,
        totalTokenBalance:0,
        usdtBalnce:0,
      };
    }
    
    componentDidMount = async () => {
       
        let temp;

      try{

              const Web3 = new web3(web3.givenProvider);
              const accounts = await Web3.eth.getAccounts();
              await this.setState({account:accounts[0]})

              const PayzusContract = new Web3.eth.Contract(PayzusContractABI,"0x96b37f38ad1c9c4894a681fdec45fe6b82bad1ee");

              const balance = await PayzusContract.methods.balanceOf(this.state.account).call()
              // console.log(PayzusContract)

              await this.setState({tokenBalance:balance});

              // const ReferralContract = new Web3.eth.Contract(ReferralContractABI, "0x623d2b987dcde40bc73f678b9ae57936ab32e112");
              // console.log(ReferralContract)
              // const result = await ReferralContract.methods.accounts(this.state.account).call();

              // await this.setState({rewards:result.reward, directReferred:result.referredCount, indirectReferred:result.referredCountIndirect, referrerAddress:result.referrer});


        firebaseApp.auth().onAuthStateChanged((user) => {
          if(user){
              var uid = user.uid
                      
              // console.log(uid)
              
      
              database
                  .child(uid)
                  .once("value", (snapshot) => {
      
                      temp = snapshot.val();
        
                      // console.log(temp);
                      this.setState({
                        rewards: temp.Rewards, 
                        directReferred: temp.DirectReferred, 
                        indirectReferred: temp.IndirectReferred, 
                        referrerAddress: temp.ParentAddress,
                        firstPersonRewards: temp.FirstPersonRewards,
                        secondPersonRewards: temp.SecondPersonRewards,
                        thirdPersonRewards: temp.ThirdPersonRewards,
                        fourthPersonRewards: temp.FourthPersonRewards,
                        fifthPersonRewards: temp.FifthPersonRewards,
                        sixthPersonRewards: temp.SixthPersonRewards,
                        seventhPersonRewards: temp.SeventhPersonRewards,
                        totalTokenBalance: temp.TokenBalance,
                        usdtBalnce: temp.USDTBalance

                      }, () => {

                        database
                          .child(this.state.referrerAddress + "/Name")
                          .once("value", name => {
                            this.state.referrerName = name.val();
                          })
                          .then(() => {

                              this.setState({rewards:  
                              ( this.state.firstPersonRewards + 
                              this.state.secondPersonRewards + 
                              this.state.thirdPersonRewards +
                              this.state.fourthPersonRewards +
                              this.state.fifthPersonRewards +
                              this.state.sixthPersonRewards +
                            this.state.seventhPersonRewards ),
                                
                            indirectRewards: (this.state.secondPersonRewards + this.state.thirdPersonRewards + this.state.fourthPersonRewards + this.state.fifthPersonRewards + this.state.sixthPersonRewards + this.state.seventhPersonRewards),
                            totalTokenBalance:  (this.state.totalTokenBalance + this.state.firstPersonRewards + this.state.secondPersonRewards + this.state.thirdPersonRewards + this.state.fourthPersonRewards + this.state.fifthPersonRewards + this.state.sixthPersonRewards + this.state.seventhPersonRewards),
                          }, () => {
                                database
                                  .child(uid)
                                  .update({Rewards:this.state.rewards})
                              }
                              
                              )
                          })
                        
                      });
                        

                      // console.log(this.state.rewards)

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
  
    truncate(str) {
      return str.length > 10  ? str.substring(0,6) + "..." + str.substring(38,42): str;
    }

    handleWithdraw = () => {
      swal({
        content: generateElement(`Will be available in 48 hours`),
        icon: "info",

      });
    }

    render(){



        return (
            <div>
                <div className="content">
                    <Row>
                        <Col xs={12} md={12}>

                    <div className="page-title">
                        <div className="float-right">
                           
                          {/* <Button color="primary">Add funds</Button>
                          <Button color="primary">send</Button> */}
                          {/* <Button color="primary" onClick={this.handleWithdraw}>Withdraw PZS Rewards</Button> */}
                          <Button color="primary"  className="withdraw-btn" onClick={this.handleWithdraw}>Withdraw PZS Rewards</Button>
                         
                        </div>
                    </div>




                    <div className="clearfix"></div>
                    <div className="col-xl-12">
                        
                            <div style={{height:60+'px'}}></div>

                          </div>





                            <div className="row margin-0">

                                 <div className="col-12 col-lg-12 col-xl-12 col-md-12">
                                    <section className="box" >
                                        <header className="panel_header">
                                            <h2 className="title float-left">Balance</h2>
                                            
                                        </header>
                                        <div className="content-body">        <div className="row">
                        <div className="col-lg-12">
                          <div className="row stats-cards-row">
                            <div className="col-lg-3">
                              <StatsCard title="Total Balance" pzs={this.state.totalTokenBalance } />
                            </div>
                            <div className="col-lg-3">
                              <StatsCard title="Total Rewards" pzs={this.state.rewards} />
                            </div>
                            <div className="col-lg-3">
                              <StatsCard title="USDT Balance" pzs={this.state.usdtBalnce.toFixed(3)} />
                            </div>
                           </div>

                          <div className="row stats-cards-row">
                          <div className="col-lg-3">
                              <StatsCard title="Direct Rewards" pzs={this.state.firstPersonRewards} />
                            </div>
                            <div className="col-lg-3">
                              <StatsCard title="First level Rewards" pzs={this.state.secondPersonRewards} />
                            </div>
                            <div className="col-lg-3">
                              <StatsCard title="Second level Rewards" pzs={this.state.thirdPersonRewards} />
                            </div>
                            <div className="col-lg-3">
                              <StatsCard title="Third level Rewards" pzs={this.state.fourthPersonRewards} />
                            </div>
                            
                           </div>

                           <div className="row stats-cards-row">
                            
                            <div className="col-lg-3">
                              <StatsCard title="Fourth level Rewards" pzs={this.state.fifthPersonRewards} />
                            </div>
                            <div className="col-lg-3">
                              <StatsCard title="Fifth level Rewards" pzs={this.state.sixthPersonRewards} />
                            </div>
                            <div className="col-lg-3">
                              <StatsCard title="Sixth level Rewards" pzs={this.state.seventhPersonRewards} />
                            </div>
                            <div className="col-lg-3">
                              <StatsCard title="Your Referrer" pzs={this.state.referrerName} />
                            </div>
                            
                           </div>

                            
                           
                          </div>


                            <div className="row margin-0 graph-wrapper-row">

                                 {/* <div className="col-10 col-lg-10 col-xl-10 col-md-10">
                                    <section className="box" >
                                        <header className="panel_header">
                                          <h2 className="title float-left">Balance</h2>
                                        </header>
                                        <div className="content-body">      
                                          <div className="row">
                                                <div className="col-12">
                                                    <div className="chart-container">
                                                        
                                                        <div className="chart-area" style={{height:'300px'}}>
                                                          
                                                          <Line data={dashboardAllProductsChart.data} options={dashboardAllProductsChart.options}/>
                                                        </div>

                                                    </div>


                                                </div>      
                                            </div> 
                                        </div>
                                    </section>    
                                </div> */}

                         {/* <div className="col-12 col-lg-5 col-md-5 col-xl-4">
                                <div className="col-12 col-lg-5 col-md-5 col-xl-4">

                                <section className="box ">
                                          <header className="panel_header">
                                              <h2 className="title float-left"> Payzus Token Stats</h2>
                                              
                                          </header>
                                          <div className="content-body">    <div className="row margin-0">
                                                  <div className="col-12">
                                                      <div className="wid-vectormap mapsmall">
                                                          <div className="row">
                                                              <div style={{width: 100+'%', height: 220}}>
                                                              <div style={{width: 100+'%', height: 280}}>
                                                                    <ul style={{marginTop:"30px"}}>
                                                                    <p><li>Token Balance                    <span style={{float:"right"}}>{(this.state.tokenBalance) / (10 ** 18)} PZS</span></li></p>
                                                                      <p><li>Total Rewards                        <span style={{float:"right"}}>{(this.state.rewards)} PZS</span></li></p>
                                                                      <p><li>Direct Rewards           <span style={{float:"right"}}>{(this.state.firstPersonRewards)} PZS</span></li></p>
                                                                      <p><li>Indirect Rewards          <span style={{float:"right"}}>{(this.state.indirectRewards)} PZS</span></li></p>
                                                                      <p><li>Your Referrer    <span style={{float:"right"}}>{(this.state.referrerName)} PZS</span></li></p>
                                                                      
                                                                   
                                                                    </ul>
                                                            
                                                                    
                                                                </div>
                                                              
                                                          </div>
                                                      </div>
                                                  </div>      
                                              </div>

                                          </div>
                                        </div>  
                                      </section>
 
                          </div>
                          </div>  */}


                         




                          <div className="row yt-thumbnail-wrapper" style={{width:100 + '%'}}>
                <div className="col-lg-10 col-md-10 landing__context">
                    <iframe
                        width="100%"
                        height="415"
                        src="https://www.youtube.com/embed/o33NQKmjDsg?rel=0"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
                </div>
            </div>

            <div className="row">
              <div className="col-lg-6 col-md-10 pdf-banner">
            <a href={require('../../../assets/pdf/Payzus-Whitepaper.pdf')} re target="_blank" >
              <img src={require('../../../assets/img/Payzus-Whitepaper.PNG')} alt="" />
            </a>
                
              </div>
             
              <div className="col-lg-6 col-md-10 pdf-banner">
                <a href={require('../../../assets/pdf/Payzus-Defi-Platform.pdf')} re target="_blank" >
                  <img src={require('../../../assets/img/Payzus-Defi-Platform.PNG')} alt="" />

                </a>
                
              </div>
            </div>




{/* 
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
                          

                    </div> */}


                        
</div>
</div>
</div>
</section>
</div></div>

                  </Col>

                    </Row>
            </div>
          </div>  
        );
    }
}

export default General;
