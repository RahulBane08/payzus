import General from 'views/general/Dashboard/General.jsx';
 
import GetDetails from 'views/general/Forms/GetDetails.jsx'
import FormPremade from 'views/general/Forms/Premade.jsx'; 

import UITables from 'views/general/Tables/Tables.jsx';
/*import UIDatatables from 'views/general/Tables/Datatables.jsx';*/

/*import UIDatagridsort from 'views/general/Tables/Datagridsort.jsx';*/
import UIBSDatatable from 'views/general/Tables/BSDatatable.jsx';



var BASEDIR = "/app"

var dashRoutes = [

    { path: BASEDIR+"/dashboard", name: "Dashboard", icon: "speedometer", component: General },


    { path: BASEDIR+"/history", name: "history", icon: "chart", component: UITables },

    { path: BASEDIR+"/market", name: "Market", icon: "speedometer", component: UIBSDatatable },

    { path: BASEDIR+"/kyc", name: "KYC", icon: "speedometer", component: GetDetails },

    { path: BASEDIR+"/buy-payzus", name: "Buy Payzus", icon: "speedometer", component: FormPremade },



   

    { redirect: true, path: BASEDIR+"/", pathTo: BASEDIR+"/dashboard", name: "Dashboard" },
    { redirect: true, path: "/", pathTo: BASEDIR+"/dashboard", name: "Dashboard" }

];
export default dashRoutes;
