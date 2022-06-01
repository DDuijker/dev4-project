import React from 'react';

function MenuBox({categorie, naam, beschrijving, prijs}) {
    //geef de categorie mee
    //op basis daarvan laad je een menu box in met de items

    return (
        <div className={"menu--box"}>
            <h2>{categorie}</h2>
            <ul>
                <li></li>
            </ul>
        </div>
    );
}

export default MenuBox;


