import 'purecss';
import Inferno, { render } from 'inferno';

import './styles/main.scss';

const MyComponent = () => (
  <div>MyComponent</div>
);

render(<MyComponent />, document.getElementById('root'));
