// Importing modules
import React, {useState, useEffect} from "react";
import "./App.css";
import Homepage from "./components/Homepage"

function App() {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch("/members").then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                console.log(data)
            }
        )
    }, [])

    return (
        <div className="App">
            <Homepage/>
            {data.members}
        </div>
    );
}

export default App;