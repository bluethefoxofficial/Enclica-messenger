var Peer = require('simple-peer')
//var declined = new Audio("../assets/sounds/mp3-converted/declined_call.mp3"); depreached because we are not making a stupid calling system like this.
var connecting = new Audio("../assets/sounds/mp3-converted/connecting_call.mp3");
var globalstream = null;
var Peer = require('simple-peer');

const p = new Peer({
  initiator: location.hash === '#1',
  trickle: false
})

p.on('error', err => console.log('error', err))

p.on('signal', data => {
  document.getElementById('status').innerHTML = "connecting...";
  console.log('SIGNAL', JSON.stringify(data))
  document.querySelector('#outgoing').textContent = JSON.stringify(data)
})



p.on('connect', () => {
  console.log('CONNECT')
  p.send('whatever' + Math.random());
})

p.on('data', data => {
  console.log('data: ' + data)
})

function call(){
  console.log("NO RTC")
  return false;
}