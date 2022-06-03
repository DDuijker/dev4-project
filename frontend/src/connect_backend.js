export function register(data) {
    //check if form is filled

    // Check if passwords match
    if (data.password !== data.confirmpassword) {
        console.log("Wachtwoorden komen niet overeen");
    }

    // submit data to API
    api("register", "POST", data).then((res) => {
        if (res.message === "succes") {
            alert("user created");
        }
    });
}

export function login(data) {
    //check email
    //check password
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
