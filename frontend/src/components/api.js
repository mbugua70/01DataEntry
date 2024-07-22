export async function loginUser(creds) {
  const res = await fetch("http://localhost:4040/api/v1/ba/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  });
  const data = await res.json();
  if (!res.ok) {
    throw {
      message: data.msg,
      statusText: res.statusText,
      status: res.status,
    };
  }
  return data;
}

export async function surveyForm(test) {

  const storeOne = localStorage.getItem("Auth");
  const storeTwo = JSON.parse(storeOne);
  const userId = storeTwo.user.userId;
  const res = await fetch("http://localhost:4040/api/v1/report", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-ID": userId,
    },
    body: JSON.stringify(test),
  });

  const data = await res.json();
  if (!res.ok) {
    console.log(data);
    throw {
      message: data.msg,
      statusText: res.statusText,
      status: res.status,
    };
  }
  return data;
}

export async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export async function getUserData() {
  const storeOne = localStorage.getItem("Auth");
  const storeTwo = JSON.parse(storeOne);
  const userResult = storeTwo.user;
  return userResult;
}