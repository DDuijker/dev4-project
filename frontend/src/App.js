// Importing modules
import React, {useState, useEffect} from "react";
import "./App.css";

function App() {
    const [voorbeeld, setVoorbeeld] = useState();

    // Using useEffect for single rendering
    useEffect(() => {
        // Using fetch to fetch the api from 
        // flask server it will be redirected to proxy
        fetch("/").then((res) =>
            res.json().then((data) => {
                console.log(data)
                return setVoorbeeld(data)
            })
        );
    }, []);

    return (
        <div className="App">
            <h1>{voorbeeld}</h1>
        </div>
    );
}

export default App;