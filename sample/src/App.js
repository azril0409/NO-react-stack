import './App.css';
import {ZStack, Alignment} from "no-react-stack";
import React, {useEffect, useState} from "react";


function App() {
    const [show, setShow] = useState(false)
    const [cont, setCont] = useState(1)
    useEffect(() => {
        setTimeout(() => {
            setShow(true)
        }, 3000)
    }, [])
    return (<ZStack style={{height: '100vh', width: '100vw'}} alignment={Alignment.TOP_LEFT}>
        {
            show ? <div style={{height: '200px', width: '200px', backgroundColor: 'red'}}/> : undefined
        }
        <div style={{height: '150px', width: '150px', backgroundColor: 'green'}}/>
        <div style={{height: '100px', width: '100px', backgroundColor: 'blue'}} alignment={Alignment.BOTTOM_RIGHT}/>
        <div style={{height: '50px', width: '50px', backgroundColor: 'white'}}/>
    </ZStack>);
}

export default App;
