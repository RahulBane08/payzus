import React from 'react';
import {
    Table ,
    Row, Col,
} from 'reactstrap';

import {
    
} from 'components';
import firebaseApp from '../../../firebase-config';
import { Link } from 'react-router-dom';

const database = firebaseApp.database().ref("Users");

class UITables extends React.Component{
   constructor(props){
     super(props);
     this.state = {
       isAvailable:true,
       uid:"",
       txArray:{},
       count:0,
       array:[]
     }
   }

   componentDidMount = async () => {
      // const user = await firebaseApp.auth().currentUser
      // const uid = user.uid;
      await this.setState({uid:this.props.uid});
      console.log("uid",this.props.uid) 

      await database
              .child(this.state.uid + '/Transactions')
              .once('value', snapshot => {
                this.setState({txArray:snapshot.val()})
              });
              console.log(this.state.txArray)
          
   }

   setArray = () => {

    const Items = [];

    Object.entries(this.state.txArray).map(([key,object]) => {

      Object.entries(object).map(([token,value]) => {
        // alert(`${token} : ${value}`);
        Items.push(value)
        
      })
     })

     return(
      Items.reverse().map((item) => 
        <tr>
          <th>.</th>
          <th><a target="_blank" href={'https://ropsten.etherscan.io/tx/'+item}>{item}</a></th>
        </tr>
      )
    )
   }
    
    render(){
        return (
            <div>
                <div className="content">
                    <Row>
                        <Col xs={12} md={12}>

                    <div className="page-title">
                        <div className="float-left">
                            <h1 className="title">Transaction History</h1>
                        </div>
                    </div>


                          

                    <div className="col-12">
                        <section className="box ">
                            <header className="panel_header">
                                <h2 className="title float-left"></h2>
                                
                            </header>
                            <div className="content-body">
                                <div className="row">
                                    <div className="col-lg-12">
                            
  
      <h5>All recent transactions</h5><br/>

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Transaction Hash</th>
            {/* <th>Last Name</th>
            <th>Username</th> */}
          </tr>
        </thead>
        <tbody>
         {
          this.setArray()
         }
          
        </tbody>
      </Table>  
     

      
                               

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

export default UITables;
