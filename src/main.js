import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header';

class App extends React.Component {
    render() {
        return <div>
            <Header/>
            hello react
        </div>
    }
}

ReactDOM.render(<App/>, document.querySelector('#root'));

