import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Flex from './Flex';
import Icon from './Icon';
import Chart from './Chart';
import moment from 'moment';
import _ from 'lodash';
import DayItem from './DayItem';

class Weather extends PureComponent {
    state = {
        activeHour: null
    }

    componentDidMount(){
        const { hours } = this.props;
        this.setState({activeHour: hours[0]})
    }

    render(){
        const { location , hours, forecasts} = this.props;
        const { activeHour } = this.state;
        if(!activeHour ) return null;
        const chartData = hours.map((h, index) => ({
            name: moment(h.DateTime).format("HH:mm"),
            Temporature: _.round(h.Temperature.Value),
            index
        }))

        const {DateTime , IconPhrase, WeatherIcon, Temperature, RelativeHumidity, Wind, Rain} = activeHour;

        return (
            <Container>
                <Title>{location.LocalizedName}, {location.Country.LocalizedName}</Title>
                <Today>{_.upperFirst(moment(DateTime).format("dddd, HH:mm"))}</Today>
                <Today>{IconPhrase}</Today>
                <Flex>
                    <Half>
                        <Flex align="flex-start">
                            <Icon icon={WeatherIcon} width={60} height={60}/>
                            <Temporature>{_.round(Temperature.Value)}</Temporature>
                            <Celsius>°{Temperature.Unit}</Celsius>
                        </Flex>
                    </Half>
                    <Half>
                        <div>Khả năng có mưa: {Rain.Value}%</div>
                        <div>Độ ẩm: {RelativeHumidity}%</div>
                        <div>Gió: {Wind.Speed.Value}{Wind.Speed.Unit}</div>
                    </Half>
                </Flex>
                <div style={{margin: "16px 0"}}>
                <Chart 
                    data={chartData}
                />
                </div>
                <Flex justify="space-around">
                    {forecasts && forecasts.DailyForecasts.map((day, i) => (
                        <DayItem
                            key={i}
                            icon={day.Day.Icon}
                            time={day.Date}
                            min={_.round(day.Temperature.Minimum.Value)}
                            max={_.round(day.Temperature.Maximum.Value)}
                            isActive={moment(day.Date).isSame(DateTime, 'd')}
                        />
                    ))}
                </Flex>
            </Container>
        )
    }
}

const Celsius = styled.span`
    color: #000;
`

const Half = styled.div`
    width: 50%;
    margin-top: 16px;
`

const Temporature = styled.div`
    color: #000;
    font-size: 60px;
    margin-left: 8px;
    /* font-weight: 600; */
`

const Container = styled.div`
    box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25), 0 0 1px rgba(9, 30, 66, 0.31);
    width: 732px;
    padding: 16px;
    border-radius: 4px; 
    color: #878787;
`

const Title = styled.div`
    font-size: 22px;
    font-weight: 500;
`

const Today = styled.div`
    font-size: 16px;
`

export default Weather;