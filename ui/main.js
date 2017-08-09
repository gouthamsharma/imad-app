console.log('Loaded!');
var button=document.getElementById("clickbtn");
button.onclick= function()
{
    console.log("button clicked");
  var request = new XMLHttpRequest();
  request.onreadystatechange=function()
  {
      if(request.readyState===XMLHttpRequest.DONE)
      {
          if(request.status===200)
          {
              var counter = request.responseText;
              var span = document.getElementById('counterspan');
              console.log(counter.toString());
              span.innnerHTML=counter.toString();
          }
      }
  };
    request.open('GET','http://gouthamsharma.imad.hasura-app.io/counter',true);
    request.send(null);
    
};
