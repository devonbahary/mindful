export default (topics, text) => topics.filter(topic => topic.name.match(new RegExp(text, 'i')));
