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
  // iterate through the items array


  for (let i = 0; i < responseJson.data.length; i++){
    // for each video object in the items 
    //array, add a list item to the results 
    //list with the video title, description,
    //and thumbnail
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].name}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href='${responseJson.data[i].url}'>${responseJson.data[i].name}</a>
      `
    );}
  //display the results section  
  $('#results').removeClass('hidden');


}

// description: "Rainbow Bridge is one of the world's largest known natural bridges. The span has undoubtedly inspired people throughout time--from the neighboring American Indian tribes who consider Rainbow Bridge sacred, to the 85,000 people from around the world who visit it each year.↵↵Please visit Rainbow Bridge in a spirit that honors and respects the cultures to whom it is sacred."
// designation: "National Monument"
// directionsInfo: "Rainbow Bridge National Monument is located between Glen Canyon National Recreation Area and the Navajo Nation. There are no roads in the vicinity of the monument. Rainbow Bridge can be reached by boat on Lake Powell or by hiking one of two trails around Navajo Mountain on the Navajo Nation, by permit only. Boat tours are available.↵↵The entrance to Forbidding Canyon is located at buoy 42 on Lake Powell. Boaters should be familiar with the Aids to Navigation (buoy) system and use a navigational map."
// directionsUrl: "http://www.nps.gov/rabr/planyourvisit/directions.htm"
// fullName: "Rainbow Bridge National Monument"
// id: "CF02A7E7-147F-4F1C-966B-FE3F2AE28DDC"
// latLong: "lat:37.07788771, long:-110.9655099"
// name: "Rainbow Bridge"
// parkCode: "rabr"
// states: "UT"
// url: "https://www.nps.gov/rabr/index.htm"
// weatherInfo: "Summers are extremely hot with little, if any, shade. Winters are moderately cold with night time lows often bel

function getParksList(query, maxResults=10) {

  let npsURL = 'https://api.nps.gov/api/v1/parks?';

  let statesURL = [];

  for(let x in STORE.statesSelected) {
    statesURL.push(`stateCode=${STORE.statesSelected[x]}`);
  }
  statesURL = statesURL.join('&');

  let url = npsURL+statesURL;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
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
    if(STORE.statesSelected.length === 0) {
      alert('Please select at least one state');
      return;
    }
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParksList(searchTerm, maxResults);
  });
}

$(watchForm);