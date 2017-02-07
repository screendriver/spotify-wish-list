import 'purecss';

import Inferno, { render } from 'inferno';
import { Provider } from 'inferno-redux';
import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';

import './styles/main.scss';

import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers, devToolsEnhancer());

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
