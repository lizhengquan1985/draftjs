import React, {Component} from 'react';
import logo from './logo.svg';
import RichEditor from './RichEditor';
import CustomImageEditor from './CustomImageEditor';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                {/*<CustomImageEditor/>*/}
                <RichEditor initialValue="<p>ddd</p>" onChange={(html) => {
                    console.log(3333333333333, html)
                }}/>
            </div>
        );
    }
}

export default App;
