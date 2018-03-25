var config = {
  apiKey: "AIzaSyBREApkWhFAEbVoPx5mIK9jfk6xk3D3Vc0",
  authDomain: "tv-links-7b89d.firebaseapp.com",
  databaseURL: "https://tv-links-7b89d.firebaseio.com/",
  storageBucket: "tv-links-7b89d.appspot.com"
};

firebase.initializeApp(config);

var url;
var title;
var userIP;
var database = firebase.database();
var playSelector = $('i.fa-play-circle-o');

$.getJSON('http://ipinfo.io', function(data){
  console.log(data)
  userIP = data.ip;
  console.log(userIP)
}).always(function() {
  console.log('userIP ' + userIP);
  var streamId = CryptoJS.SHA256(userIP).toString().substring(0, 12);
  console.log('streamId ' + streamId);
});

function writeStreamData(url, title) {
  console.log('id:' + streamId + ' url:' + url + ' title:' + title);
  
  database.ref('streams/' + streamId).set({
    url: url,
    title: title
  });
}
var waitForEl = function(selector, callback) {
  if (jQuery(selector).length) {
    callback();
  } else {
    setTimeout(function() {
      waitForEl(selector, callback);
    }, 100);
  }
};

var pushStreamUrl = function() {
  playSelector.click();
  waitForEl('video source', function() {
    $('video').trigger('pause');
    url = $('video source').attr('src');
    title = $('h1').text();
    writeStreamData(url, title);
  });
}

var button = document.createElement("Button");
button.innerHTML = "Load";
button.style = "top:5%;right:5%;position:fixed;z-index: 9999;font-size: 20px;color: white;background-color: red;"
button.id = "stream-load";
document.body.appendChild(button);

$('#stream-load').click(function() {
  pushStreamUrl();
});
