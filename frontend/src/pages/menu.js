import React from "react";
import "../css/menu.css";
import MenuBox from "../components/MenuBox";

export default function Menu() {
    const [menuItems, setMenuItems] = React.useState([])

    React.useEffect(function () {
        async function fetchData() {
            fetch("http://localhost:5000/menu")
                .then((response) => response.text())
                .then((data) => {
                    setMenuItems(data)
                })
        }
    }, [])


    return (
        <div>
            <h1 className={"menu--title"}>Ons Menu</h1>
            <p className={"menu--title2"}>Onze gerechten</p>
            <div className={"menu"}>
                <MenuBox categorie={"Voorgerecht"}/>
                <MenuBox categorie={"Hoofdgerecht"}/>
                <MenuBox categorie={"Nagerecht"}/>
                <MenuBox categorie={"Bijgerecht"}/>
                <MenuBox categorie={"Dranken"}/>
            </div>
        </div>
    );
}
