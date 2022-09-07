import React from "react";
import LogInIndex from "../pages/LogIn/logInIndex";
import {Route,Routes} from "react-router-dom";
import UserRegistration from "../pages/UserRegistration/userRegistration";
import DashBoard from "../pages/DashBoard/dashboard/dashBoard";
import ProductManage from "../pages/DashBoard/ProductManage/productManage";
import CartManage from "../pages/DashBoard/CartManage/cartManage";


function App() {
  return (
      <Routes>
          <Route exact path='/' element={ <LogInIndex/>}/>
          <Route path='/userRegistration' element={ <UserRegistration/>}/>
          <Route path='/dashBoard' element={ <DashBoard/>}/>
          <Route path='/productManage' element={ <ProductManage/>}/>
          <Route path='/cartManage' element={ <CartManage/>}/>
      </Routes>

  );
}

export default App;
