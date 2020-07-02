window.onload = () => {
  showImage(imageToShow())
  intervalNext();
};
let index = 0;
const imgArrLength = document.querySelectorAll('.mySlides').length - 1;

const imageToShow = () => {
  return document.querySelector(`#img-${index}`)
}
const showImage = (img) => {
  img.classList.remove('hidden')
}

const intervalNext = () => {
  setInterval(nextImage, 8000);
}
//cONTROLES PREPARADOS PARA FUTUROS BOTONES
const nextImage = () => {
  imageToShow().classList.add('hidden');
  index != imgArrLength ? index++ : index = 0;
  imageToShow().classList.remove('hidden')
}
const prevImage = () => {
  imageToShow().classList.add('hidden');
  index <= 0 ? index = imgArrLength : index--;
  imageToShow().classList.remove('hidden');
}