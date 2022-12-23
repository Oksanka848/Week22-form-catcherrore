
button.addEventListener(
  "click",
  function () {
    check()
    myFunction()
  },

  class Cat {
    constructor(name, breeds, food, sex) {
      this.name = name;
      this.breeds = breeds;
      this.food = food;
      this.sex = sex;
    }

    mycatname = document.getElementById("name").value;
    breed = document.getElementById("breeds").value;
    catfoods = Array.from(
      document.querySelectorAll('input[name="food"]:checked')
    );
    mycatfood = catfoods.map((item) => item.value);
    catsex = Array.from(document.querySelectorAll('input[name="sex"]:checked'));
    mycatsex = catsex.map((item) => item.value);
    mycat = new Cat(mycatname, breed, mycatfood, mycatsex);
    mycat = console.log(mycat);
  }
);

function myFunction() {
  let message, x;
  message = document.getElementById("error_name");
  message.innerHTML = "";
  x = document.getElementById("name").value;
  try {
      if(x == "") throw "пусто";
      
      if(x.length < 2) throw "слишком коротко";
      if(x.length > 15) throw "слишком много буков)";
  }
  catch(err) {
      message.innerHTML += "Ошибка: " + err + ".";
  }
  finally {
      document.getElementById("name").value;
  }
}

function check() {
  document.getElementById("error").innerHTML = " ";
  let catfoods = Array.from(
    document.querySelectorAll('input[name="food"]:checked')
  );
  let mycatfood = catfoods.map((item) => item.value);
  if (mycatfood.length == 0) {
    document.getElementById("error").innerHTML +=
      "выберите хотя бы один вариант <br>";
  } else {
    sentIt();
  }
}

function sentIt() {
  let e = window.event;

  e.preventDefault();

  fetch("https://httpbin.org/post", {
    method: "POST",
    body: new FormData(form),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  })
  .then((response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error
    }
})
/*.then((response) => {
  if (response.headers['method'] !== 'DELETE') {
      let error = new Error('Не тот метод');
      error.response = response;
      throw error
  }
  return response;
})
.then((response) => {
    if (response.headers['content-type'] !== 'application/json') {
        let error = new Error('Некорректный ответ от сервера');
        error.response = response;
        throw error
    }
    return response;
})*/
    .then((response) => response.json())
    .then((mycat) => {
      console.log(mycat);
    })
    .catch((error) => console.log(error));
}
