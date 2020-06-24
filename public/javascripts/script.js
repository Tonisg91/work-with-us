//SIDENAV
function openNav() {
  document.getElementById("sidenav").style.width = "50%";
}
function closeNav() {
  document.getElementById("sidenav").style.width = "0";
}
//FILTERS
const cityFilterInput = document.querySelector('#tag-filter');
const cityFilterBtn = document.querySelector('#tag-filter-btn')

cityFilterBtn.addEventListener('click', () => {
  console.log(cityFilterVal.value)
})