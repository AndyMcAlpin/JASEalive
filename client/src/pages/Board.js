import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_WISDOMS, QUERY_USERS } from '../utils/queries';
import UserList from '../components/UserList';
import WisdomList from '../components/WisdomList';
import Auth from '../utils/auth';

const Board = (props) => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(QUERY_USERS);
  const { loading:wisdomLoading, data:wisdoms } = useQuery(QUERY_WISDOMS);
  const [topic, setTopic] = useState("everything");

  if (loading||wisdomLoading) {
    return <div>Loading...</div>;
  }

  var wisdomsArr=wisdoms.wisdoms
  // const { loading, data } = useQuery(userParam ? QUERY_USERS : QUERY_ME, QUERY_MENTOR, {  // ADDED QUERY_MENTOR HERE
  //   variables: { username: userParam },
  // });
  // const user = data?.me || data?.user || data?.mentor || {};  // ADDED data?.mentor HERE

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
    wisdomsArr = wisdomsArr.filter(wisdoms => wisdoms.topic === topic)
  }

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/board" />;
  }

  // if (!user?.username) {
  //   return (
  //     <h4>
  //       You need to be logged in to see this. Use the navigation links above to
  //       sign up or log in!
  //     </h4>
  //   );
  // }
  
  return (
    <div className="tile is-ancestor justify-space-around">

      <div className="is-3 is-vertical is-transparent is-parent mb-3 justify-space-around mt-3 col-md-6">
        <div className= "tile is-child textClass p-3 mt-3">
            <h2 className="is-underlined has-text-black-bis">List Of Mentors</h2>
            <UserList usersarr={data.users} role="Mentor"></UserList>  
        </div>
      </div>


      <div className='tile is-parent flex-row justify-space-around mb-3'>
        <div className='about col-12 mb-3 justify-space-around textClass has-text-centered topic_container'>
          <h4 className='p-3  w-100'>Select a topic:</h4>
          <div className="dropdown is-hoverable mb-3">
            <div className="dropdown-trigger">
              <button className="btn bg-secondary w-100 is-black-bis ml-3" aria-haspopup="true" aria-controls="dropdown-menu2">
                <span>Topics!</span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu2" role="menu">
              <div className="dropdown-content">
                <div className="dropdown-item">
                  <button onClick={handleTopicChange} value="coding" className="button is-outlined is-link is-light is-responsive is-fullwidth">Coding</button>
                </div>
                <div className="dropdown-item">
                  <button onClick={handleTopicChange} value="fitness" className="button is-outlined is-link is-light is-responsive is-fullwidth">Fitness</button>
                </div>
                <div className="dropdown-item">
                  <button onClick={handleTopicChange} value="music" className="button is-outlined is-link is-light is-responsive is-fullwidth">Music</button>
                </div>
                <div className="dropdown-item">
                  <button onClick={handleTopicChange} value="finance" className="button is-outlined is-link is-light is-responsive is-fullwidth">Finance</button>
                </div>
                <div className="dropdown-item">
                  <button onClick={handleTopicChange} value="gaming" className="button is-outlined is-link is-light is-responsive is-fullwidth">Gaming</button>
                </div>
                <div className="dropdown-item">
                  <button onClick={handleTopicChange} value="parenting" className="button is-outlined is-link is-light is-responsive is-fullwidth">Parenting</button>
                </div>
                <hr className="dropdown-divider"></hr>
                <div className="dropdown-item">
                  <button onClick={handleTopicChange} value="everything" className="button is-outlined is-primary is-light is-responsive is-fullwidth">Everything</button>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div id='box1'className='tile is-fluid col-12 mb-3 ml-3 is-transparent has-text-black-bis p-2 pl-9 pb-5 is-child'>
          <div  className='pl-9'>
            <h2 className='title2 has-text-black has-text-weight-medium'>Mentor Wisdom:</h2>
            <WisdomList wisdoms={wisdomsArr} interest={topic}></WisdomList>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default Board;
