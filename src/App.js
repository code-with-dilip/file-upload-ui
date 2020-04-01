import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    file: '',
    error: '',
    msg: ''
  }

  uploadFile = (event) => {
    event.preventDefault();
    this.setState({error: '', msg: ''});

    if(!this.state.file) {
      this.setState({error: 'Please upload a file.'})
      return;
    }

    if(this.state.file.size >= 2000000) {
      this.setState({error: 'File size exceeds limit of 2MB.'})
      return;
    }

    let data = new FormData();
    data.append('file', this.state.file);
    data.append('name', this.state.file.name);

    fetch('http://localhost:8080/api/files', {
      method: 'POST',
      body: data
    }).then(response => {
      this.setState({error: '', msg: 'Sucessfully uploaded file'});
    }).catch(err => {
      this.setState({error: err});
    });

  }

  onFileChange = (event) => {
    this.setState({
      file: event.target.files[0]
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-intro">
          <h3>Upload a file</h3>
          <h4 style={{color: 'red'}}>{this.state.error}</h4>
          <h4 style={{color: 'green'}}>{this.state.msg}</h4>
          <input onChange={this.onFileChange} type="file"></input>
          <button onClick={this.uploadFile}>Upload</button>   
        </div>
      </div>
    );
  }
}
export default App;