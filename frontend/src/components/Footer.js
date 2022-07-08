import React from "react";
import "../css/footer.css";

export default function Footer() {
    return (
        <div className={"footer"}>
            <p className={"footerText"}>Adres: Marktplein 2, Amsterdam, Nederland</p>
            <p className={"footerText"}>
                Telefoonnummer: 0621364882 <span> ○ </span> Email: gitpub@gmail.com
            </p>
        </div>
    );
}
