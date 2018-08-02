export default (users, text) => users.filter(user => user.username.match(new RegExp(text, 'i')));
