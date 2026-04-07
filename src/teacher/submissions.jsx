import React from 'react';

import { SubmissionEvent, SubmissionNotifier } from '../scores/submissionNotifier';
//import './players.css';

export function Submissions(props) {
  const userName = props.user;

  const [events, setEvent] = React.useState([]);

  React.useEffect(() => {
    SubmissionNotifier.addHandler(handleSubmissionEvent);

    return () => {
      SubmissionNotifier.removeHandler(handleSubmissionEvent);
    };
  });

  function handleSubmissionEvent(event) {
    setEvent([...events, event]);
  }

  function createMessageArray() {
    const messageArray = [];
    for (const [i, event] of events.entries()) {
      let message = 'unknown';
      if (event.type === SubmissionEvent.Submit) {
        message = `${event.value.from} has submitted\n`;
        message = `${event.from} has submitted`;
      }

      messageArray.push(
        <div key={i} className='event'>
          <span className={'player-event'}>{event.from}</span>
          {message}
        </div>
      );
    }
    return messageArray;
  }

  return (
    <div className='players'>
      New Submissions:
      <span className='player-name'></span>
      <div id='player-messages'>{createMessageArray()}</div>
    </div>
  );
}
