//gebruik dit bestandje als je data mee moet geven aan een query in queries.py

export function register(data) {
    //check if form is filled
    if (data.email === "" || data.password === "" || data.firstname === "" || data.lastname === "") {
        alert("Vul alle velden in");
        return;
    }
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

export function login(data, setLogin, setError) {
    console.log(data.email);
    //check if form is filled
    if (data.email === "" || data.password === "") {
        alert("Vul alle velden in");
    }
    // submit data to API
    api("login", "POST", data).then((res) => {
        console.log(res);
        if (res.message === "success") {
            setLogin(true);
            alert("U bent ingelogd")
            //redirect to home page
            // window.location.href = "/";
        } else if (res.error === "wrong password") {
            setError("Wachtwoord is incorrect");
        } else if (res.error === "user not found") {
            setError("Gebruiker niet gevonden");
        } else {
            setError("Er is iets fout gegaan");
        }
    });
}

export function logout(setLogin) {
    api('logout', "GET",).then((res) => {
        if (res.message === "success") {
            alert("u bent uitgelogd")
            setLogin(false);
        }
    })
}

function api(endpoint, method = "GET", data = {}) {
    const API = "http://localhost:5000/";
    console.log("API:" + API + endpoint);
    return fetch(API + endpoint, {
        method: method,
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            //Authorization: "Bearer " + getCookie("token"),
        },
        body: method === "GET" ? null : JSON.stringify(data),
    }).then((res) => res.json());
}
