import React from "react";
import Staff from "./Staff";

function StaffData() {
    const [staff, setStaff] = React.useState(null);

    React.useEffect(() => {
        function getData() {
            fetch("http://localhost:5000/")
                .then((response) => response.json())
                .then((data) => {
                    setStaff(data.medewerkers);
                });
        }

        function getStaff() {
            fetch("http://localhost:5000/home")
                .then((res) => res.json())
                .then((data) => {
                    setStaff(data.medewerkers);
                });
        }

        getData();
        getStaff();
    }, []);

    if (!staff) {
        return null;
    }

    //map through the staff and get
    const staffData = staff.map((medewerker) => {
        return (
            <Staff
                key={medewerker.id}
                photo={require(`../images/${medewerker.foto}`)}
                firstname={medewerker.voornaam}
                infix={medewerker.tussenvoegsel}
                lastname={medewerker.achternaam}
                title={medewerker.titel}
                description={medewerker.beschrijving}
            />
        );
    });

    return <div className="medewerkers--info">{staffData}</div>;
}

export default StaffData;
