import React from 'react';
import Flex from './Flex';
import styled from 'styled-components';
import moment from 'moment';
import Icon from './Icon';

const DayItem = ({ time, icon, min, max, isActive }) => (
    <Container column align="center" justify="space-between" isActive={isActive}>
        <Text>{moment(time).format('ddd')}</Text>
        <Icon
            icon={icon}
            width={48}
            height={48}
        />
        <div>
            <ActiveText>{max}°</ActiveText>
            <Text>{min}°</Text>
        </div>
    </Container>
)


const Container = styled(Flex)`
    width: 60px;
    height: 120px;
    padding: 8px;
    border-radius: 4px;
    ${({ isActive }) =>isActive && `
        background-color: #fcfcfc;
    border: 1px solid #e9e9e9;
    border-radius: 1px;
    `}
`

const Text = styled.span`
    color: #bababa;
    font-size: 14px;
`

const ActiveText = styled(Text)`
    margin-right: 6px;
    color: #000;
`

export default DayItem;