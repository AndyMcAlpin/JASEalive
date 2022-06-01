import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_WISDOM } from '../../utils/mutations';
import { QUERY_ME, QUERY_WISDOM, QUERY_WISDOMS } from '../../utils/queries';


const WisdomForm = () => {
    var topic;
    const [wisdomText, setText] = useState('');
    const [youTubeLink, setLink] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [formState, setFormState] = useState({ topic: 'everything'});

    const handleChange = event => {
        if (event.target.value.length <= 500) {
          setText(event.target.value);
          setCharacterCount(event.target.value.length);
        }
      };
      const handleChange3 = event => {
        if (event.target.value.length <= 12) {
          setLink(event.target.value);
          setCharacterCount(event.target.value.length);
        }
      };
      // update state based on form input changes
      const handleChange2 = (event) => {
        const { name, value } = event.target;
        console.log(name)
        setFormState({
          ...formState,
          [name]: value,
        });
      };
      //const [addWisdom, { error }] = useMutation(ADD_WISDOM)
      // this isnt working
      const [addWisdom, { error }] = useMutation(ADD_WISDOM, {
        update(cache, { data: { addWisdom } }) {
            // could potentially not exist yet, so wrap in a try/catch
          try {
            // update me array's cache
            const { me } = cache.readQuery({ query: QUERY_ME });
            console.log(me)
            cache.writeQuery({
              query: QUERY_ME,
              data: { me: { ...me, wisdoms: [...me.wisdoms, addWisdom] } },
            });
          } catch (e) {
            
            console.log(e)
          }
          // update wisdom array's cache
          console.log("this is it")
          //saying wisdoms is undefined
          const { wisdoms } = cache.readQuery({ query: QUERY_WISDOMS });
          console.log("this is not it")
          cache.writeQuery({
            query: QUERY_WISDOMS,
            data: { wisdoms: [addWisdom, ...wisdoms] },
          });
        }
      });
      

      const handleFormSubmit = async event => {
        event.preventDefault();
        
        try {
          // add wisdom to database
          await addWisdom({
            variables: { wisdomText, youTubeLink, topic }
            
          });
          // clear form value
          setText('');
          setLink('');
          setCharacterCount(0);
        } catch (e) {
          console.error(e);
        }
      }; 

  return (

    <div className='p-3 textClass'>
    <h4>Add a Wisdom:</h4>
        <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
        </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
        placeholder="This is the wisdom I would like to give..."
        value={wisdomText}
        className="form-input col-12 "
        onChange={handleChange}
        ></textarea>
        <h6>Add your Youtube video (optional)</h6>
        <textarea
        placeholder="Copy everything after the = from the url of the youTube video "
        value={youTubeLink}
        className="form-input col-12 "
        onChange={handleChange3}
        ></textarea>
        <h6>Select a topic:</h6>
        <select                
          className="form-input"
          name="topic"
          type="topic"
          id="topic"
          value={topic}
          onChange={handleChange2}>
          <option value="coding">Coding</option>
          <option value="music">Music</option>
          <option value="fitness">Fitness</option>
          <option value="finance">Finance</option>
          <option value="finance">Gaming</option>
          <option value="parenting">Parenting</option>
          <option value="everything">Everything</option>
        </select>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default WisdomForm;