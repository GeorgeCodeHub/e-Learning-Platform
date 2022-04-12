import React from 'react';
import Page from './Page';

import Blue from "../../../utils/Blue.png"

const SinglePage = ({id, userData, score}) => (<Page singleMode={true} id={id}>
  <div style={{width:"100%",height:"100%", background:"white"}}>
  <h1 style={{color:"#1890ff", textAlign:"center"}}>Knowledge Seekers</h1>
  <div style={{color:"black",textAlign:"center"}}>This paper certifies that <div style={{color:"#1890ff", padding:15}}>{userData.firstName} {userData.lastName}</div> 
  has successfully completed the course:</div>

  <h1 style={{color:"black",textAlign:"center"}}>Mastering Communication Skills</h1>
  <p style={{color:"black",textAlign:"center"}}>With an overall score of <span  style={{color:"#1890ff", fontWeight: "bold"}}>{score}</span>/10</p>
  <div className="tc">
    <img src={Blue} alt="logo" className="h5"/>
    <div style={{color:"grey"}}>
      This course was directed by the Unipi department.
    </div>
    </div>
  </div>
</Page>);

export default SinglePage;