'use strict';

const STORE = {
  npsBaseUrl: 'https://api.nps.gov/api/v1/parks?',
  npsApiKey: '46hGTGyBnYP9Fr6tkQwFUxJwBTlRNRh6ub93hXXa',
  view: 'start',
  statesSelected: [],
  stateNames: [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
  ],
  stateAbbr: [
    'AL',
    'AK',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY'
  ],
  
};

function render() {
  if(STORE.view === 'start') {
    displayStart();
  }
  if(STORE.view === 'show-results') {
    displayResults();
  }
}

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function displayStart() {
  
  let stateButtonList = [];

  for(let i = 0; i < STORE.stateAbbr.length; i++){
    stateButtonList.push(`<input type="checkbox" name='state' value="${STORE.stateAbbr[i]}">${STORE.stateNames[i]}<br>`);
  }
  stateButtonList.join('');
  $('.js-state-button-list').html(stateButtonList);
}

function displayResults() {
  // Delete previous results
  $('#results-list').html('');
  // Loop through API response and build HTML
  for (let i = 0; i < STORE.responseJson.data.length; i++){
    $('#results-list').append(
      `<li><h3>${STORE.responseJson.data[i].name}</h3>
      <p>${STORE.responseJson.data[i].description}</p>
      <a href='${STORE.responseJson.data[i].url}'>${STORE.responseJson.data[i].name}</a>
      `
    );}
  $('#results').removeClass('hidden');
}

function getParksList(query, maxResults=10) {

  let statesURL = [];
  for(let x in STORE.statesSelected) {
    statesURL.push(`stateCode=${STORE.statesSelected[x]}`);
  }
  statesURL = statesURL.join('&');
  let url = STORE.npsBaseUrl+statesURL;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => STORE.responseJson = responseJson)
    .then(() => {
      STORE.view = 'show-results';
      render();
    })
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {

  $('form').submit(event => {
  
    event.preventDefault();

    // Get all selected states
    $('input[type=checkbox]').each(function(){
      if (this.checked)
        STORE.statesSelected.push($(this).val());
    });

    // If no states selected stop and ask for inputs
    if(STORE.statesSelected.length === 0) {
      alert('Please select at least one state');
      return;
    }

    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParksList(searchTerm, maxResults);
    
  });
}

function main(){
  render();
  watchForm();
}

$(main);