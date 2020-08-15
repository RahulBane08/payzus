import React from 'react';
import {
    Row, Col
} from 'reactstrap';

import {
    
} from 'components';
import swal from "sweetalert";
import bigInt from "big-integer";
import NumericInput from 'react-numeric-input';
import generateElement from "../../../generateElement";
import web3 from "web3";
import PayzusContractABI from "../../../contracts/pyzusReferral.json";
import firebaseApp from '../../../firebase-config';

const database = firebaseApp.database().ref("Users");

class FormPremade extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            PayzusContract:null,
            account:null,
            Web3:null,
            loading:false,
            referrerAddress:"",
            tokenNumbers:250,
            price:0,
            // rewardsCredited:true,
            // rewards:0,
            WhiteListed:false,
            uid:null
            
        }
        
    }

    componentDidMount = async () => {
        let temp;
        try{
               await this.setState({uid:this.props.uid})     
            
                    database
                        .child(this.state.uid +'/WhiteListed')
                        .once("value", (snapshot) => {
            
                            temp = snapshot.val();
              
                            this.getValue(temp)
                                                
                        })
                                      
                

           
            
            const Web3 = new web3(web3.givenProvider);
            const accounts = await Web3.eth.getAccounts();
            console.log(accounts[0]);
            const account = accounts[0];

            if(account === undefined){
                
                await swal({
                    content: generateElement(`MetaMask is locked. Please Unlock MetaMask and try again`),
                    icon: "error",
        
                });
                return
            }


            const PayzusContract = new Web3.eth.Contract(PayzusContractABI,"0xd31F388da6037f735eF612D591f3b49E0Ea33647");
            // this.setState({PayzusContract})

            // console.log(this.state.PayzusContract)
            
            
            this.setState({PayzusContract, account, Web3 })
            // console.log(temp)
            
        }

        catch (error){
            console.log(error);
        }
    }

    getValue = (value) => {
        this.setState({WhiteListed:value})
        console.log(this.state.WhiteListed)
        
    }

    // getUid = (value) => {
    //     this.setState({uid:value})
    //     console.log(this.state.uid)
    // }

    handleReferrence = async () => {

        if(this.state.referrerAddress === ""){
            swal({
                content:generateElement(`Enter the referral address first`),
                icon:"error"
            });
            return;
        }
        console.log(this.state.referrerAddress);

        const result = await this.state.PayzusContract.methods.addReferrer(this.state.referrerAddress)
            .send({from : this.state.account});

        console.log(result);

        swal({
            content:generateElement(`Referral code Applied`),
            icon:"success"
        });

        this.reset();
        
    }

    reset = async () => {
        await this.setState({referrerAddress:""})
    }

    handleTokenChange = async (value) => {
        await this.setState({tokenNumbers:value})
        console.log(this.state.tokenNumbers)

        this.priceOf(this.state.tokenNumbers)
    }

    priceOf = async(value) => {
        if(value === null){
            return;
        }

        const price = await this.state.PayzusContract.methods.priceOf(value).call()
        await this.setState({price})
        console.log(this.state.price)
    }

    handleBuyPayzus = async () => {

        if(this.state.price != 0){

        var tokens = this.state.tokenNumbers;

        let count;

        if(tokens < 250 || tokens > 7450){
            await swal({
                content:generateElement(`Please enter tokens in the defined range`),
                icon:"error"
            })
            return
        }

        else {
            
            await this.setState({loading:true})

        const result = await this.state.PayzusContract.methods.buyTokens(tokens)
            .send({from:this.state.account, value:this.state.price});

        console.log(result)
        

        await database
                .child(this.state.uid + '/Transactions/count')
                .once('value', (snapshot) => {
                    count = snapshot.val()
                })
        
        await database
                .child(this.state.uid + '/Transactions/' + count)
                .update({txHash:result.transactionHash})
                .then(() => {
                    database
                        .child(this.state.uid + '/Transactions/count')
                        .set(count + 1, (err) => {
                            if(err){
                                console.log(err)
                            }
                        })
                    
                    // .then(() => {
                    //     swal({
                    //         content:generateElement(`Transaction successfull`),
                    //         icon:"success"
                    //     })
                    // })
                })

    
        

        await this.setState({rewardsCredited:false})

        const events = await this.state.PayzusContract.methods.accounts(this.state.account).call()

        // await this.setState({rewardsCredited:true})
        console.log(events);

        await database
                .child(this.state.uid)
                .update({Rewards:events.reward, DirectReferred:events.referredCount, IndirectReferred:events.referredCountIndirect, Referrer:events.referrer})
                .then(() => {
                    this.setState({loading:false},() => {
                        swal({
                            content:generateElement(`Transaction Successful`),
                            icon:"success"
                        });
                    }) 
                    
                })
                .catch((error) => {
                    console.log(error)
                })

        // this.setState({rewards:events.reward})
        
        console.log(events.reward);
        
        }

        }
        
        else{
            return;
        }

    }

    render(){

        return (
            <div>
                <div className="content">
                    <Row>
                        <Col xs={12} md={12}>
                            <div className="page-title">
                                <div className="float-left">
                                    <h1 className="title">Buy PayZus</h1>
                                </div>
                            </div>

                            {
                                (this.state.WhiteListed) ? 
                                (
                                <div className="row margin-0">
                                    <div className="col-12">
                                        <section className="box ">
                                            <header className="panel_header" >
                                                <h2 className="title float-left"></h2>
                                                {/* {
                                                    this.state.rewardsCredited
                                                    ? (
                                                        <div style={{float:"right",paddingTop:10,paddingRight:50}}>Rewards : {this.state.rewards}</div>
                                                    )
                                                    : (
                                                        <div style={{float:"right",paddingTop:10,paddingRight:50}}>Fetching Rewards</div> 
                                                    )
                                                } */}
                                                
                                            </header>
                                            <div className="content-body">
                                                <div className="row">
                                                        <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-8">
                                                            <form>
                                                                <div className="form-group">
                                                                    <label htmlFor="inputAddress">Enter Referrer address</label>
                                                                        <input type="text"  className="form-control" id="inputEmail4" placeholder="" 
                                                                            value={this.state.referrerAddress}
                                                                            onChange={event => this.setState({referrerAddress:event.target.value})}
                                                                        />

                                                                </div>
                                                                
                                                            </form>
                                                            <div className="col-md-12" style={{textAlign:"center",marginTop:'20px'}}>
                                                                <button type="submit" className="btn btn-primary" 
                                                                    onClick={this.handleReferrence}
                                                                    style={{width:'150px'}}
                                                                >
                                                                    Avail Referral
                                                                </button>
                                                            </div>        

                                                            <form>
                                                                <div className="form-group">
                                                                    <label htmlFor="inputAddress">Number of Payzus Tokens</label>
                                                                    <NumericInput 
                                                                        min={250}
                                                                        max={7450}
                                                                        value={this.state.tokenNumbers}
                                                                        className="form-control"
                                                                        // onChange={value => this.setState({tokenNumbers:value})}
                                                                        onChange={(value) => this.handleTokenChange(value)}
                                                                    />

                                                                </div>
                                                                <p color="muted">
                                                                    You can only purchase token in the range 250 to 7450.
                                                                </p>
                                                                <div className="form-row">
                                                                    <div className="form-group col-md-5">
                                                                        <label htmlFor="inputEmail4">ETH</label>
                                                                        <input type="text" readOnly className="form-control" id="inputEmail4" placeholder=""
                                                                            value={(this.state.price)/(10**18)}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-2" style={{textAlign:"center",paddingTop:'45px'}}>
                                                                        <i className="fa fa-exchange" aria-hidden="true">
                                                                    </i></div>
                                                                    <div className="form-group col-md-5">
                                                                        <label htmlFor="inputPassword4">USD</label>
                                                                        <input type="text" readOnly className="form-control" id="inputPassword4" placeholder=""
                                                                            value={((this.state.price)/(10**18))*395} 
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </form>
                                                                <div className="col-md-12" style={{textAlign:"center",marginTop:'20px'}}>
                                                                    <button type="submit" className="btn btn-primary" 
                                                                        onClick={this.handleBuyPayzus}
                                                                        style={{width:'150px'}}
                                                                    >
                                                                        {
                                                                            this.state.loading ?
                                                                            (<div>Pending ...</div>)
                                                                            : (<div>Buy</div>)
                                                                        }
                                                                       
                                                                    </button>
                                                                </div>
                                                                
                                                            

                                                        </div>
                                                    
                                                    
                                                </div>

                                            </div>
                                        </section>
                                    </div>
                                </div>
                                )
                                :
                                (
                                    <div style={{textAlign:"center"}}>
                                        <h2> Complete your KYC <br /> and then please wait untill you are WhiteListed</h2>
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
