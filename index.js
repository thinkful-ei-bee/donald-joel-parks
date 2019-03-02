'use strict';

// put your own value below!
const apiKey = '46hGTGyBnYP9Fr6tkQwFUxJwBTlRNRh6ub93hXXa'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=';

const STORE = {
  statesSelected: [],
};

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.items.length; i++){
    // for each video object in the items 
    //array, add a list item to the results 
    //list with the video title, description,
    //and thumbnail
    $('#results-list').append(
      `<li><h3>${responseJson.items[i].snippet.title}</h3>
      <p>${responseJson.items[i].snippet.description}</p>
      <img src='${responseJson.items[i].snippet.thumbnails.default.url}'>
      </li>`
    );}
  //display the results section  
  $('#results').removeClass('hidden');
}

function getParksList(query, maxResults=10) {

  let npsURL = 'https://api.nps.gov/api/v1/parks?';

  let statesURL = [];

  for(let x in STORE.statesSelected) {
    statesURL.push(`stateCode=${STORE.statesSelected[x]}`);
  }
  statesURL.join('&');

  console.log(npsURL+statesURL);

  // fetch(url)
  //   .then(response => {
  //     if (response.ok) {
  //       return response.json();
  //     }
  //     throw new Error(response.statusText);
  //   })
  //   .then(responseJson => displayResults(responseJson))
  //   .catch(err => {
  //     $('#js-error-message').text(`Something went wrong: ${err.message}`);
  //   });
}

function watchForm() {
  
  // const url = `${searchURL}${apiKey}`;
  // fetch(url)
  //   .then(response => response.json())
  //   .then(myJson => console.log(myJson));
  // console.log(url);

  let stateNames = ['Alabama',
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
  'Wyoming'];
  let stateAbbr = ['AL',
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
  'WY']

  let stateButtonList = [];
  
  for(let i = 0; i < stateAbbr.length; i++){
    stateButtonList.push(`<input type="checkbox" name='state' value="${stateAbbr[i]}">${stateNames[i]}<br>`);
  }
  stateButtonList.join('');

  $('.js-state-button-list').html(stateButtonList);

  $('form').submit(event => {
    event.preventDefault();
    $('input[type=checkbox]').each(function(){
      if (this.checked)
        STORE.statesSelected.push($(this).val());
    });
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParksList(searchTerm, maxResults);
  });
}

$(watchForm);