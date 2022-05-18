import React from "react";
import Medewerker from "./Medewerker";
import Chef from "../images/chef.jpg";
import Manager from "../images/manager.jpg";
import Serveerster from "../images/serveerster.jpg";
import Barman from "../images/2barman.jpg";
import Souschef from "../images/souschef.jpg";

// eslint-disable-next-line no-unused-expressions
function medewerkerData() {
  return (
    <div className="medewerkers--info">
      <Medewerker
        medewerker="1"
        naam="Mark"
        titel="Functie: Chef"
        foto={Chef}
        ervaring="Ik werk hier nu 6 jaar als chef"
      />
      <Medewerker
        medewerker="2"
        naam="Mirjam"
        titel="Functie: Manager"
        foto={Manager}
        ervaring="Ik ben de manager van het restaurant voor 4 jaar in november"
      />
      <Medewerker
        medewerker="3"
        naam="Kate"
        titel="Functie: Serveerster"
        foto={Serveerster}
        ervaring="Ik ben hier vorig jaar begonnen als serveerster"
      />
      <Medewerker
        medewerker="4"
        naam="Jonathan"
        titel="Functie: Barman"
        foto={Barman}
        ervaring="Ik ben hier 3 jaar geleden begonnen als barman"
      />
      <Medewerker
        medewerker="5"
        naam="Sara"
        titel="Functie: Souschef"
        foto={Souschef}
        ervaring="Ik werk hier al 2 jaartjes als souschef"
      />
    </div>
  );
}

export default medewerkerData;
