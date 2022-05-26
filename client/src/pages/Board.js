import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const  Board= (props) => {

  // const { username: userParam } = useParams();

  // const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
  //   variables: { username: userParam },
  // });

  // const user = data?.me || data?.user || {};

  // navigate to personal profile page if username is yours
  // if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
  //   return <Navigate to="/profile:username" />;
  // }

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (!user?.username) {
  //   return (
  //     <h4>
  //       You need to be logged in to see this. Use the navigation links above to
  //       sign up or log in!
  //     </h4>
  //   );
  // }
  
  return (
    <div>
    <h1>Mentor Board</h1>


      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          {/* <ThoughtList
            thoughts={user.thoughts}
            title={`${user.username}'s thoughts...`}
          /> */}
        </div>

        <div className="col-12 col-lg-3 mb-3">
          {/* <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          /> */}
        </div>
      </div>
      {/* <div className="mb-3">{!userParam && <ThoughtForm />}</div> */}
    </div>
  );
};

export default Board;