import React from 'react';

function MenuItem({name, description, price}) {
    return (
        <div>
            <h4>{name} <span>{price}</span></h4>
            <p>{description}</p>
        </div>
    );
}

export default MenuItem;