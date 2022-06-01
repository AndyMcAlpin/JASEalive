import { VariablesAreInputTypesRule } from 'graphql';
import React from 'react';
import { Link } from 'react-router-dom';

const UserList = ({usersarr, role}) => {

  const mentorArr=usersarr.filter(user=>user.role==="Mentor")
  const menteeArr=usersarr.filter(user=>user.role==="User")
  console.log("mentors:",mentorArr)

  var mentorList = false
  if(role==="Mentor"&& mentorArr.length>0){
    mentorList=true;
  }
  var menteeList = false
  if(role==="User"&& menteeArr.length>0){
    menteeList=true;
  }

  return (
    <div className="tile is-child box">
      {mentorList ? mentorArr.map(user => (
        <button className="btn w-100 display-block mb-2 " key={user._id}>
          <Link to={`/profile/${user.username}`}>{user.username}</Link>
          <p>About: {user.aboutText}</p>
        </button>)):
        <p> No Mentors </p>
      }
      {menteeList && mentorArr.map(user => (
        <>
          <span>
          <Link to={`/profile/${user.username}`} >
          
          <button className="btn w-100 display-block mb-2" key={user._id}>
          {user.username}
          </button>
          
          </Link>
          </span>
        
        <p>About: {user.aboutText}</p>
        </>
        ))

        }
    </div>
  );
};

export default UserList;
