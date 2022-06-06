//gebruik dit bestandje als je data mee moet geven aan een query in queries.py

export function register(data) {
    //check if form is filled

    // Check if passwords match
    if (data.password !== data.confirmpassword) {
        alert("Wachtwoorden komen niet overeen");
    }

    // submit data to API
    api("register", "POST", data).then((res) => {
        if (res.message === "success") {
            alert("user created");
        }
    });
}

export function login(data, setLogin) {
    //check email
    //check password
    api('login', "GET", data).then((res) => {
        if (res.message === "success") {
            alert("u bent ingelogd")
            //change header to login
            setLogin(true)
        }
    })
}

function api(endpoint, method = "GET", data = {}) {
    const API = "http://localhost:5000/";
    console.log("APi:" + API + endpoint);
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
