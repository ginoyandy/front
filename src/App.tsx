import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />

                <form action="">
                    <input type="file" onChange={this.uploadFile} />
                </form>
            </header>
        </div>
    );
}

export default App;
