import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
        <Provider store={store}>
          {/* <FirebaseProvider> */}
          {/* <ReactReduxFirebaseProvider {...rrfProps}> */}
          <App />
          {/* </ReactReduxFirebaseProvider> */}
          {/* </FirebaseProvider> */}
        </Provider>
      </PersistGate>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
