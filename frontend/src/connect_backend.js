
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

export function login(data, setLogin, setError, setUser) {
    console.log(data.email);
    //check if form is filled
    if (data.email === "" || data.password === "") {
        alert("Vul alle velden in");
        return;
    }
    // submit data to API
    api("login", "POST", data).then((res) => {
        console.log(res);
        if (res.message === "success") {
            setLogin(true);
            setUser(res.user);
            console.log(res.user);
            alert("U bent ingelogd")
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
    api("logout", "POST").then((res) => {
        if (res.message === "success") {
            setLogin(false);
            alert("U bent uitgelogd");
            //redirect to home page
            window.location.href = "/";

        }
    });
}

//make a function to get the cookie
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie) {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    console.log(cookieValue);
    return cookieValue;
}

function api(endpoint, method = "GET", data = {}) {
    const API = "http://localhost:5000/";
    console.log("API:" + API + endpoint);
    return fetch(API + endpoint, {
        method: method,
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
        body: method === "GET" ? null : JSON.stringify(data),
    }).then((res) => res.json());
}
