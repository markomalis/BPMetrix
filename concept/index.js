console.log('start')

const svgns = "http://www.w3.org/2000/svg";
const svgElement = document.querySelector('svg')
const heartbeatsContainer = document.querySelector('.heartbeats-container')
const heartbeats = document.querySelectorAll('.heartbeat')

const setRandomHeight = (event) => event.target.style.height = getRandomHeight();
const getRandomHeight = () => parseInt(40*Math.random()+60);
const appendRandomSvg = (element, x, y) => {
  const height = getRandomHeight();
  const width = x > 600 ? x : 600
  const svgWidth = svgElement.clientWidth
  const svgHeight = svgElement.clientHeight
  const vbw = x > svgWidth ? x - svgWidth : 0

  svgElement.setAttribute('viewBox', `${vbw} 0 ${svgWidth} ${svgHeight}`)

  const rect = document.createElementNS(svgns, 'rect');
  rect.setAttributeNS(null, 'x', x.toString());
  rect.setAttributeNS(null, 'y', `${100 - height}%`);
  rect.setAttributeNS(null, 'height', `${height}%`);
  rect.setAttributeNS(null, 'width', '10');
	rect.setAttributeNS(null, 'class', "heartbeat-measurement");

  element.appendChild(rect);
}

heartbeats.forEach(beat => beat.addEventListener('click', setRandomHeight))

let x = 0;
let y = 0;

for(let i = 0; i<200 ; i++) {
  setTimeout(() => {
    appendRandomSvg(heartbeatsContainer, x, y)
     x = x + 15;
  }, i*500);
}

console.log('done')
