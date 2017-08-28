console.log('Loaded!');
var button=document.getElementById("clickbtn");
var nameval=document.getElementById("name");
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
  
  function fun()
  {
      alert(nameval.val);
  }
    request.open('GET','http://gouthamsharma.imad.hasura-app.io/counter',true);
    request.send(null);
    
};
