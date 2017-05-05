import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';

import { FETCH_SCHOOLS, ONE_SCHOOL, SHOW_MAP, CENTER_COORDS, USER_INPUT, SCHOOL_IMAGE, MAP_BOUNDS_INPUT } from './actions_types';

const BASE_URL = 'http://www.school2career.net/api/fetch_schools'; //live

// const BASE_URL = 'http://ninojoseph.com/api/school/data.php?action=getData'; //dummy


// const ONESCHOOL_URL = 'http://ninojoseph.com/api/school/data.php?action=getDataOne';


const ONESCHOOL_URL = 'http://www.school2career.net/api/one_school/id/';

const API_KEY = '';

export function searchForSchools(value) {
    const newVal = JSON.stringify(value);
    const request = axios.post(`${BASE_URL}`, newVal);
    console.log("newVal", newVal, 'value', value);
    return {
        type: FETCH_SCHOOLS,
        payload: request
    };
}

export function searchOneSchool(value) {
    const request = axios.post(`${ONESCHOOL_URL}`+value);
    console.log('searchOneSchool: action ', request);

    return {
        type: ONE_SCHOOL,
        payload: request
    }
}

export function centerOfMap(value) {
    return {
        type: CENTER_COORDS,
        payload: value
    }
}

export function schoolURL(value) {
    return {
        type: SCHOOL_IMAGE,
        payload: value
    }
}

export function toggleMap(value) {
    return {
        type: SHOW_MAP,
        payload: !value  //may change back to ternary value ? false : true
    }
}

export function userInput(value){
    return {
        type: USER_INPUT,
        payload: value
    }
}

export function mapBoundsInput(value){
    return {
        type: MAP_BOUNDS_INPUT,
        payload: value
    }
}
