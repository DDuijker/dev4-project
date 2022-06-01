export function register({data}) {
    //check if form is filled

    // Check if passwords match
    if (getValue("password2") !== getValue("confirm")) {
        console.log("Wachtwoorden komen niet overeen");
    }

    console.log(data)

    // submit data to API
    api("/register", "POST", data).then((res) => {
        if (res.message === "succes") {
            alert("user created");
        }
    });
}

function getValue(id) {
    let element = document.getElementById(id);
    if (element) {
        return element.value;
    }
    return "";
}

function api(endpoint, method = "GET", data = {}) {
    const API = "http://localhost:5000/";
    console.log("APi:" + API + endpoint)
    return fetch(API + endpoint, {
        method: method,
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            // Authorization: "Bearer " + getCookie("token"),
        },
        body: method === "GET" ? null : JSON.stringify(data),
    }).then((res) => res.json());
}
