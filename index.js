const sliderLeft = document.querySelector('.slides-left');
const sliderRight = document.querySelector('.slides-right');
const sliderLeftItems = document.querySelectorAll('.slide');
const sliderRightItems = document.querySelectorAll('.slides-right > div');
const slidesLeftLength = sliderLeftItems.length;
const slidesRightLength = sliderRightItems.length;
const leftSlideSize = sliderLeftItems[0].offsetHeight;
const rightSlideSize = sliderRightItems[0].offsetHeight;
const leftFirstSlide = sliderLeftItems[0];
const rightFirstSlide = sliderRightItems[0];
const leftLastSlide = sliderLeftItems[slidesLeftLength - 1];
const rightLastSlide = sliderRightItems[slidesRightLength - 1];

const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let posInitial = 0;
let slideIndex = 0;
let posFinal = 0;
let xStart = 0;
let xNew = 0;
let edge = 100;
let currentOffsetLeft = -100;
let currentOffsetRight = -100 * slidesRightLength;

const cloneFirstLeft = leftFirstSlide.cloneNode(true);
const cloneLastLeft = leftLastSlide.cloneNode(true);
const cloneFirstRight = rightFirstSlide.cloneNode(true);
const cloneLastRight = rightLastSlide.cloneNode(true);

function clone() {
  sliderLeft.append(cloneFirstLeft);
  sliderLeft.insertBefore(cloneLastLeft, leftFirstSlide);
  sliderRight.append(cloneFirstRight);
  sliderRight.insertBefore(cloneLastRight, rightFirstSlide);
}
clone();
sliderLeft.style.transform = `translateY(${currentOffsetLeft + 'vh'})`;
sliderRight.style.transform = `translateY(${currentOffsetRight + 'vh'})`;

function prevSlide() {
  prev.removeEventListener('click', prevSlide);
  next.removeEventListener('click', nextSlide);
  document.body.removeEventListener('wheel', mouseWheel);
  sliderLeft.classList.toggle('moving');
  sliderRight.classList.toggle('moving');
  currentOffsetLeft += 100;
  currentOffsetRight += -100;
  sliderLeft.style.transform = `translateY(${currentOffsetLeft + 'vh'})`;
  sliderRight.style.transform = `translateY(${currentOffsetRight + 'vh'})`;
  slideIndex--;
}
function nextSlide() {
  next.removeEventListener('click', nextSlide);
  prev.removeEventListener('click', prevSlide);
  document.body.removeEventListener('wheel', mouseWheel);
  sliderLeft.classList.toggle('moving');
  sliderRight.classList.toggle('moving');

  currentOffsetLeft += -100;
  currentOffsetRight += 100;
  sliderLeft.style.transform = `translateY(${currentOffsetLeft + 'vh'})`;
  sliderRight.style.transform = `translateY(${currentOffsetRight + 'vh'})`;
  slideIndex++;
}

function mouseWheel(e) {
  if (e.wheelDelta > 0) {
    prevSlide();
  } else {
    nextSlide();
  }
}

function onMouseDown(evtDown) {
  evtDown.preventDefault();
  posInitial = (currentOffsetLeft * window.innerHeight) / 100;
  xStart = evtDown.clientY;
  const onMouseMove = function (evtMove) {
    xNew = xStart - evtMove.clientY;
    sliderLeft.style.transform = `translateY(${posInitial - xNew + 'px'})`;
  };

  let onMouseUp = function () {
    sliderLeft.removeEventListener('mousemove', onMouseMove);
    sliderLeft.removeEventListener('mouseup', onMouseUp);
    posFinal = posInitial - xNew;
    if (posFinal - posInitial < -edge) {
      nextSlide();
    } else if (posFinal - posInitial > edge) {
      prevSlide();
    } else {
      sliderLeft.style.transform = `translateY(${posInitial + 'px'})`;
    }
  };

  sliderLeft.addEventListener('mousemove', onMouseMove);
  sliderLeft.addEventListener('mouseup', onMouseUp);
}

prev.addEventListener('click', prevSlide);
next.addEventListener('click', nextSlide);
document.body.addEventListener('wheel', mouseWheel);
sliderLeft.addEventListener('mousedown', onMouseDown);

sliderLeft.addEventListener('transitionend', () => {
  sliderLeft.classList.toggle('moving');
  sliderRight.classList.toggle('moving');
  if (slideIndex === slidesLeftLength) {
    slideIndex = 0;
    currentOffsetLeft = -100;
    currentOffsetRight = -100 * slidesLeftLength;
    sliderLeft.style.transform = `translateY(${currentOffsetLeft + 'vh'})`;
    sliderRight.style.transform = `translateY(${currentOffsetRight + 'vh'})`;
  } else if (slideIndex === -1) {
    slideIndex = slidesLeftLength - 1;
    currentOffsetLeft = -100 * slidesLeftLength;
    currentOffsetRight = -100;
    sliderLeft.style.transform = `translateY(${currentOffsetLeft + 'vh'})`;
    sliderRight.style.transform = `translateY(${currentOffsetRight + 'vh'})`;
  }
  next.addEventListener('click', nextSlide);
  prev.addEventListener('click', prevSlide);
  document.body.addEventListener('wheel', mouseWheel);
});


