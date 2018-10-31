import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import publicIp from 'public-ip';
import 'moment/locale/vi';
import moment from 'moment';
import Weather from './Weather';

var apikey = 'timIkSg2Iw4luAaQEY3EEQuIoAn8muS5';

const reqAw = async (url, query) => {
  const BASE_URL = 'http://dataservice.accuweather.com';
  try {
    const res = await axios.get(`${BASE_URL}${url}?apikey=${apikey}${query}&language=vi`)
    if (res.data) return res.data
  } catch (error) {
    return false;
  }
  return false;
}

class App extends Component {
  state = {
    location: null,
    forecasts: null,
    hours: null
  }

  async componentDidMount() {
    moment.locale('vi');
    console.log(moment.locale())
    var ip = await publicIp.v4();
    axios.get(`http://ip-api.com/json/${ip}`).then(async res => {
      const { lat, lon } = res.data;
      const location = await reqAw('/locations/v1/cities/geoposition/search', `&q=${lat},${lon}`)
      const forecasts = await reqAw(`/forecasts/v1/daily/5day/${location.Key}`, `&metric=true`);
      const hours = await reqAw(`/forecasts/v1/hourly/12hour/${location.Key}`, `&metric=true&details=true`)
      this.setState({ forecasts, location, hours })
    })
  }

  render() {
    const { forecasts, location, hours } = this.state;

    return (
      <div className="App">
        <h1>Dự báo thời tiết</h1>
        {/* <div>
          {location && <div>{location.LocalizedName}, {location.Country.LocalizedName}</div>}
          {forecasts && <div>{forecasts.Headline.Text}</div>}
          <ul>
            {forecasts && forecasts.DailyForecasts.map((fore, i) => {
              return <li key={i}>{moment(fore.Date).format('dddd DD-MM')}</li>
            })}
          </ul>
        </div> */}
        {hours && location &&
          <Weather
            hours={hours}
            location={location}
            forecasts={forecasts}
          />}
      </div>
    );
  }
}

export default App;
