import React, { useEffect, useState } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME,QUERY_WISDOMS } from '../utils/queries';
import Auth from '../utils/auth';
import AboutForm from '../components/AboutForm';
import { ADD_MENTOR, DELETE_USER } from '../utils/mutations';
import WisdomForm from '../components/WisdomForm';
import WisdomList from '../components/WisdomList';
import UserList from '../components/UserList';


const Profile = (props) => {
  const loggedIn = Auth.loggedIn();
  const { username } = useParams();  
  const [addMentor] = useMutation(ADD_MENTOR);
  const [topic, setTopic] = useState("everything");
  const [mentor,setMentor] = useState("");
  const [deleteUser] = useMutation(DELETE_USER);

  // useEffect(() => {
  //   console.log(`/profile/${ username }`);
  // });
  //user query
  const { loading, data } = useQuery(username ? QUERY_USER : QUERY_ME, {
    variables: { username: username },
  });

  const { loading:wisdomLoading, data:wisdoms } = useQuery(QUERY_WISDOMS);

  const user = data?.me || data?.user || {};
  console.log("user ", user)
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === username) {
    return <Navigate to="/profile" />;
  }   

  if (loading||wisdomLoading) {
    return <div>Loading...</div>;
  }

  const wisdomsArr=wisdoms.wisdoms

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }



  //type of profile logic
  var userMentor=false;
  var userMentee=false;
  var mentorProfile=false;
  var userProfile=false;
  var bothProfile=false;
  if(!username && user.role==="Mentor"){
    userMentor=true;
  }
  if(!username && user.role==="User"){
    userMentee=true;
  }

  if(username&&user.role==="Mentor"){
    mentorProfile=true;
  }
  if(username&&user.role==="User"){
    userProfile=true;
  }
  if(userMentor||userMentee){
    bothProfile=true;
  }

    //topic select dropdown 
    const handleTopicChange = (event) => {
      setTopic(event.target.value);
    }

    //handle mentor select click logic
    const handleMentorSelect = async (event) => {
      setMentor(event.target.value)
      console.log(mentor)
    };
  
    //handle topic click logic
    const handleAddMentor = async () => {
      try {
        await addMentor({variables: { id: user._id }});
        console.log(user.interests)
      } catch (e) {
        console.error(e);
      }
    };

    const handleDeleteUser = async () => {
      try {
        await deleteUser({variables: { id: user._id}});
        Auth.logout();
        return <Navigate to="/"/>;
      } catch (e) {
        console.error(e);
      }
    }

  ///
  console.log(wisdomsArr)
  return (
    <main className= "justify-space-around">
      <div className=" mb-3 is-justify-content-center ">
        <h2 className="bg-secondary is-black-bis p-1 profileTitle mb-3 has-text-centered is-size-4-mobile">
          Viewing {username ? `${user.username}'s profile` : `your profile ${user.username}`}
        </h2>
        
        <div className='textClass'>
        <div className='card-header-title has-text-black is-flex'>
        <h4>About:</h4>
        </div>
        <section className='card-content mb-3'>{user.aboutText ? `${user.aboutText}` : 'No about listed.'}</section>
        </div>

        
        {/* if the user is a Mentor looking at their own profile */}
        {userMentor &&
          <>
          
          <div className="col-12 mb-3">
            <AboutForm _id={user._id}/>
          </div>
          <div className="col-12 mb-3">
          
            <WisdomForm></WisdomForm>
          </div>
          
            <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
               <WisdomList
                wisdoms={wisdomsArr}
                username={user.username}
                topic="everything"
              />

          </div>
          </>  
        }

        {/* if the user is a Mentee looking at their own profile */}
        {userMentee &&
          <>
          
          <div className="col-12 mb-3">
            <AboutForm _id={user._id}/>
          </div>

          
            <div className="col-12 mb-3 textClass p-3">
              <h4 className='is-justify-content-left'>Your Mentors:</h4>
              {user.mentors ? (user.mentors).map(mentor => (
                <>
                <button className="btn w-100 display-block mb-2" key={mentor._id}>
                  <Link to={`/profile/${mentor.username}`}>{mentor.username}</Link>
                </button>

                </>
              )):
              <h5>Go find some mentors!</h5>}
            </div>  
{/* topic dropdown */}
      <div className='tile is-parent flex-row justify-space-around mb-3 has-text-centered'>
        <div className='about col-12 mb-3 justify-space-around  textClass'>
             <h5 className='p-3 '>Select a topic:</h5>
            <div className="dropdown is-hoverable mb-3 justify-space-around  ">

                <div className="dropdown-trigger justify-space-around ">
                  <button className="btn bg-secondary is-black-bis has-text-centered w-100" aria-haspopup="true" aria-controls="dropdown-menu2">
                    <span className=''>Topics!</span>
                  </button>
                </div>

                {/* topic dropdown */}
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

            {/* displays mentors for wisdom filter */}
            {user.mentors ? 
            <div className="p-3">
              <h5>Select If you want to see a specific mentors wisdom</h5>
              {(user.mentors).map(mentor => (
                <>
                <button onClick={handleMentorSelect} value={mentor.username} className="button is-outlined is-link is-light is-responsive is-fullwidth mb-1">
                  {mentor.username}
                </button>
                </>
              ))}
            </div>
              :
              <h4>Go find some mentors!</h4>
              }
</div>
        {/* describes the mentor and topic being seen */}
        
        {userMentee &&
        <h5 className='textClass p-3 w-100 has-text-center '>viewing {mentor}'s wisdom for {topic}</h5>
        }
        
        <WisdomList
              wisdoms={wisdomsArr}
              username={mentor}
              interest={topic}   
        ></WisdomList>
      </div>
      
          
                
          
          </>  
        }
      </div>


        {/* looking at a mentor profile */}
        {mentorProfile&& 
          <div className="col-12 col-lg-3 mb-3 justify-space-around has-text-centered">
              <button className="btn mx-auto w-75 justify-space-around" onClick={handleAddMentor}>
                  Add Mentor
              </button>
              <WisdomList
                wisdoms={wisdomsArr}
                username={user.username}
                topic="everything"
              />
          </div> 
          }
          
          {/*  looking at a user profile  */}
          {userProfile && 
            <div className="col-12 mb-3">
              <h1 className='is-justify-content-left'>Mentors:</h1>
              {user.mentors && (user.mentors).map(mentor => (
                  <button className="btn w-100 display-block mb-2" key={mentor._id}>
                    <Link to={`/profile/${mentor.username}`}>{mentor.username}</Link>
                  </button>
                ))}
            </div>     
          }
          {bothProfile&&
          <div className='has-text-centered is-centered'>
            <h6 className='has-text-centered mt-6 textClass justify-space-around w-100'>Would you like to leave Life Sherpa?</h6>
            <button className="btn justify-space-around w-25 mb-3" onClick={handleDeleteUser}>
                    Delete Account
            </button>
          </div>
          }
      </main> 
      
  );
};

export default Profile;
