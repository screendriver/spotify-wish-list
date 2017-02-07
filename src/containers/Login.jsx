import { connect } from 'inferno-redux';
import Login from '../components/Login';
import { login } from '../actions';

const mapStateToProps = () => {

};

export const mapDispatchToProps = dispatch => ({
  onLogin: (email, password, remember) => {
    dispatch(login(email, password, remember));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
