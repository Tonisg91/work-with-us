// TOOLS
const capitalize = (str) => str.toLowerCase().charAt(0).toUpperCase() + str.slice(1);

//SIDENAV
function openNav() {
  document.getElementById("sidenav").style.width = "50%";
}
function closeNav() {
  document.getElementById("sidenav").style.width = "0";
}

//FILTERS
const cityFilterInput = document.querySelector('#tag-filter');
const cityFilterBtn = document.querySelector('#tag-filter-btn');
const announces = document.querySelectorAll('.announce-card');

const clearList = arr => arr.forEach(e => e.classList.remove('hidden'));

const filterList = (arr, val, announcesArr) => {
  val ? hideElements(arr, val) : clearList(announcesArr)
}

const hideElements = (arr, val) => {
  arr.forEach((e, idx) => {
    if (e.innerHTML != val) {
      announces[idx].classList.add('hidden')
    }
  })
}
cityFilterBtn.addEventListener('click', () => {
  const val = capitalize(cityFilterInput.value);
  const citiesOfAnnouncements = document.querySelectorAll('.city');
  filterList(citiesOfAnnouncements, val, announces);
})