import React, { useState } from 'react';
import Form from './Form.jsx'
import './App.css';

const defaultCalendarSrc = "https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FToronto&src=Zzh1ZGFmNWg1ZTBocmptc21mZm1nY3NxYzBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23B39DDB&showTitle=0&showNav=1&showDate=1&showPrint=0&showCalendars=0&showTz=1&mode=AGENDA";

export default function App(props) {
  // Maintain as state to allow reloading frame contents.
  const [calendarSrc, setCalendarSrc] = useState(defaultCalendarSrc);
  
  const calendar = <iframe title="Google Calendar" src={calendarSrc} style={{ borderWidth: 0 }} width="600" height="600" frameborder="0" scrolling="no"/>;
  
  const form = (
    <Form url={props.apiURL + '/events'} method="post" onSubmitted={ () => {
      setCalendarSrc('');
      setCalendarSrc(defaultCalendarSrc);
    } } onError={ (err) => { console.log('Form submission error: ' + err); } }>
      <h2>Add new event</h2>
      <div className="form-field">
        <label for="summary">Title </label>
        <input type="text" name="summary" id="summary" required placeholder="Required"/>
      </div>
      <div className="form-field">
        <label for="start">Starts </label>
        <input type="datetime-local" name="start" id="start" required/>
      </div>
      <div className="form-field">
        <label for="end">Ends </label>
        <input type="datetime-local" name="end" id="end" required/>
      </div>
      <div className="form-field">
        <label for="description">Description </label>
        <textarea name="description" id="description" rows="6"/>
      </div>
      <div className="form-field">
        <label for="location">Location </label>
        <input type="text" name="location" id="location"/>
      </div>
      <div className="form-field">
        <button type="submit">Add</button>
      </div>
    </Form>
  );
  
  return (
    <div className="Outer">
      <h1>Calεnδar 🗓</h1>
      <div className="App">
        <div className="Calendar">
          {calendar}
        </div>
        {form}
      </div>
    </div>
  );
}
