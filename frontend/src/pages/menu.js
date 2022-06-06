import React, {useState, useEffect} from "react";
import "../css/menu.css";
import MenuBox from "../components/MenuBox";

export default function Menu() {
    const [menuItems, setMenuItems] = useState(null)

    useEffect(function () {
        async function getData() {
            console.log('ok')
            fetch("http://localhost:5000/menu")
                .then((response) => response.json())
                .then((data) => {
                    setMenuItems(data.menu)
                    console.log(data)
                })
        }

        getData();
    }, [])

    //loop through the data.menu or menuItems and then
    //for every menu item (voorgerecht, hoofdgerecht) make a menu box

    if (!menuItems) {
        return null
    }

    console.log(menuItems.voorgerechten)
    return (
        <div>
            <h1 className={"menu--title"}>Ons Menu</h1>
            <p className={"menu--title2"}>Onze gerechten</p>
            <div className={"menu"}>
                <MenuBox key={0} category={"Voorgerecht"} data={menuItems.voorgerechten}/>
                <MenuBox key={1} category={"Hoofdgerecht"} data={menuItems.hoofdgerechten}/>
                <MenuBox key={3} category={"Bijgerecht"} data={menuItems.bijgerechten}/>
                <MenuBox key={2} category={"Nagerecht"} data={menuItems.nagerechten}/>
                <MenuBox key={4} category={"Dranken"} data={menuItems.dranken}/>
            </div>
        </div>
    );
}
