import QuakesController from '../controllers/QuakesController.js';
import { getJSON, getLocation } from '../js/utilities.js';

const baseUrl = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-02-02';

const json = getJSON(baseUrl).then(data => console.log(data));

getLocation().then(data => {
    const latitude = data.coords.latitude;
    const longitude = data.coords.longitude;
    const position = {
        latitude: latitude,
        longitude: longitude
    }
    console.log(position);
    const quakesController = new QuakesController("#quakeList", position);
    console.log(quakesController);
    quakesController.init();
    quakesController.getQuakesByRadius();
});

// );
// const latitude = getLocation().then(data => data.coords.latitude);
// const longitude = getLocation().then(data => data.coords.longitude);
// console.log(latitude.then(data => data.value), longitude)
// const position = {
//     latitude: latitude,
//     longitude: longitude
// }

// console.log(position);

// const quakesController = new QuakesController("#quakeList", { latitude: -17, longitude: -66 });
// quakesController.init();
// quakesController.getQuakesByRadius();