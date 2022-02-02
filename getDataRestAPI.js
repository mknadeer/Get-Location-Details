import { LightningElement } from 'lwc';

const api = 'https://api.wheretheiss.at/v1/coordinates/';

export default class GetDataRestAPI extends LightningElement {

    latitude;
    longitude;
    Info = {};

    updateLatitude(event) {
        this.latitude = event.target.value;
    }
    updateLongitude(event) {
        this.longitude = event.target.value;
    }

    get locationPopulated() {
        return this.Info && this.Info.timezone_id;
    }
    
    getLocation(){
        if(this.latitude && this.longitude) {
        this.Info = {};
        fetch(api + this.latitude + ',' + this.longitude)
        .then(response => {
            console.log(response);
            if(response.ok) {
                return response.json();
            } else {
                throw Error(response);
            }
        })
        .then(Info => {
            console.log(Info);
            this.Info = {
                country_code: Info.country_code,
                timezone_id: Info.timezone_id,
                latitude: Info.latitude,
                longitude: Info.longitude,
                map_url: Info.map_url
            };
        })
        .catch(error => console.log(error))
    }
    else {
        alert('Please specify Latitude and Longitude');
    }
} 
        
}