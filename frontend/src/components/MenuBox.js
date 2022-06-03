import React from 'react';
import '../css/menu.css'
import MenuItem from "./MenuItem";

function MenuBox({category, data}) {

    // console.log(data[0].naam)

    //  const dishes = data.map((dish) => {
    //     return <MenuItem
    //         key={dish.item_id}
    //             name ={dish.naam}
    //             description={dish.beschrijving}
    //             price={dish.prijs}
    //     />
    // })


    return (
        <div className={"menu--box"}>
            <h2>{category}</h2>
            <ul>

            </ul>
        </div>
    );
}

export default MenuBox;


