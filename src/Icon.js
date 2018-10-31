import React from 'react';
import styled from 'styled-components';

const Icon = styled.div`
    background-image: url(https://vortex.accuweather.com/adc2010/images/slate/icons/${({icon}) => icon}.svg);
    width: ${({width}) => width}px;
    height: ${({height}) => height}px;
`

export default Icon;