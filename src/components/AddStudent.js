import React, { Component } from 'react';
import StudentDataService from '../services/Student.service';

export default class AddStudent extends Component {
  constructor(props){  //ทำทันที
    super(props);  // ส่งให้คลาสแม่

    this.onChangeid = this.onChangeid.bind(this)
    this.onChangestudentsName = this.onChangestudentsName.bind(this);
    this.onChangelastname = this.onChangelastname.bind(this);
    this.onChangeuniversity = this.onChangeuniversity.bind(this);
    this.saveStudent = this.saveStudent.bind(this);
    this.newStudent = this.newStudent.bind(this);

    this.state = {
      id: null,
      Name: "",
      lastname: "",
      university:"",
      Graduate: false,
      submitted: false
    }
  }

  onChangeid(e) {
    this.setState({
      id: e.target.value
    })
  }

  onChangestudentsName(e) {
    this.setState({
      studentsName: e.target.value
    });
  }

  onChangelastname(e) {
    this.setState({
      lastname: e.target.value
    });
  }

  onChangeuniversity(e) {
    this.setState({
      university: e.target.value
    })
  }

  saveStudent() {
    var data = {
      id: this.state.id,
      studentsName: this.state.studentsName,
      lastname: this.state.lastname,
      university: this.state.university
    };

    StudentDataService.create(data)
      .then( response => {
        this.setState({
          id: response.data.id,
          studentsName: response.data.studentsName,
          lastname: response.data.lastname,
          university: response.data.university,
          Graduate: response.data.Graduate,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  newStudent(){
    this.setState({
      id: null,
      studentsName: "",
      lastname: "",
      university:"",
      Graduate: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className='submit-form'>
        {this.state.submitted ? (
          <>
            <h4>You submitted successfully</h4>
            <button className='btn btn-success' onClick={this.newStudent}>Add</button>
          </>
        ) : (
          <>
          <div className='form-group'>
              <label htmlFor='title'>ID : {this.state.id}</label>
              <input type='text' 
                className='form-control' 
                id='id' value={this.state.id}
                onChange={this.onChangeid}
                name='ID'
                required />
            </div>
            <div className='form-group'>
              <label htmlFor='title'>studentsName: {this.state.studentsName}</label>
              <input type='text' 
                className='form-control' 
                id='Name' value={this.state.studentsName}
                onChange={this.onChangestudentsName}
                name='Name'
                required />
            </div>
            <div className='form-group'>
              <label htmlFor='lastname'>lastname: {this.state.lastname}</label>
              <input type='text' 
                className='form-control' 
                id='lastname' value={this.state.lastname}
                onChange={this.onChangelastname}
                name='lastname'
                required />
            </div>
            <div className='form-group'>
              <label htmlFor='university'>university: {this.state.university}</label>
              <input type='text' 
                className='form-control' 
                id='university' value={this.state.university}
                onChange={this.onChangeuniversity}
                name='university'
                required />
            </div>
            <br/>
            <button onClick={this.saveStudent} 
              className='btn btn-success'>
                Submit
            </button>
          </>
        )}
      </div>
    )
  }
}
