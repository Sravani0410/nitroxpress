
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter} from "react-router-dom";

import './index.css';
import App from './App';
import "reactjs-popup/dist/index.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ToastProvider } from "react-toast-notifications";
import 'react-date-range/dist/styles.css';  
import 'react-date-range/dist/theme/default.css';
import { Provider } from "react-redux";
import store from "./Redux/store";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

// process.env.NODE_ENV === "production
//  && 
 Sentry.init({
  dsn: "https://65369594441045c9b88933bea38956c4@o4504439683022848.ingest.sentry.io/4504439686889472",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <Provider store={store}>
    <ToastProvider>
      <React.StrictMode>
        <BrowserRouter>
        <App />
        </BrowserRouter>
        
      </React.StrictMode>
    </ToastProvider>
  </Provider> 
);
