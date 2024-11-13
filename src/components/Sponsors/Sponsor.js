import React from 'react'
import { Carousel } from 'antd'
import styled from 'styled-components'
    
    function Sponsor() {
      return (
        <Carousel  autoplay>
            <Slide1>iowr;fu</Slide1>
            <Slide2>w;ivdpr</Slide2>
            <Slide3>;uoi/hf</Slide3>
        </Carousel>
        
      )
    }


export default Sponsor


const Slide1 = styled.div`
  height: 500px;
  color: #101522;
  width: 100%;
  // background: url(../../Images/back1.jpg);
  // background-position: center;
  // background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Slide2 = styled.div``
const Slide3 = styled.div``
