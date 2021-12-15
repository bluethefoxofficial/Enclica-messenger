var peer = new SimplePeer({
    initiator: location.hash === '#init',
    trickle: false,
    stream: stream
});

peer.on('signal', function(data) {
    //console.log(JSON.stringify(data));
    document.getElementById('yourId').value = JSON.stringify(data);
});

peer.on('stream', function(stream) {
    // got remote video stream, now let's show it in a video tag
    var video = document.createElement('video');
    video.srcObject = stream;
    video.classList.add("remote-video");
    document.getElementById('remote-video-container').appendChild(video);
    video.play();
});

document.getElementById('connect').addEventListener('click', function() {
    var otherId = JSON.parse(document.getElementById('otherId').value);
    peer.signal(otherId);
});

document.getElementById('send').addEventListener('click', function() {
    var yourMessage = document.getElementById('yourMessage').value;
    peer.send(yourMessage);
});

peer.on('data', function(data) {
    document.getElementById('messages').textContent += data + '\n';
});

// Language: javascript
// Path: js\RTC.js
simple - peer group video chat

var peer = new SimplePeer({
    initiator: location.hash === '#init',
    trickle: false,
    stream: stream
});

peer.on('signal', function(data) {
    //console.log(JSON.stringify(data));
    document.getElementById('yourId').value = JSON.stringify(data);
});

peer.on('stream', function(stream) {
            // got remote video stream, now let's show it in a video tag
            var video = document.createElement('video');
            video.srcObject = stream;
            video.classList.add("remote-video");
            document.getElementById('remote-video-container').append