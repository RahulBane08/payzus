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
import ReferralContractABI from "../../../contracts/pyzusReferral.json";
import firebaseApp from '../../../firebase-config';
import { data } from 'jquery';

const database = firebaseApp.database().ref("Payzus");

class FormPremade extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            ReferralContract:null,
            account:null,
            Web3:null,
            loading:false,
            // referrerAddress:"",
            tokenNumbers:250,
            price:0,
            WhiteListed:false,
            uid:null,
            firstParentUid:"",
            secondParentUid:"",
            thirdParentUid:"",
            fourthParentUid:"",
            fifthParentUid:"",
            sixthParentUid:"",
            seventhParentUid:"",
            
        }
        
    }

    componentDidMount = async () => {
        let temp;
        try{
               await this.setState({uid:this.props.uid})     
            
                    await database
                        .child(this.state.uid +'/WhiteListed')
                        .once("value", (snapshot) => {
            
                            temp = snapshot.val();
              
                            this.getValue(temp)
                                                
                        })
                                      
                
                    await database
                            .child(this.state.uid + '/ParentAddress')
                            .once("value",(first) => {
                                
                                if(first.val() != ""){
                                    this.setState({firstParentUid:first.val()}, () => {
                                    console.log("first parent",this.state.firstParentUid);
                                        
                                        database
                                            .child(this.state.firstParentUid + '/ParentAddress')
                                            .once("value", (second) => {

                                                if(second.val() != ""){
                                                    this.setState({secondParentUid:second.val()}, () => {
                                                        console.log("second parent",this.state.secondParentUid);

                                                        database
                                                            .child(this.state.secondParentUid + "/ParentAddress")
                                                            .once("value", (third) => {

                                                                if(third.val() != ""){
                                                                    this.setState({thirdParentUid:third.val()}, () => {
                                                                        console.log("third parent",this.state.thirdParentUid);

                                                                        database
                                                                            .child(this.state.thirdParentUid + '/ParentAddress')
                                                                            .once("value", fourth => {

                                                                                if(fourth.val() != ""){
                                                                                    this.setState({fourthParentUid:fourth.val()}, () => {
                                                                                        console.log("Fourth parent", this.state.fourthParentUid);

                                                                                        database
                                                                                            .child(this.state.fourthParentUid + '/ParentAddress')
                                                                                            .once("value", fifth => {

                                                                                                if(fifth.val() != ""){
                                                                                                    this.setState({fifthParentUid:fifth.val()}, () => {
                                                                                                        console.log("Fifth parent", this.state.fifthParentUid)

                                                                                                        database
                                                                                                            .child(this.state.fifthParentUid + '/ParentAddress')
                                                                                                            .once("value", sixth => {

                                                                                                                if(sixth.val() != ""){
                                                                                                                    this.setState({sixthParentUid:sixth.val()}, () => {
                                                                                                                        console.log("Sixth parent", this.state.sixthParentUid)

                                                                                                                        database
                                                                                                                            .child(this.state.sixthParentUid + '/ParentAddress')
                                                                                                                            .once("value", seventh => {

                                                                                                                                if(fifth.val() != ""){
                                                                                                                                    this.setState({seventhParentUid:seventh.val()}, () => {
                                                                                                                                        console.log("Seventh parent", this.state.seventhParentUid)
                                                                                                                                    })
                                                                                                                                }
                                                                                                                                else{
                                                                                                                                    console.log("No seventh Parent")
                                                                                                                                }
                                                                                                                            })
                                                                                                                    })
                                                                                                                }
                                                                                                                else{
                                                                                                                    console.log("No sixth parent");
                                                                                                                }
                                                                                                            })
                                                                                                    })
                                                                                                }
                                                                                                else{
                                                                                                    console.log("No fifth parent");
                                                                                                }
                                                                                            })
                                                                                    })
                                                                                }
                                                                                else{
                                                                                    console.log("No fourth parent");
                                                                                }
                                                                            })
                                                                    })
                                                                }

                                                                else{
                                                                    console.log("No third Parent");
                                                                }
                                                            })
                                                    })

                                                }

                                                else{
                                                    console.log("No second Parent");
                                                }
                                            })
                                    })

                                    
                                }
                                else{
                                    console.log("No first parent");
                                }
                                
                            })
           
            
            const Web3 = new web3(web3.givenProvider);
            const accounts = await Web3.eth.getAccounts();
            // console.log(accounts[0]);
            const account = accounts[0];

            if(account === undefined){
                
                await swal({
                    content: generateElement(`MetaMask is locked. Please Unlock MetaMask and try again`),
                    icon: "error",
        
                });
                return
            }

            const ReferralContract = new Web3.eth.Contract(ReferralContractABI,"0x1436405e8a722Dcd9CD1bEb0C93444E219f89924");
            
            this.setState({ReferralContract, account, Web3 })

            // this.handleCredit(100);
            
        }

        catch (error){
            console.log(error);
        }
    }

    getValue = (value) => {
        this.setState({WhiteListed:value})
    
    }

    handleCredit = async(value) => {
        const firstParentAmount = (value * 0.03);
        const secondParentAmount = (value * 0.02);
        const thirdParentAmount = (value * 0.01);
        const fourthParentAmount = (value * 0.01);
        const fifthParentAmount = (value * 0.01);
        const sixthParentAmount = (value * 0.01);
        const seventhParentAmount = (value * 0.01);
        var count1;
        var count2;
        var count3;
        var count4;
        var count5;
        var count6;
        var count7;

        if(this.state.firstParentUid != ""){
            database
                .child(this.state.firstParentUid + "/FirstPersonRewards")
                .once("value", snapshot1 => {
                    count1 = snapshot1.val()
                })
                .then(() => {
                    database
                        .child(this.state.firstParentUid)
                        .update({FirstPersonRewards: firstParentAmount + count1 })
                        .then(() => {
                            if(this.state.secondParentUid != ""){
                                database
                                    .child(this.state.secondParentUid + "/SecondPersonRewards")
                                    .once("value", snapshot2 => {
                                        count2 = snapshot2.val()
                                    })
                                    .then(() => {
                                        database
                                            .child(this.state.secondParentUid)
                                            .update({SecondPersonRewards:secondParentAmount + count2})
                                            .then(() => {
                                                if(this.state.thirdParentUid != ""){
                                                    database
                                                        .child(this.state.thirdParentUid + "/ThirdPersonRewards")
                                                        .once("value", snapshot3 => {
                                                            count3 = snapshot3.val()
                                                        })
                                                        .then(() => {
                                                            database
                                                                .child(this.state.thirdParentUid)
                                                                .update({ThirdPersonRewards: thirdParentAmount + count3})
                                                                .then(() => {
                                                                    if(this.state.fourthParentUid != ""){

                                                                        database
                                                                            .child(this.state.fourthParentUid + "/FourthPersonRewards")
                                                                            .once("value", snapshot4 => {
                                                                                count4 = snapshot4.val()
                                                                            })
                                                                            .then(() => {
                                                                                database
                                                                                    .child(this.state.fourthParentUid)
                                                                                    .update({FourthPersonRewards: fourthParentAmount + count4})
                                                                                    .then(() => {
                                                                                        if(this.state.fifthParentUid != ""){

                                                                                            database
                                                                                                .child(this.state.fifthParentUid + "/FifthPersonRewards")
                                                                                                .once("value", snapshot5 => {
                                                                                                    count5 = snapshot5.val()
                                                                                                })
                                                                                                .then(() => {
                                                                                                    database
                                                                                                        .child(this.state.fifthParentUid)
                                                                                                        .update({FifthPersonRewards: fifthParentAmount + count5})
                                                                                                        .then(() => {
                                                                                                            if(this.state.sixthParentUid != ""){

                                                                                                                database
                                                                                                                    .child(this.state.sixthParentUid + "/SixthPersonRewards")
                                                                                                                    .once("value", snapshot6 => {
                                                                                                                        count6 = snapshot6.val()

                                                                                                                    })
                                                                                                                    .then(() => {
                                                                                                                        database.child(this.state.sixthParentUid)
                                                                                                                        .update({SixthPersonRewards: sixthParentAmount + count6})
                                                                                                                        .then(() => {
                                                                                                                            if(this.state.seventhParentUid != ""){

                                                                                                                                database
                                                                                                                                    .child(this.state.seventhParentUid + "SeventhPersonRewards")
                                                                                                                                    .once("value", snapshot7 => {
                                                                                                                                        count7 = snapshot7.val()
                                                                                                                                    })
                                                                                                                                    .then(() => {
                                                                                                                                        database.child(this.state.seventhParentUid)
                                                                                                                                        .update({SeventhPersonRewards: seventhParentAmount + count7})
                                                                                                                                    })
                                                                                                                            }
                                                                                                                            else{
                                                                                                                                return
                                                                                                                            }
                                                                                                                        })
                                                                                                                        .catch(error => {
                                                                                                                            console.log(error)
                                                                                                                        })
                                                                                                                    })
                                                                                                                    .catch((error) => {
                                                                                                                        console.log(error)
                                                                                                                    })
                                                                                                            }
                                                                                                            else{
                                                                                                                return;
                                                                                                            }
                                                                                                        })
                                                                                                        .catch((error) => {
                                                                                                            console.log(error)
                                                                                                        })
                                                                                                })
                                                                                                .catch(error => {
                                                                                                    console.log(error)
                                                                                                }) 

                                                                                        }
                                                                                        else{
                                                                                            return;
                                                                                        }
                                                                                    })
                                                                                    .catch(error => {
                                                                                        console.log(error)
                                                                                    })
                                                                            })
                                                                            .catch(error => {
                                                                                console.log(error)
                                                                            })
                                                                    }
                                                                    else{
                                                                        return;
                                                                    }
                                                                })
                                                                .catch(error => {
                                                                    console.log(error)
                                                                })
                                                                
                                                        })
                                                        .catch(error => {
                                                            console.log(error)
                                                        })
                                                }
                                                else{
                                                    return;
                                                }
                                            })
                                            .catch(error => {
                                                console.log(error)
                                            })
                                    })
                                    .catch(error => {
                                        console.log(error)
                                    })
                            }
                            else{
                                return;
                            }
                        })
                })
                .catch(error => {
                    console.log(error)
                })
        }

        else{
            return;
        }
    }

    handleTokenChange = async (value) => {
        await this.setState({tokenNumbers:value})
        // console.log(this.state.tokenNumbers)

        this.priceOf(this.state.tokenNumbers)
    }


    priceOf = async(value) => {
        if(value === null){
            return;
        }

        const price = await this.state.ReferralContract.methods.priceOf(value).call()
        await this.setState({price})
        // console.log(this.state.price)
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

        const result = await this.state.ReferralContract.methods.buyTokens(tokens)
            .send({from:this.state.account, value:this.state.price});

        // console.log(result)
        

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
                    
                    .then(() => {
                        this.setState({loading:false}, () => {
                            if(result != null){
                                swal({
                                    content:generateElement(`Transaction successfull`),
                                    icon:"success"
                                })
                                this.handleCredit(tokens);
                            }
                            
                        })
                        
                    })
                })

    
        

        // await this.setState({rewardsCredited:false})

        // const events = await this.state.ReferralContract.methods.accounts(this.state.account).call()

       
        
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
{/* 
                            {
                                (this.state.WhiteListed) ? 
                                ( */}
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
                            
                                                            
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default FormPremade;
