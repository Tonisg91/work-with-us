// TOOLS
const capitalize = (str) => str.toLowerCase().charAt(0).toUpperCase() + str.slice(1);

const clearFilters = () => {
  clearList(announcements);
  const inputs = Array.from(document.querySelectorAll('input'))
  inputs.forEach(e => e.value = '')
}

//SHOW FILTERS
const openFilters = document.getElementById('open-filters');
let show = false;
openFilters.addEventListener('click', () => {
  if (!show) {
    document.getElementById('announcements-main-filters').classList.remove('hidden');
    show = true;
    console.log(show);
  } else {
    document.getElementById('announcements-main-filters').classList.add('hidden');
    show = false
    console.log(show);
  }
})

//FILTERS
//FUNCTIONS
const clearList = arr => arr.forEach(e => e.classList.remove('hidden'));

const filterList = (arr, val) => {
  val ? hideElements(arr, val) : clearList(announcements);
};

const tagFilter = (arr, val) => {
  if (val) {
    arr.forEach(announce => {
      const tags = Array.from(announce.querySelectorAll('.tags')).map(e => e.innerHTML);
      if (!tags.includes(val)) {
        announce.classList.add('hidden');
      }
    })
  } else {
    clearList(arr)
  }
}

const hideElements = (arr, val) => {
  arr.forEach((e, idx) => {
    if (e.innerHTML != val) {
      announcements[idx].classList.add('hidden')
    }
  })
};

const announcements = document.querySelectorAll('.announce-card');

// FILTER BY TAGS
const tagFilterInput = document.getElementById('tag-filter');
const tagFilterBtn = document.getElementById('tag-filter-btn');

tagFilterBtn.addEventListener('click', () => {
  const tag = capitalize(tagFilterInput.value);
  tagFilter(announcements, tag);
});

//FILTER BY CITY
const cityFilterInput = document.getElementById('city-filter')
const cityFilterBtn = document.getElementById('city-filter-btn')

cityFilterBtn.addEventListener('click', () => {
  const city = capitalize(cityFilterInput.value);
  const announcementsCities = document.querySelectorAll('.city');
  filterList(announcementsCities, city);
})

//FILTER BY STATE
const stateFilterInput = document.getElementById('state-filter');
const stateFilterBtn = document.getElementById('state-filter-btn');

stateFilterBtn.addEventListener('click', () => {
  const state = capitalize(stateFilterInput.value);
  const announcementsStates = document.querySelectorAll('.state');
  filterList(announcementsStates, state);
})