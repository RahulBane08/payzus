import General from 'views/general/Dashboard/General.jsx';
 
import GetDetails from 'views/general/Forms/GetDetails.jsx'
import FormPremade from 'views/general/Forms/Premade.jsx'; 

import UITables from 'views/general/Tables/Tables.jsx';
/*import UIDatatables from 'views/general/Tables/Datatables.jsx';*/

/*import UIDatagridsort from 'views/general/Tables/Datagridsort.jsx';*/
import UIBSDatatable from 'views/general/Tables/BSDatatable.jsx';
import ReferSomeone from "views/general/Forms/ReferSomeone.jsx";



var BASEDIR = "/app"

var dashRoutes = [

    { path: BASEDIR+"/dashboard", name: "Dashboard", icon: "speedometer", component: General },


    { path: BASEDIR+"/history", name: "History", icon: "layers", component: UITables },

    { path: BASEDIR+"/market", name: "Market", icon: "chart", component: UIBSDatatable },

    { path: BASEDIR+"/kyc", name: "KYC", icon: "puzzle", component: GetDetails },

    { path: BASEDIR+"/buy-payzus", name: "Buy Payzus", icon: "bag", component: FormPremade },

    { path: BASEDIR+"/refer", name: "Refer Someone", icon: "bag", component: ReferSomeone },

   

    { redirect: true, path: BASEDIR+"/", pathTo: BASEDIR+"/dashboard", name: "Dashboard" },
    { redirect: true, path: "/", pathTo: BASEDIR+"/dashboard", name: "Dashboard" }

];
export default dashRoutes;
