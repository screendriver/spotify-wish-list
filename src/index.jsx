import 'purecss';

import Inferno, { render } from 'inferno';
import { Provider } from 'inferno-redux';
import { createStore } from 'redux';

import './styles/main.scss';

import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
