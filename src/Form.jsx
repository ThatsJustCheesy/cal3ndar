export function Form(props) {
  function onSubmit(e) {
    e.preventDefault();
    
    if (props.onSubmitInitiated) props.onSubmitInitiated();
    
    const req = new XMLHttpRequest();
    req.open(props.method, props.url);
    req.onload = props.onSubmitSuccess;
    req.onerror = props.onSubmitError;
    req.send(new URLSearchParams(new FormData(e.target)));
  }
  
  return (
    <form action={props.apiURL + '/events'} method="post" onSubmit={onSubmit}>
      {props.children}
      <div className="form-field">
        <button type="submit" disabled={!props.enabled}>
          {props.enabled ? 'Add' : 'Adding…'}
        </button>
      </div>
    </form>
  );
}

export function InputFormField(props) {
  return (
      <div className="form-field">
        <label htmlFor={props.id}>{props.label} </label>
        <input type={props.type} name={props.name ?? props.id} id={props.id} required={props.required} placeholder={props.placeholder ?? (props.required ? 'Required' : '')}/>
      </div>
  );
}
export function TextAreaFormField(props) {
  return (
      <div className="form-field">
        <label htmlFor={props.id}>{props.label} </label>
        <textarea name={props.name ?? props.id} id={props.id} required={props.required} placeholder={props.placeholder ?? (props.required ? 'Required' : '')} rows={props.rows}/>
      </div>
  );
}
