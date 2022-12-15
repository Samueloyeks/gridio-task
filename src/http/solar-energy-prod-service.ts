import axios from 'axios';
import {addHours} from "../helper";

const getEnergyProduction = (startDate: Date) =>{
    // fetch for 24hr range by default
    const endDate = addHours(startDate, 24);

    const start = startDate.toISOString();
    const end = endDate.toISOString();

    const API_URL = `https://dashboard.elering.ee/api/system/with-plan?start=${start}&end=${end}`;

    return axios.get(API_URL);
}

export default  getEnergyProduction;