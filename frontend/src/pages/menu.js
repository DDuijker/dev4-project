import React, { useEffect, useState } from "react";
import "../css/menu.css";

export default function Menu() {
  //   const [data, setData] = useState([])
  //
  // useEffect(() => {
  //     fetch("/members").then(
  //         res => res.json()
  //     ).then(
  //         data => {
  //             setData(data)
  //             console.log(data)
  //         }
  //     )
  // }, [])

  return (
    <div>
      <h1 className={"menutitle"}>Ons Menu</h1>
      <p className={"menutitle2"}>Onze gerechten</p>
      <div className={"menukaart"}>
        <div className={"menubox"}>
          <h2>Voorgerecht</h2>
          <ul>
            <li>Carpaccio</li>
            <li>Soep</li>
            <li>Bruscetta</li>
            <li>Nacho's</li>
            <li>Sashimi</li>
            <li>Borrelplank</li>
            <li>Tartaar</li>
          </ul>
        </div>

        <div className={"menubox"}>
          <h2>Hoofdgerecht</h2>
          <ul>
            <li>Burger</li>
            <li>Kapsalon</li>
            <li>Spaghetti</li>
            <li>Kaasfondue</li>
            <li>Poke Bowl</li>
            <li>Biefstuk</li>
            <li>Zalm in soja/honing</li>
            <li>Kroket</li>
            <li>Geitenkaas met honing</li>
            <li>Kipsate</li>
            <li>Korean Fried Chicken</li>
            <li>Chili sin carne</li>
            <li>Brisket</li>
          </ul>
        </div>

        <div className={"menubox"}>
          <h2>Nagerecht</h2>
          <ul>
            <li>Cheesecake</li>
            <li>Brownie</li>
            <li>Creme Brulee</li>
            <li>Dame Blanche</li>
            <li>Fruit</li>
          </ul>
        </div>

        <div className={"menubox"}>
          <h2>Bijgerecht</h2>
          <ul>
            <li>Patat</li>
            <li>Salade</li>
            <li>Champignons</li>
            <li>Geroosterde groente</li>
          </ul>
        </div>

        <div className={"menubox"}>
          <h2>Dranken</h2>
          <ul>
            <li>Fris</li>
            <li>Water</li>
            <li>Wijn</li>
            <li>Bier</li>
            <li>Koffie</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
