import React from 'react';
import { NavLink } from 'react-router-dom';

// eslint-disable-next-line react/prefer-stateless-function
const Fallback = () => {
  return (
    <div>
      <div id="fallback">
        <div id="post-error">That post doesn&apos;t exist!</div>
        <img src="https://media2.giphy.com/media/FGTVmzksb2j0k/giphy.gif?cid=ecf05e47f931kyk0ur61hvubf5uuq1fl4ocqn33mdiro5t87&rid=giphy.gif" alt="cat gif" />
        <NavLink to="/">
          <i className="fa fa-arrow-left" />  Back to recommendations
        </NavLink>
      </div>
    </div>
  );
};

export default Fallback;
