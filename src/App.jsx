import React, { useState } from 'react';
import { Form, InputFormField, DateTimeFormField, TextAreaFormField, SubmitButton } from './Form.jsx';
import './App.css';

const defaultCalendarSrc = "https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FToronto&src=Zzh1ZGFmNWg1ZTBocmptc21mZm1nY3NxYzBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23B39DDB&showTitle=0&showNav=1&showDate=1&showPrint=0&showCalendars=0&showTz=1&mode=AGENDA";

export default function App(props) {
  // Maintain as state to allow reloading frame contents.
  const [calendarSrc, setCalendarSrc] = useState(defaultCalendarSrc);
  
  const [formEnabled, setFormEnabled] = useState(true);
  const [lastSubmissionStatus, setLastSubmissionStatus] = useState('none');
  
  const lastSubmissionStatusText = {
    'success': '✅ Event added successfully; the calendar view may take a moment to refresh',
    'failure': '❌ The request failed'
  }[lastSubmissionStatus] ?? '';
  
  const [formData, setFormData] = useState({});
  
  return (
    <div className="Outer">
      <h1>Calεnδar 🗓</h1>
      <div className="App">
        
        <div className="Calendar">
          <iframe
            title="Google Calendar"
            src={calendarSrc}
            style={{ borderWidth: 0 }}
            width="600"
            height="600"
            frameBorder="0"
            scrolling="no"
            onLoad={event => {
            }}
          />
        </div>
        
        <div>
          <h2 className="flush-with-top">Add new event</h2>
          
          <Form
            url={props.apiURL + '/events'}
            method="post"
            
            data={formData}
            
            onSubmitInitiated={() => {
              setLastSubmissionStatus('none');
              setFormEnabled(false);
            }}
            
            onSubmitSuccess={() => {
              setLastSubmissionStatus('success');
              setFormEnabled(true);
              
              // Reload the calendar view.
              setCalendarSrc('');
              setCalendarSrc(defaultCalendarSrc);
            }}
            onSubmitError={err => {
              console.log('Form submission error: ' + err);
              
              setLastSubmissionStatus('failure');
              setFormEnabled(true);
            }}
            
          >
            <InputFormField id="summary" type="text" label="Title" required data={formData} setData={setFormData}/>
            <DateTimeFormField id="start" type="datetime-local" label="Starts" required data={formData} setData={setFormData}/>
            <DateTimeFormField id="end" type="datetime-local" label="Ends" required data={formData} setData={setFormData}/>
            <TextAreaFormField id="description" label="Description" rows="6" data={formData} setData={setFormData}/>
            <InputFormField id="location" type="text" label="Location" data={formData} setData={setFormData}/>
            <SubmitButton enabled={formEnabled} label={formEnabled ? 'Add' : 'Adding…'} data={formData} setData={setFormData}/>
          </Form>
          
          <p className={`note ${lastSubmissionStatus}-text`}>
            {lastSubmissionStatusText}
          </p>
        </div>
        
      </div>
    </div>
  );
}
