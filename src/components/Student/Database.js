import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import {datbase, storage} from '../../Base';
import {collection, getDocs} from 'firebase/firestore';
import {TextAnim} from "text-animations-react"

function Database() {

  const [lsetf, setLsetf] = useState ([]);

  const [facebook] = useState([]);

  const [github] = useState([]);

  const [linkedin] = useState([]);

  const [email] = useState([]);

  const [whatsapp] = useState([]);

  const usersCollectionRef = collection(datbase, "students")

  const getData = async () => {
    const data = await getDocs(usersCollectionRef)
  setLsetf(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
}

  useEffect(() => {
    getData();        
}, []);
  

  return (
    <Studcard>
       <TextAnim name="Students Database" 
     size={3} type="bounceone"
      color='green'
      count="infinite"
       duration={4}/>
      <Studlay>
        {lsetf.map((props) => (
        <Studmain>
       <Studmg><img src={props.image}/></Studmg>
       <Studname><strong>Name:</strong> {props.name}</Studname>
        <Studes><strong>Description:</strong> {props.description}</Studes>
        <Studlink>
        <a href={props.facebook}><i className= "fa-brands fa-facebook" ></i></a>
        <a href={props.linkedin}><i className="fa-brands fa-linkedin"></i></a>
        <a href={props.github}><i className="fa-brands fa-github"></i></a>
        <a href={props.email}><i className="fa-solid fa-envelope"></i></a>
        <a href={props.whatsapp}><i className="fa fa-whatsapp" ></i></a>
        </Studlink>
       
        </Studmain>
      ))}
      </Studlay>
    </Studcard>
  )
}

export default Database

const Studcard = styled.div`
 padding: 4rem;  
background: linear-gradient(to right top,#57FF00,#5B86B3);
`
const Studlay = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`
const Studmain = styled.div`
    margin: 2rem 2rem 2rem 0;
    background: linear-gradient(to bottom right, 
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.3));
    padding: 1.5rem;
    width: 250px;
    box-shadow: 1px 1px 1px #FFFAFA;
    // rgba(0,0,0,0.1);
    transition: transform .1s ease;
    cursor: pointer;

    :hover {
      transform: scale(1.2);
    }
`
const Studmg = styled.div`
  img{
  width: 150px;
  height:150px;
  border-radius: 50%;
}
`
const Studname = styled.div`
    font-size: 15px;
    font-weight: 500;
`
const Studes = styled.div`
    font-size: 12px;
    font-style: italic;       
`
const  Studlink  = styled.div`
    display: flex;
    justify-content: space-around;
    a{
      width: 30px;
      height:30px;
      border-radius: 50%;
      color: navy;
      :hover{
        color: green;
        transform: scale(1.2);
      }
    }
`