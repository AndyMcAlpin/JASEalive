import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ABOUT } from '../../utils/mutations';
import { QUERY_ME, QUERY_ABOUT } from '../../utils/queries';

const AboutForm = ({_id}) => {
    
  
    const [aboutText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const handleChange = event => {
        if (event.target.value.length <= 1000) {
          setText(event.target.value);
          setCharacterCount(event.target.value.length);
        }
      };
      
      const [addAbout, { error }] = useMutation(ADD_ABOUT, {
        update(cache, { data: { addAbout } }) {
      
            // could potentially not exist yet, so wrap in a try/catch
          try {
            // update me array's cache
            const { me } = cache.readQuery({ query: QUERY_ME });
            console.log(me)
            // cache.writeQuery({
            //   query: QUERY_ME,
            //   data: { me: { ...me, aboutText: [...me.aboutText, addAbout] } },
            // });
          } catch (e) {
            console.log(e)
          }
      
          // update about cache
          const { me } = cache.readQuery({ query: QUERY_ME});
          console.log(me)
          cache.writeQuery({
            query: QUERY_ME,
            data: { aboutText: [addAbout, aboutText] },
          });
        }
      });
      
      const handleFormSubmit = async event => {
        event.preventDefault();
        try {
          // add about to database
          await addAbout({
            variables: { _id, aboutText }
          });
          // clear form value
          setText('');
          setCharacterCount(0);
        } catch (e) {
          console.error(e);
        }
      }; 
  return (

    <div className="p-3 textClass">
        <h4>Update your about:</h4>
        <p className={`m-0 ${characterCount === 1000 || error ? 'text-error' : ''}`}>
        Character Count: {characterCount}/1000
        {error && <span className="ml-2">Something went wrong...</span>}
        </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
        placeholder="Tell us about yourself and what you know..."
        value={aboutText}
        className="form-input  is-flex w-100"
        onChange={handleChange}
        ></textarea>
        <br></br>
        <button className="btn col-12 col-md-3 w-100" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AboutForm;