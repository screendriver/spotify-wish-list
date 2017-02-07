export function login(username, password, remember) {
  return {
    type: 'LOGIN',
    username,
    password,
    remember,
  };
}

export function save() {

}
