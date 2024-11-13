import React,{useState} from 'react'
import styled from 'styled-components'
import Bg from './bl.jpg'
import {Link} from 'react-router-dom'
import Lsetf from './lsetf.jpg'
import Usadf from './usadf.jpg'
import {FaBars, FaTimes} from 'react-icons/fa'

function Home () {
  const [click, setClick] = useState(true);

	const handClick = () => {
		setClick(!click)
	}
  return (
    <>
      <Homepage>
      <NavContain>
      <LogoHold>
				<Hold>
				<img src={Lsetf} alt='img' className='m1'/>
				<img src={Usadf} alt='img' className='m2'/>
				</Hold>
			</LogoHold>
			<MobileIcon onClick={handClick}>
				{click? <FaBars/> : <FaTimes/>}
			</MobileIcon >
			<Navig onClick={handClick} click={click}>
				{/* <Link to = '/' style ={{color: 'navy', textDecoration: 'none'}}><Navlink>Home</Navlink></Link> */}
				<Link to = '/student' style ={{color: '#fff', textDecoration: 'none'}}><Navlink>Student</Navlink></Link>
        <Link to = '/sponsors' style ={{color: '#fff', textDecoration: 'none'}}><Navlink>Sponsor</Navlink></Link>
        <Link to = '/authorpage' style ={{color: '#fff', textDecoration: 'none'}}><Navlink>Author</Navlink></Link>
			</Navig>
      </NavContain>
      <HomeCont>
        <Homelay>
        <Homebig>Lagos State Employment Trust Fund (LSETF) <br/>
        & <br/>
        United States African Development Foundation (USADF) <br/>
        in partnership with <br/>
        LoftyInc Allied Partners</Homebig>
        </Homelay>
        <Homepic>
          <Homeless >Students/Beneficiaries Database</Homeless> 
        </Homepic>
      </HomeCont>
      </Homepage>
    </>
  )
}

export default Home

const Homepage = styled.div`
width: 100%;
height: 100vh;
display: flex;
flex-wrap: wrap;
background-image: url(${Bg});  
background-size: cover;
`
const HomeCont = styled.div`
width: 100%;
height: 85%;
display: flex;
justify-content: center;
flex-direction: column;
`
const Homelay = styled.div`
width:90%;
color: #006400;
margin-bottom: 20px;
margin-left: 50px;
`
const Homebig = styled.div`
text-align: center;
font-size: 40px;


overflow: hidden;       /* Ensures the content is not revealed until the animation */
border-right: .15em solid C3008B;       /* The typewriter cursor */
white-space: nowrap;      /* Keeps the content on a single line */
margin: 0 auto;       /* Gives that scrolling effect as the typing happens */
// letter-spacing: .15em;    /* Adjust as needed */
animation: typing 15s steps(40, end), blink-caret .75s step-end infinite;
animation-iteration-count: infinite;

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: orange; }
  }
}
}
`
const Homepic = styled.div`
width: 90%;
color: blue;
margin-left: 50px;

`
const Homeless = styled.div`
text-align: center;
font-size: 35px;

overflow: hidden;       /* Ensures the content is not revealed until the animation */
border-right: .15em solid C3008B;       /* The typewriter cursor */
white-space: nowrap;      /* Keeps the content on a single line */
margin: 0 auto;       /* Gives that scrolling effect as the typing happens */
// letter-spacing: .15em;    /* Adjust as needed */
animation: typing 15s steps(40, end), blink-caret .75s step-end infinite;
animation-iteration-count: infinite;

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: orange; }
  }
}
}
`
const NavContain = styled.div`
width: 100%;
height: 15%;
display: flex;
justify-content: space-between;
align-items: center;
`
const LogoHold = styled.div`

`
const Hold = styled.div`
.m1{
	margin-left: 30px;
	height: 80px;
  background-color: #F5FFFA;
	}
.m2{
	margin-left: 30px;
	height: 90px;
  border-radius: 50%;
	}
  @media screen and (max-width: 850px){
    .m1{
      margin-left: 30px;
      height: 60px;
      background-color: #F5FFFA;
      }
    .m2{
      margin-left: 30px;
      height: 60px;
      border-radius: 50%;
      }
  }
`
const MobileIcon = styled.div`
display: none;
@media screen and (max-width: 850px){
display: block;
position: absolute;
right: 20px;
color: red;
}
`
const Navig = styled.ul`
list-style: none;
width: 55%;
display: flex;
justify-content: space-around;
align-items: center;
margin-top: 20px;

@media screen and (max-width: 850px){
display: flex;
flex-direction: column;
position: absolute;
top: 40px;
height: 30vh;
width: 100%;
background-color: navy;
left: ${({click}) => (click ?  '-100%' : 0)};
transition: all 2s ease;
z-index: 1;
}
`
const Navlink= styled.div`;
font-size: 17px;
cursor: pointer;
width: 90px;
text-align: center;
border: 2px solid white;
border-radius: 10px;

&:hover {
	background-color: orange;
  border: transparent;
}
@media screen and (max-width: 850px){
	margin-top: 20px;
  border: none;

  &:hover {
    background-color: transparent;
    border-bottom: 2px solid whitesmoke;
  }
`