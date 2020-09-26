import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import UserSetup from './userSetup';
import axios from 'axios';
import Storage from './utilities/localStorage';
import BackOffice from './backoffice';
import CreateVoucher from './backoffice/evoucher';
import VoucherList from './backoffice/voucherlist';
import ProductDetail from './components/products/detail';

const token = Storage(localStorage).get('token');
if (token){
  axios.defaults.headers.common['Authorization'] = token;
}

function App() {
  return (
    <Router >
      <Switch>
        <Route exact path="/" component={Home}/>     
        <Route exact path="/login" component={Login}/>
        <Route exact path="/user/setup" component={UserSetup} />
        <Route exact path="/backoffice" component={BackOffice} />
        <Route exact path="/backoffice/create" component={CreateVoucher} />
        <Route exact path="/backoffice/list" component={VoucherList} />
        <Route exact path="/product/detail/:id" component={ProductDetail} />
      </Switch>
    </Router>
  );
}

export default App;
