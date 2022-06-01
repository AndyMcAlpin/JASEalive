import { VariablesAreInputTypesRule } from 'graphql';
import React from 'react';
import { Link } from 'react-router-dom';

const WisdomList = ({wisdoms, interest, username}) => {
  var wisdomArr=wisdoms

  console.log(wisdoms)
  if(username){
    wisdomArr=wisdoms.filter(wisdom=>wisdom.username===username)
    
  }

  
  // const codingArr=[]
  // const musicArr=[]
  // const fitnessArr=[]
  // const financeArr=[]
  // const parentingArr=[]
  
  // conditionals that give the correct wisdom..
  var codingWisdom = false
  if(interest==="coding"){
    codingWisdom=true;
    wisdomArr=wisdoms.filter(wisdom=>wisdom.topic==="coding")
  }
  else if(interest==="music"){
    wisdomArr=wisdoms.filter(wisdom=>wisdom.topic==="music")
  }
  else if(interest==="fitness"){
    wisdomArr=wisdoms.filter(wisdom=>wisdom.topic==="fitness")
  }
  else if(interest==="finance"){
    
    wisdomArr=wisdoms.filter(wisdom=>wisdom.topic==="finance")
  }
  else if(interest==="parenting"){
    wisdomArr=wisdoms.filter(wisdom=>wisdom.topic==="parenting")
  }
  else if(interest==="gaming"){
    wisdomArr=wisdoms.filter(wisdom=>wisdom.topic==="gaming")
  }
  else{
    wisdomArr=wisdoms
  }

  if(username){
    wisdomArr=wisdomArr.filter(wisdom=>wisdom.username===username)

  }

  console.log(wisdomArr)
  if (!wisdomArr.length) {
    return <h3>No Wisdoms Yet</h3>;
  }
  return (
    <div className="tile columns is-multiline  is-parent justify-space-around has-text-centered col-md-6">
      {/* <h3>{title}</h3> */}
      {wisdomArr &&
        wisdomArr.map(wisdom => (
          <div key={wisdom._id} className="column m-3 is-child box col-md-12 ">
            <div className="card-header">
              <Link
                to={`/profile/${wisdom.username}`}
                style={{ fontWeight: 700 }}
                className="text-dark"
              >
                {wisdom.username}
              </Link>{' '}
              {/* thought on {wisdom.createdAt} */}
            </div>
            <div className="column card-body">
              <p>{wisdom.wisdomText}</p>
            </div>
            {wisdom.youTubeLink &&
            <iframe width="280" height="158" src={`https://www.youtube.com/embed/${wisdom.youTubeLink}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            }
          </div>
        ))}
    </div>
  );
};

export default WisdomList;
