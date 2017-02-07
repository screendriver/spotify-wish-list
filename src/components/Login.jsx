import Inferno from 'inferno';
import Component from 'inferno-component';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      remember: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { target } = event;
    if (target === this.emailInput) {
      this.setState({ email: target.value });
    } else if (target === this.passwordInput) {
      this.setState({ password: target.value });
    } else if (target === this.rememberCheckBox) {
      this.setState({ remember: target.checked });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password, remember } = this.state;
    this.props.onLogin(email, password, remember);
  }

  render() {
    return (
      <form className="pure-form" onSubmit={this.handleSubmit}>
        <fieldset>
            <legend>Please login first</legend>
            <input
              type="email"
              placeholder="Email"
              value={this.state.email}
              ref={(input) => { this.emailInput = input; }}
              onInput={this.handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              value={this.state.password}
              ref={(input) => { this.passwordInput = input; }}
              onInput={this.handleChange}
            />
            <label htmlFor="remember">
                <input
                  id="remember"
                  type="checkbox"
                  checked={this.state.remember}
                  ref={(input) => { this.rememberCheckBox = input; }}
                  onClick={this.handleChange}
                /> Remember me
            </label>
            <button
              type="submit"
              className="pure-button pure-button-primary">
              Sign in
            </button>
        </fieldset>
      </form>
    );
  }
}

export default Login;
