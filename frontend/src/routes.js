import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Register from './pages/Register';
import Leads from './pages/Leads';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Register} path="/" exact />
      <Route component={Leads} path="/leads" />
    </BrowserRouter>
  )
}

export default Routes;