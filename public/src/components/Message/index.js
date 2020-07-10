import React from 'react';

import './style.css';

function Message(props) {
  return(
    <>
      <div className="message-block">
        { props.from === "me" ? <div className="message me">{props.value}</div> : <div className="message">{props.value}</div> }
      </div>
    </>
  );
}

export default Message;
