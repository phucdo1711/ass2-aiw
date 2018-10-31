import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import publicIp from 'public-ip';
import 'moment/locale/vi';
import moment from 'moment';

var apikey = '4PAkogfQ2JidLCoT3qRqQN3pIQZcL5Ms';

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
    forecasts: null
  }

  async componentDidMount() {
moment.locale('vi');  
console.log(moment.locale())
    var ip = await publicIp.v4();
    axios.get(`http://ip-api.com/json/${ip}`).then(async res => {
      const { lat, lon } = res.data;
      const location = await reqAw('/locations/v1/cities/geoposition/search', `&q=${lat},${lon}`)
      const forecasts = await reqAw(`/forecasts/v1/daily/5day/${location.Key}`, `&metric=true&details=true`);

      this.setState({ forecasts, location })
    })

    
  }
  render() {
    const { forecasts, location } = this.state;
    
    return (
      <div className="App">
      <h1>Dự báo thời tiết</h1>
        {location && <div>{location.LocalizedName}, {location.Country.LocalizedName}</div>}
        {forecasts && <div>{forecasts.Headline.Text}</div>}
        <ul>
          {forecasts && forecasts.DailyForecasts.map((fore, i) => {
            return  <li key={i}>{moment(fore.Date).format('dddd DD-MM')}</li>
          })}
        </ul>
      </div>
    );
  }
}

export default App;
