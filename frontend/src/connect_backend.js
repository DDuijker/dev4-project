export function register(data) {
  //check if form is filled
  if (
    data.email === "" ||
    data.password === "" ||
    data.firstname === "" ||
    data.lastname === ""
  ) {
    alert("Vul alle velden in");
    return;
  }
  // Check if passwords match
  if (data.password !== data.confirmpassword) {
    alert("Wachtwoorden komen niet overeen");
  }
  // submit data to API
  apiWithoutToken("register", "POST", data).then((res) => {
    if (res.message === "success") {
      alert("user created");
    }
  });
}

export function login(data, setError, medewerker) {
  //check if form is filled
  if (data.email === "" || data.password === "") {
    setError("Vul alle velden in");
    return;
  }
  //if it's a user, get a user and a name token
  if (!medewerker) {
    // submit data to API
    apiWithoutToken("login", "POST", data).then((res) => {
      if (res.message === "success") {
        setCookie("name", res.user.firstname, 999);
        setCookie("token", res.token, 999);
        setCookie("user_id", res.user.id, 999);
        window.location.href = "/";
      } else if (res.error === "wrong password") {
        setError("Wachtwoord is incorrect");
      } else if (res.error === "user not found") {
        setError("Gebruiker niet gevonden");
      } else {
        setError("Er is iets fout gegaan");
      }
    });
  } else {
    //submit medewerker data to API
    apiWithoutToken("login_medewerker", "POST", data).then((res) => {
      if (res.message === "success") {
        setCookie("staff_token", res.staff_token, 999);
        setCookie("staff", res.staff, 999);
        //setCookie("staffname", res.staff.firstname, 999)
        window.location.href = "/tables";
      } else if (res.error === "wrong password") {
        setError("Wachtwoord is incorrect");
      } else if (res.error === "Medewerker not found") {
        setError("Medewerker niet gevonden");
      }
    });
  }
}

export default function get_tables(setTables) {
  // I still need to check if the user is a staff member
  return apiStaff("tables", "GET").then((res) => {
    if (res.message === "success") {
      setTables(res.tables);
    } else {
      return null;
    }
  });
}

export function add_table(data) {
  //check if form is filled
  if (
    data.aantal_personen === "" ||
    data.locatie === "" ||
    data.verdieping === "" ||
    data.type_zitting === ""
  ) {
    alert("Vul alle velden in");
    return;
  }
  // submit data to API
  apiStaff("tables", "POST", data).then((res) => {
    if (res.message === "success") {
      alert("table created");
      //refresh the page
      window.location.href = "/tables";
      console.log(res);
    }
  });
}

export function patch_table(data) {
  console.log(data);
  apiStaff("tables", "PATCH", data).then((res) => {
    if (res.message === "success") {
      //refresh the page
      window.location.href = "/tables";
      alert("Table updated");
      console.log(res);
    }
  });
}

export function delete_table(data) {
  // first do a check if there are any reservations on this table

  apiWithoutToken("get_one_table", "GET", data).then((res) => {
    if (res.message === "success") {
      if (res.table) {
        alert("Er zijn nog reservaties op deze tafel");
        return;
      } else {
        apiStaff("tables", "DELETE", data).then((res) => {
          if (res.message === "success") {
            //refresh the page
            window.location.href = "/tables";
            alert("Table deleted");
            //reload the table data
            get_tables();
          }
        });
      }
    }
  });
}

export function getMyReservations(setReservations) {
  // get token from cookie
  const token = getCookie("token");

  if (token) {
    // get user reservations
    apiUser("myreservations", "GET").then((res) => {
      if (res.message === "success") {
        setReservations(res.reservations);
      }
    });
  } else {
    window.location.href = "/login";
  }
}

// Cookie functions stolen from w3schools (https://www.w3schools.com/js/js_cookies.asp)
export function logout() {
  deleteCookie("token");
  deleteCookie("name");
  deleteCookie("staff_token");
  deleteCookie("staff");
  window.location.href = "/";
}

export function reservation(data) {
  //add user id to the data
  data.token = getCookie("token");
  //submit data to API
  apiUser("reservation", "POST", data).then((res) => {
    if (res.message === "success") {
      alert("Reservering aangemaakt");
    }
  });
}

// Cookie funtions
// Cookie funtions
function deleteCookie(cname) {
  document.cookie = cname + "=; Max-Age=0";
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
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
    return cookieValue;
  }
}

// Api functions
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

function apiUser(endpoint, method = "GET", data = {}) {
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

function apiStaff(endpoint, method = "GET", data = {}) {
  const API = "http://localhost:5000/";
  console.log("API:" + API + endpoint);
  return fetch(API + endpoint, {
    method: method,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("staff_token"),
    },
    body: method === "GET" ? null : JSON.stringify(data),
  }).then((res) => res.json());
}
