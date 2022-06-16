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

export function login(data, setError) {
    //check if form is filled
    if (data.email === "" || data.password === "") {
        setError("Vul alle velden in");
        return;
    }
    // submit data to API
    apiWithoutToken("login", "POST", data).then((res) => {
        console.log('---', res);
        if (res.message === "success") {
            setCookie("name", res.user.firstname, 999)
            setCookie("token", res.token, 999)
            console.log('++++')
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

export function logout() {
    console.log('logout')
    deleteCookie("token")
    deleteCookie("name")
}


// Cookie functions stolen from w3schools (https://www.w3schools.com/js/js_cookies.asp)
function deleteCookie(cname) {
    document.cookie = cname + '=; Max-Age=0'
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//make a function to get the cookie
export function getCookie(name) {
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

function apiWithoutToken(endpoint, method = "GET", data = {}) {
    const API = "http://localhost:5000/";
    console.log("API:" + API + endpoint);
    return fetch(API + endpoint, {
        method: method,
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: method === "GET" ? null : JSON.stringify(data),
    }).then((res) => res.json());
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
