export default function Form(props) {
  function onSubmit(e) {
    e.preventDefault();
    
    const req = new XMLHttpRequest();
    req.open(props.method, props.url);
    req.onload = props.onSubmitted;
    req.onerror = props.onError;
    req.send(new URLSearchParams(new FormData(e.target)));
  }
  
  return (
    <form action={props.apiURL + '/events'} method="post" onSubmit={onSubmit}>
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
    </form>
  );
}
