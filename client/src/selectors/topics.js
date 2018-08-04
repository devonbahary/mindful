export default (topics, text) => topics.filter(topic => topic.title.match(new RegExp(text, 'i')));
