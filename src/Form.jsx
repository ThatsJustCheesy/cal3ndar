import DateTimePicker from 'react-datetime-picker';

export function Form(props) {
  function onSubmit(event) {
    event.preventDefault();
    
    if (props.onSubmitInitiated) props.onSubmitInitiated();
    
    const req = new XMLHttpRequest();
    req.open(props.method, props.url);
    req.onload = () => {
      ((200 <= req.status && req.status < 300) ? props.onSubmitSuccess : props.onSubmitError)(req.response);
    };
    req.onerror = props.onSubmitError;
    req.send(new URLSearchParams(props.data));
  }
  
  return (
    <form action={props.apiURL + '/events'} method="post" onSubmit={onSubmit}>
      {props.children}
    </form>
  );
}

export function InputFormField(props) {
  return (
      <div className="form-field">
        <label htmlFor={props.id}>{props.label} </label>
        <input
          className="input input-large"
          
          type={props.type}
          name={props.name ?? props.id}
          id={props.id}
          required={props.required}
          placeholder={props.placeholder ?? (props.required ? 'Required' : '')}
          
          onInput={({target: {value}}) => props.setData({...props.data, [props.name ?? props.id]: value})}
        />
      </div>
  );
}
export function TextAreaFormField(props) {
  return (
      <div className="form-field">
        <label htmlFor={props.id}>{props.label} </label>
        <textarea
          className="input textarea-large"
          
          name={props.name ?? props.id}
          id={props.id}
          required={props.required}
          placeholder={props.placeholder ?? (props.required ? 'Required' : '')}
          rows={props.rows}
          
          onInput={({target: {value}}) => props.setData({...props.data, [props.name ?? props.id]: value})}
        />
      </div>
  );
}
export function DateTimeFormField(props) {
  const name = props.name ?? props.id;
  return (
      <div className="form-field">
        <label htmlFor={props.id}>{props.label} </label>
        <DateTimePicker
          className="input datetime-picker"
          
          id={props.id}
          value={props.data[name] ? new Date(1000 * props.data[name]) : undefined}
          onChange={value => props.setData({...props.data, [name]: value.getTime() / 1000})}
          format="y/MM/dd HH:mm"
          yearPlaceholder="year"
          monthPlaceholder="month"
          dayPlaceholder="day"
          minDate={new Date(1609477200000)} // 1 January 2021
          
          required={props.required}
        />
      </div>
  );
}
export function SubmitButton(props) {
  return (
    <div className="form-field">
      <button className="input button-large" type="submit" disabled={!props.enabled}>
        {props.label}
      </button>
    </div>
  );
}
