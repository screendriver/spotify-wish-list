import 'purecss';

import Inferno, { render } from 'inferno';
import { Provider } from 'inferno-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import thunk from 'redux-thunk';

import './styles/main.scss';

import App from './components/App';
import rootReducer from './reducers';

const middlewares = [thunk];

function renderRoot() {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
}

if (process.env.NODE_ENV === 'production') {
  renderRoot();
} else {
  System
    .import('inferno-devtools')
    .then(() => System.import('redux-logger'))
    .then((createLogger) => {
      middlewares.push(createLogger());
      renderRoot();
    });
}
