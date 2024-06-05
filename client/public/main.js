import forgetPassword from "../assetes/pages/forgetpass.js";
import signIn from "../assetes/pages/sign.js";

const body = document.querySelector("body");
// btnSubmit.addEventListener("click", () => {
//   let resultEmail = false;
//   let resultPassword = false;
//   if (!userInput.value && !emailInput.value && !passInput.value) {
//     alert("your form is empty , please fill it");
//     return;
//   } else if (!userInput.value) {
//     alert("please fill username");
//     return;
//   } else if (!emailInput.value) {
//     alert("please fill email");
//     return;
//   } else if (!passInput.value) {
//     alert("please fill password");
//     return;
//   }
//   if (emailInput.value) {
//     if (passInput.value) {
//       resultEmail = checkemail();
//       resultPassword = checkPassword(passInput.value);
//       if (resultPassword && resultEmail) {
//         saveItems();
//         return;
//       }
//     }
//   }
//   if (
//     userInput.value &&
//     emailInput.value &&
//     resultEmail &&
//     resultPassword &&
//     passInput.value
//   ) {
//     saveItems();
//   }
// });
function checkemail(email) {
  let testresults = false;
  let str = email;
  let filter =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  if (filter.test(str)) testresults = true;
  else {
    alert("Please input a valid email address!");
    testresults = false;
  }
  return testresults;
}
function saveItems(userInput, emailInput, passInput) {
  if (userInput && emailInput && checkemail(emailInput) && passInput) {
    console.log(userInput, " ", emailInput, " ", passInput);
    const email = emailInput;
    const userN = userInput;
    const pass = passInput;
    let user = {
      user: userN,
      email: email,
      pass: pass,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      isChanged: false,
    };
    const savedUsers = getAllUsers();
    existUsers(userN, email, pass, user);
  }
}
function existUsers(user, email, pass, newUser) {
  const usersLocal = getAllUsers();
  const userResult = usersLocal.find((u) => u.user === user);
  const emailResult = usersLocal.find((u) => u.email === email);
  if (!userResult && !emailResult) {
    saveUser(newUser);
    email = "";
    user = "";
    pass = "";
    alert("your information regestred , welcome to my page");
  } else {
    email = "";
    user = "";
    pass = "";
    alert("username or password is wrong...");
  }
}
function getAllUsers() {
  const savedUsers = JSON.parse(localStorage.getItem("infoUsers")) || [];
  return savedUsers;
}
function saveUser(user) {
  const savedUsers = getAllUsers();
  savedUsers.push(user);
  localStorage.setItem("infoUsers", JSON.stringify(savedUsers));
  return savedUsers;
}
function saveAllUsers(users) {
  localStorage.setItem("infoUsers", JSON.stringify(users));
}
function checkPassword(password) {
  const passw = /^[A-Za-z]\w{7,14}$/;
  if (password.match(passw)) {
    alert("Correct password");
    return true;
  } else {
    alert("Wrong password...!");
    return false;
  }
}

function router(params) {
  const routers = [
    {
      path: "/public/forget-password",
      view: forgetPassword,
    },
    {
      path: "/public/",
      view: signIn,
    },
  ];
  const potentioalRuters = routers.map((item) => {
    return {
      route: item,
      isMatch: location.pathname === item.path,
    };
  });
  let match = potentioalRuters.find((route) => route.isMatch);
  if (!match) {
    match = {
      route: {
        path: "/not-found",
        view: () => console.log("not found page"),
      },
      isMatch: true,
    };
  }
  body.innerHTML = match.route.view();
  if (location.pathname === "/public/") {
    const userInput = document.querySelector("#uername");
    const emailInput = document.querySelector("#email");
    const passInput = document.querySelector("#password");
    const btnSubmit = document.querySelector("#btn-submit");

    btnSubmit.addEventListener("click", () => {
      let resultEmail = false;
      let resultPassword = false;
      if (!userInput.value && !emailInput.value && !passInput.value) {
        alert("your form is empty , please fill it");
        return;
      } else if (!userInput.value) {
        alert("please fill username");
        return;
      } else if (!emailInput.value) {
        alert("please fill email");
        return;
      } else if (!passInput.value) {
        alert("please fill password");
        return;
      }
      if (emailInput.value) {
        if (passInput.value) {
          resultEmail = checkemail(emailInput.value);
          resultPassword = checkPassword(passInput.value);
          if (resultPassword && resultEmail) {
            saveItems(userInput.value, emailInput.value, passInput.value);
            return;
          }
        }
      }
      if (
        userInput.value &&
        emailInput.value &&
        resultEmail &&
        resultPassword &&
        passInput.value
      ) {
        saveItems(userInput.value, emailInput.value, passInput.value);
      }
    });
  } else if (location.pathname === "/public/forget-password") {
    const btnConfirm = document.querySelector("#btn-confirm");
    const emailInput = document.querySelector("#email");
    btnConfirm.addEventListener("click", () => {
      if (!emailInput.value) {
        alert("enter email");
        return;
      } else {
        const allUsersLocal = getAllUsers();
        console.log(allUsersLocal);
        const availableUsers = allUsersLocal.find(
          (user) => user.email === emailInput.value
        );
        if (availableUsers) {
          sendEmail(emailInput.value, availableUsers.user, availableUsers.pass);
          availableUsers.isChanged = true;
          saveAllUsers(allUsersLocal);
          emailInput.value = "";
          console.log(availableUsers.pass);
          alert("code send your email");
        } else if (!availableUsers) {
          availableUsers.isChanged = false;
          alert("your email is not found");
        }
      }
    });
  }
  function sendEmail(email, name, password) {
    let templateParams = {
      name: name,
      email: email,
      message: codeEmail(),
    };
    function codeEmail() {
      let val = Math.floor(1000 + Math.random() * 9000);
      return val;
    }
    password = codeEmail();
    const serviceId = "service_qdhu9rn";
    const templeteId = "template_tf7f37h";
    emailjs
      .send(serviceId, templeteId, templateParams)
      .then((response) => {
        email = "";
        alert("SUCCESS!", response.status, response.text);
      })
      .catch((err) => {
        alert("FAILED...", err);
      });
  }
  // console.log(match.route.view());
}

// push user to new url

// it wants to transfer new routers

window.addEventListener("popstate", router);
function navigateTo(url) {
  history.pushState(null, null, url); //user transfer new page
  router();
}
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.hasAttribute("data-link")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});
