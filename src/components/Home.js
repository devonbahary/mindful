import React from 'react';

const Home = () => (
    <div>
        <h1>React-Redux Starter Template</h1>
        <h3>This is my starting template for a React project!</h3>
        <ul>
            <li><em>Redux</em></li>
            <a href='https://github.com/zalmoxisus/redux-devtools-extension'><li>Redux DevTools Extension</li></a>
            <li>React Router</li>
            <li>SASS</li>
            <a href='https://necolas.github.io/normalize.css/'><li>Normalize.css</li></a>
            <li>Webpack configured for development</li>
            <li>Babel plugins:</li>
            <ul>
                <a href='https://babeljs.io/docs/plugins/transform-class-properties/'><li>Class properties transform</li></a>
                <a href='https://babeljs.io/docs/plugins/transform-object-rest-spread/'><li>Object rest spread transform</li></a>
            </ul>
            <li><a href='https://facebook.github.io/jest/en/'>Jest</a> testing w/<a href='http://airbnb.io/enzyme/'>Enzyme and ready file structure</a></li>
        </ul>
    </div>
);

export default Home;
