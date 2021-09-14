import logo from './logo.svg';
import './App.css';
import {VStack, ZStack, Spacer} from "no-react-stack";

function App() {
    return (<VStack className="App App-header" style={{width: '100vw'}}>
            <Spacer/>
            <ZStack>
                <VStack>
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </VStack>
                <img src={logo} className="App-logo" alt="logo" />
            </ZStack>
            <Spacer/>
        </VStack>
    );
}

export default App;
