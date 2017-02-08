import 'purecss';

import Inferno, { render } from 'inferno';
import { Provider } from 'inferno-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import thunk from 'redux-thunk';

import './styles/main.scss';

import App from './components/App';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

function renderRoot() {
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
  System.import('inferno-devtools').then(renderRoot);
}
