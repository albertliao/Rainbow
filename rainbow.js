function drawRainbow(dc,width,height) {

  function hslaColor(h,s,l,a)
  {
    return 'hsla(' + h + ',' + s + '%,' + l + '%,' + a + ')';
  }
  
  function drawArc(dc,color,x,y,r)
  {
    dc.strokeStyle = color;
    dc.beginPath();
    dc.arc(x, y, r, Math.PI, 2*Math.PI, false);
    dc.stroke();
  }

  dc.clearRect(0,0,width,height);
  
  var grad = dc.createLinearGradient(0,0,1,height);
  grad.addColorStop(0, 'black');
  grad.addColorStop(1, '#242424');

  dc.fillStyle = grad;
  dc.fillRect(0,0,width,height);

  dc.font = "65px Verdana";
  dc.strokeStyle = "grey"
  dc.strokeText("What does it mean?!",width/3-75,height-100);
  
  var x = width/2;  //center of the arc
  var y = height;
  var rainbowRad = width*.35;  //distance to the outermost arc
  var thickness = width/13;
  var rainbowSpace = thickness*2.5;  //distance between rainbows

  dc.lineWidth = 3; //makes rainbow more solid looking

  //draw inner rainbow
  for (var i = 0; i < thickness; i++) {
    var ratio = i/thickness;
    var hue = Math.floor(360*ratio*ratio);  //ratio^2 makes colors more realistic
    var sat = 100;
    var lum = 50;
    var alpha = .6;
    drawArc(dc, hslaColor(hue,sat,lum,alpha), x, y, rainbowRad-i);
  }

  //draw outer rainbow
  for (var i = 0; i < thickness; i++) {
    var ratio = 1-(i/thickness);
    var hue = Math.floor(360*ratio*ratio);
    var sat = 100;
    var lum = 50;
    var alpha = .2;
    drawArc(dc, hslaColor(hue,sat,lum,alpha), x, y, rainbowSpace + rainbowRad-i);
  }  
}


$().ready(function() {
      var canv = $("#rainbow").get(0);
      canv.width = $(window).width();
      canv.height = $(window).height();
      var dc = canv.getContext('2d');
      var w =  $(window).width();
      var h = $(window).height();
      drawRainbow(dc,w,h,0);

      $(".canvas-container").sparkle({ 
          "minSize": 5 , 
          "maxSize": 30 ,
          "overlap": 20 ,
          "direction": "up" ,
          "speed": 0.6,
          "count": 100
      });

      myAudio = new Audio('rainbow.mp3'); 
      myAudio.addEventListener('ended', function() {
          this.currentTime = 0;
          this.play();
      }, false);
      myAudio.play();

    });