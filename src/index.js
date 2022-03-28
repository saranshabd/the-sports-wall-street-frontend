/*!

=========================================================
* Vision UI Free Chakra - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-chakra
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-chakra/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import HomeLayout from "layouts/Home.js";

import * as serviceWorker from "serviceWorker";

import "utils/firebase";

const queryClient = new QueryClient();

function IndexComp() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Switch>
          <Route path={`/auth`} component={AuthLayout} />
          <Route path={`/admin`} component={AdminLayout} />
          <Route from={`/`} component={HomeLayout} />
        </Switch>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

ReactDOM.render(<IndexComp />, document.getElementById("root"));

// Unregister servive worker for the PWA
serviceWorker.unregister();
