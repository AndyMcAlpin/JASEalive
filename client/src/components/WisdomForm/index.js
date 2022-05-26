import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_WISDOM } from '../../utils/mutations';
import { QUERY_ME, QUERY_WISDOM } from '../../utils/queries';


const WisdomForm = () => {
    
    const [wisdomText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const handleChange = event => {
        if (event.target.value.length <= 500) {
          setText(event.target.value);
          setCharacterCount(event.target.value.length);
        }
      };
      
      const [addWisdom, { error }] = useMutation(ADD_WISDOM, {
        update(cache, { data: { addWisdom } }) {
      
            // could potentially not exist yet, so wrap in a try/catch
          try {
            // update me array's cache
            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
              query: QUERY_ME,
              data: { me: { ...me, wisdom: [...me.wisdom, addWisdom] } },
            });
          } catch (e) {
            console.log(e)
          }
      
          // update wisdom array's cache
          const { wisdom } = cache.readQuery({ query: QUERY_WISDOM });
          cache.writeQuery({
            query: QUERY_WISDOM,
            data: { wisdom: [addWisdom, ...wisdom] },
          });
        }
      });
      
      const handleFormSubmit = async event => {
        event.preventDefault();
      
        try {
          // add wisdom to database
          await addWisdom({
            variables: { wisdomText }
          });
      
          // clear form value
          setText('');
          setCharacterCount(0);
        } catch (e) {
          console.error(e);
        }
      }; 
  return (

    <div>
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
        className="form-input col-12 col-md-9"
        onChange={handleChange}
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default WisdomForm;