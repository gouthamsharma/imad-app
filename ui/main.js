console.log('Loaded!');
var button=document.getElementById("clickbtn");
var nameval=document.getElementById("name");
var pass=document.getElementById("pwd");
var submitbutton=document.getElementById("submitbtn");
button.onclick= function()
{
    
  var request = new XMLHttpRequest();
  request.onreadystatechange=function()
  {
      if(request.readyState===XMLHttpRequest.DONE)
      {
          if(request.status===200)
          {
              var counter = request.responseText;
              var span = document.getElementById('counterspan');
              span.innerHTML=counter.toString();
          }
      }
  };
    request.open('GET','http://gouthamsharma.imad.hasura-app.io/counter',true);
    request.send(null);
    
};

submitbutton.onclick=function()
  {
      alert("inside submit button");
      console.log("user name from client side :"+nameval.value);
      console.log("password from client side :"+pass.value);
    var request = new XMLHttpRequest();
  request.onreadystatechange=function()
  {
      if(request.readyState===XMLHttpRequest.DONE)
      {
          if(request.status===200)
          {
              console.log("successfully inserted");
          }
      }
  };
    request.open('POST','http://gouthamsharma.imad.hasura-app.io/newuser',true);
    request.setRequestHeader("Content-Type", "application/json");
    var data={
          username:nameval.value,
          password:pass.value
      }; 
      console.log(data.username);
      console.log(data.password);
      console.log(JSON.stringify(data));
      var data1=JSON.stringify({
          username:nameval.value,
          password:pass.value
      });
    request.send(JSON.stringify({username:'goutham',password:'password'}));  
 
  };
