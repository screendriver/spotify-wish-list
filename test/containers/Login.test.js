import test from 'ava';
import sinon from 'sinon';
import { mapDispatchToProps } from '../../src/containers/Login';

test('<Login /> container mapDispatchToProps onLogin', (t) => {
  const dispatch = sinon.spy();
  mapDispatchToProps(dispatch).onLogin('foo', 'bar', true);
  const expected = {
    type: 'LOGIN',
    username: 'foo',
    password: 'bar',
    remember: true,
  };
  const actual = dispatch.firstCall.args[0];
  t.deepEqual(actual, expected);
});
