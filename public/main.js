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

function load(){
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
}
load()

function postReview() {
  let name = document.getElementById("name").value;
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
      var newname = document.createTextNode(name);
      var msg = document.createTextNode(reviewtext);
      appendinfo(newname,msg);
    },
    error: () => {
      alert("error");
    },
  });
}



function showList(){
  var row=document.getElementById("first-row")
  var pass=prompt("please enter Your password")
  closeNav()
  $.ajax({
    url:'/bookingList',
    method:'POST',
    data:{
      password:pass
    },
    success:(response)=>{
      response.map((item)=>{
        var length=Object.keys(item).length;
        if(length>5){
          var td1=document.createElement('td')
          var td2=document.createElement('td')
          var td3=document.createElement('td')
          var td4=document.createElement('td')
          var td5=document.createElement('td')
          var td6=document.createElement('td')
          var name=document.createTextNode(item.name)
          var work=document.createTextNode(item.work)
          var time=document.createTextNode(item.time)
          var place=document.createTextNode(item.place)
          var address=document.createTextNode(item.address)
          var number=document.createTextNode(item.number)
          td1.appendChild(name)
          td2.appendChild(work)
          td3.appendChild(time)
          td4.appendChild(place)
          td5.appendChild(number)
          td6.appendChild(address)
          row.appendChild(td1)
          row.appendChild(td2)
          row.appendChild(td3)
          row.appendChild(td4)
          row.appendChild(td5)
          row.appendChild(td6)
        }else{
          var td1=document.createElement('td')
          var td2=document.createElement('td')
          var td3=document.createElement('td')
          var td4=document.createElement('td')
          var td5=document.createElement('td')
          var name=document.createTextNode(item.name)
          var work=document.createTextNode(item.work)
          var time=document.createTextNode(item.time)
          var place=document.createTextNode(item.place)
          var number=document.createTextNode(item.number)
          td1.appendChild(name)
          td2.appendChild(work)
          td3.appendChild(time)
          td4.appendChild(place)
          td5.appendChild(number)
          row.appendChild(td1)
          row.appendChild(td2)
          row.appendChild(td3)
          row.appendChild(td4)
          row.appendChild(td5)
        }
        document.querySelector('.offer').style.display="none"
        document.querySelector('.featured').style.display="none"
        document.querySelector('.bridal').style.display="none"
        document.querySelector('.contact').style.display="none"
        document.querySelector('.reviews').style.display="none"
        document.querySelector('.review-section').style.display="none"
        document.querySelector('.table1').style.display="block"
      })
    },
    // statusCode:{
    //  401:alert('authorization failed'),
    //  200:(response)=>{
    //    console.log(response)
    //  }
    // },
    error:(res)=>{
      alert('some error occured')
    }
  })
}
