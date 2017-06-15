import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';

import { FETCH_SCHOOLS, ONE_SCHOOL, SHOW_MAP, CENTER_COORDS, USER_INPUT, SCHOOL_IMAGE, MAP_BOUNDS_INPUT, SHOW_LOADER } from './actions_types';

// // for live site
// const BASE_URL = 'https://school2career.net/fetch_schools';
// const ONESCHOOL_URL = 'https://school2career.net/one_school/id/';

// // for testing on localhost
// const BASE_URL = 'http://dev.school2career.net/fetch_schools';
// const ONESCHOOL_URL = 'http://dev.school2career.net/one_school/id/';

// for testing on localhost, pointed to staging
//const BASE_URL = 'http://s2c.donaldjtran.com/fetch_schools';
//const ONESCHOOL_URL = 'http://s2c.donaldjtran.com/one_school/id/';

// for live site alternative
const BASE_URL = 'https://school.donaldjtran.com/fetch_schools';
const ONESCHOOL_URL = 'https://school.donaldjtran.com/one_school/id/';

//calls the database via axios to get all schools available
export function searchForSchools(value) {
    value.newInfo = true;
    if (value.aa !== undefined) {
        if (value.aa === false) {
            value.aa = 0;
        } else {
            value.aa = 1;
        }
        if (value.voc === false) {
            value.voc = 0;
        } else {
            value.voc = 1;
        }
        if (value.bs === false) {
            value.bs = 0;
        } else {
            value.bs = 1;
        }
    }
    const newVal = JSON.stringify(value);
    const request = axios.post(`${BASE_URL}`, newVal);
    return {
        type: FETCH_SCHOOLS,
        payload: request
    };
}
//calls database to get a single school baded on it's ID
export function searchOneSchool(value) {
    const request = axios.post(`${ONESCHOOL_URL}`+value);
    return {
        type: ONE_SCHOOL,
        payload: request
    }
}
//passes true or false so loader knows when to show or not
export function showLoader(value) {
    return {
        type: SHOW_LOADER,
        payload: value
    }
}
//allows the passing of center of the map for google maps
export function centerOfMap(value) {
    return {
        type: CENTER_COORDS,
        payload: value
    }
}
//gets the URL generated by google places and passes it through to be placed on individual school page
export function schoolURL(value) {
    return {
        type: SCHOOL_IMAGE,
        payload: value
    }
}
//passes a boolean that allows the map to be shown or not
export function toggleMap(value) {
    return {
        type: SHOW_MAP,
        payload: !value
    }
}
//allows user_input to be passed through. this is the address from the landing page and search school form
export function userInput(value){
    return {
        type: USER_INPUT,
        payload: value
    }
}
//this passes through the map bounds coordinates for google maps.
export function mapBoundsInput(value){
    return {
        type: MAP_BOUNDS_INPUT,
        payload: value
    }
}
