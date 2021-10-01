import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

import App from './App';
import SplashScreen from './components/SplashScreen';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <PersistGate
        loading={<SplashScreen />}
        persistor={persistor}
        onBeforeLift={() => new Promise((resolve) => setTimeout(resolve, 3000))}
      >
        <Provider store={store}>
          <App />
        </Provider>
      </PersistGate>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
