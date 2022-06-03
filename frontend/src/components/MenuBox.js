import React from 'react';
import '../css/menu.css'
import MenuItem from "./MenuItem";

function MenuBox({category, data}) {

    const dishes = data.map((dish, i) => {
        return <MenuItem
            key={i}
            name={dish.gerecht}
            description={dish.beschrijving}
            price={dish.prijs}
        />
    })


    return (
        <div className={"menu--box"}>
            <h2>{category}</h2>
            <ul>
                {/*<MenuItem name={data.gerecht} price={data.prijs} description={data.beschrijving}/>*/}
                {dishes}
            </ul>
        </div>
    );
}

export default MenuBox;


