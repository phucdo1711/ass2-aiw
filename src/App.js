import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import publicIp from 'public-ip';
import 'moment/locale/vi';
import moment from 'moment';
import Weather from './Weather';
import { reqAw } from './utils';
import Search from './Search';


class App extends Component {
  state = {
    location: null,
    forecasts: null,
    hours: null
  }

  async componentDidMount() {
    moment.locale('vi');
    var ip = await publicIp.v4();
    axios.get(`http://ip-api.com/json/${ip}`).then(async res => {
      const { lat, lon } = res.data;
      const location = await reqAw('/locations/v1/cities/geoposition/search', `&q=${lat},${lon}`)
      this.getLocationWeather(location)
    })
  }

  getLocationWeather = async (location) => {
    this.setState({ forecasts:null, location:null, hours:null })

    const forecasts = await reqAw(`/forecasts/v1/daily/5day/${location.Key}`, `&metric=true`);
    const hours = await reqAw(`/forecasts/v1/hourly/12hour/${location.Key}`, `&metric=true&details=true`)
    this.setState({ forecasts, location, hours })
  }

  render() {
    const { forecasts, location, hours } = this.state;

    return (
      <div className="App">
        <Search 
          onSearch={this.getLocationWeather}
        />
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
