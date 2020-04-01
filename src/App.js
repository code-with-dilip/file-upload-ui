import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class App extends Component {


  constructor(props) {
    super(props);
      this.state = {
        selectedFile: null,
        error: '',
        msg: ''
      }
   
  }

  uploadFile = (event) => {
    //event.preventDefault();
    this.setState({error: '', msg: ''});

    if(!this.state.selectedFile) {
      this.setState({error: 'Please upload a file.'})
      return;
    }

    if(this.state.selectedFile.size >= 2000000) {
      this.setState({error: 'File size exceeds limit of 2MB.'})
      return;
    }

    let data = new FormData();
    data.append('file', this.state.selectedFile);
    data.append('name', this.state.selectedFile.name);
    data.append('randomString', "{\"name\":\"dilip\"}");
    axios.post("http://localhost:8080/fileUpload", data)
  .then(res => { // then print response status
    console.log(res)
    this.setState({
      msg: 'File Uploaded Successfully'
    })
  })
  .catch(err => { // then print response status
    console.log(err)
    this.setState({
      error: err.statusText
    })
  })
}

  onFileChange = (event) => {
    this.setState({
      file: event.target.files[0]
    });
  }

  onFileChangeHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-intro">
          <h3>Upload a file</h3>
          <h4 style={{color: 'red'}}>{this.state.error}</h4>
          <h4 style={{color: 'green'}}>{this.state.msg}</h4>
          {/* <input onChange={this.onFileChange} type="file"></input>*/}
          <input onChange={this.onFileChangeHandler} type="file"></input>

          <button onClick={this.uploadFile}>Upload</button>   
        </div>
      </div>
    );
  }
}
export default App;