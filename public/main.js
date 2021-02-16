function closeNav() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("cls1").style.display = "none";
  document.getElementById("open1").style.display = "block";
}
function openNav() {
  document.getElementById("menu").style.display = "block";
  document.getElementById("cls1").style.display = "block";
  document.getElementById("open1").style.display = "none";
  document.querySelector(".logo").style.marginTop = "-28px";
  document.querySelector(".logo").style.marginLeft = "35px";
}

function appendinfo(name, msg) {
  var div1 = document.createElement("div");
  var h5ele = document.createElement("h5");
  var h6ele = document.createElement("h6");
  div1.classList.add("review");
  h5ele.appendChild(name);
  h6ele.appendChild(msg);
  div1.appendChild(h5ele);
  div1.appendChild(h6ele);
  document.querySelector(".reviewarea").appendChild(div1);
}

$.ajax({
  url: "/data",
  type: "GET",
  success: (response) => {
    response.map((item) => {
      var name = document.createTextNode(item.name);
      var msg = document.createTextNode(item.msg);
      appendinfo(name, msg);
    });
  },
});

function postReview() {
  let name = document.getElementById("name").value;
  console.log(name);
  let reviewtext = document.getElementById("review-area").value;
  let url = "/postreview";
  $.ajax({
    url: url,
    data: {
      name: name,
      msg: reviewtext,
    },
    type: "POST",
    dataType: "json",
    success: (response) => {
      console.log(response);
      response.map((item) => {
        var name = document.createTextNode(item.name);
        var msg = document.createTextNode(item.msg);
        appendinfo(name, msg);
      });
    },
    error: () => {
      alert("error");
    },
  });

  console.log("this is for posting");
}
