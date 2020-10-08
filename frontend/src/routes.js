import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Register from './pages/Register';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Register} path="/" exact />
    </BrowserRouter>
  )
}

export default Routes;