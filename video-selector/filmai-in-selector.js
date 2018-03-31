var url;
var data;
var title;
var userIP;
var streamId;
var databaseUrl;
var loadButton;
var playSelector = $('i.fa-play-circle-o');

$.getJSON('http://ipinfo.io', function(data){
  userIP = data.ip;
}).always(function() {
  streamId = CryptoJS.SHA256(userIP).toString().substring(0, 12);
  databaseUrl = 'https://tv-links-7b89d.firebaseio.com/streams/' + streamId + '.json';
});

function writeStreamData(streamUrl, streamTitle) {
  data = '{ "url": "' + streamUrl + '", "title": "' + streamTitle + '"}'
  
  $.ajax({
    url: databaseUrl,
    type: 'PUT',
    data: data,
    contentType: 'json'
  }).done(function() {
    loadButton.text('loaded')
  });
};

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
  if (playSelector.is(":visible") ) {
    playSelector.click();
    playSelector.remove();
  }
  title = $('h1').text();
  if (url) {
    $('video').remove();
    writeStreamData(url, title);
  } else {
    waitForEl('video source', function() {
      $('video').trigger('pause');
      url = $('video source').attr('src');
      writeStreamData(url, title);
    });
  }
}

var button = document.createElement("Button");
button.innerHTML = "Load";
button.style = "top:5%;right:5%;position:fixed;z-index: 9999;font-size: 20px;color: white;background-color: red;"
button.id = "stream-load";
document.body.appendChild(button);

$('.html5flash label.checkbox-styled:has(input[data-type="html5"])').click()

loadButton = $('#stream-load')

loadButton.click(function() {
  pushStreamUrl();
  loadButton.text(loaded)
});
