import test from 'ava';
import { login } from '../../src/actions';

test('login action', (t) => {
  const expected = {
    type: 'LOGIN',
    username: 'foo',
    password: 'bar',
    remember: true,
  };
  const actual = login('foo', 'bar', true);
  t.deepEqual(actual, expected);
});
