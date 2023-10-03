import React, { Component } from 'react';
import StudentDataService from '../services/Student.service';
import { Link } from 'react-router-dom';

export default class StudentsList extends Component {
  constructor(props) { //ทำทันที
    super(props);//ส่งให้ตัวแม่

    this.onChangeSearchstudentsName=this.onChangeSearchstudentsName.bind(this);
    this.retrieveStudents=this.retrieveStudents.bind(this);
    this.refreshList=this.refreshList.bind(this);
    this.setActiveStudent=this.setActiveStudent.bind(this);
    this.removeAllStudents=this.removeAllStudents.bind(this);
    this.searchstudentsName=this.searchstudentsName.bind(this);

    

    this.state = {
      students: [], 
      currentStudent: null,
      currentIndex: -1,
      searchStudent: ""
    };
  }

  componentDidMount() { //ถูกเรียก หรือ เริ่มต้น จะทำงานทันที โดยที่เราไม่ต้องเรียก
    this.retrieveStudents();
  }

  onChangeSearchstudentsName(e){
    const searchstudentsName = e.target.value
    this.setState({
      searchstudentsName : searchstudentsName
    })
  }

  retrieveStudents(){ //ดึงออกมาทั้งหมดเพื่อแสดงรายการออกมา
    StudentDataService.getAll()
      .then(response => {
        this.setState({
          students: response.data
      });
      })
      .catch(err => {
        console.log(err);
      });
  }

  refreshList(){ //เอาไว้รีเฟรชข้อมูล และเซ็ตค่าข้อมูลใหม่ หรืออัพเดท
    this.retrieveStudents();
    this.setState({
      currentStudent: null,
      currentIndex: -1
    });
  }

  setActiveStudent(student, index){
    this.setState({
      currentStudent: student,
      currentIndex: index
    });
  }

  removeAllStudents(){
    StudentDataService.deleteAll()
    .then(response => {
      this.refreshList();
      
    })
    .catch(err => {
      console.log(err);
    })
  }

  searchstudentsName(){ //ค้นหาข้อมูล
    StudentDataService.findByName(this.state.searchstudentsName)
      .then(response => {
        this.setState({
          student: response.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    const {searchstudentsName, students, currentStudent, currentIndex} = this.state;

    return (
      <div className='list row'>
        <div className='col-md-8'>
          <div className='input-group mb-3'>
            <input 
              type='text'
              className='form-control'
              placeholder='Search Name'
              value={searchstudentsName}
              onChange={this.onChangeSearchstudentsName}
              />
            <div className='input-group-append'>
              <button
                className='btn btn-outline-secondary'
                type='button'
                onClick={this.searchstudentsName}
              >
                Search</button>
              </div>  
          </div>
        </div>
        <div className='col-md-6'>
          <h4>Student List</h4>

          <ul className='list-group'>
              {students && students.map((student,index) => (
              <li className={"list-group-item "+ (index === currentIndex ? "active" : "")}
                onClick={() => this.setActiveStudent(student, index)}
                key={index}>
                {student.studentsName}{" "}{student.lastname}</li>
            ))}         
          </ul>

          <button 
            className='btn btn-sm btn-danger m-3' 
            onClick={this.removeAllStudents}
            >
            RemoveAll
          </button>
        </div>
        <div className='col-md-6'>
                {currentStudent ? (
                <div>.
                  <h4>Student Detail</h4>
                  <div>
                    <label>
                      <strong>id :</strong>
                    </label>
                    {" "}
                    {currentStudent.id}
                  </div>
                  <div>
                    <label>
                      <strong>studentsName :</strong>
                    </label>
                    {" "}
                    {currentStudent.studentsName}
                  </div>
                  <div>
                    <label>
                      <strong>lastname :</strong>
                    </label>
                    {" "}
                    {currentStudent.lastname}
                  </div>
                  <div>
                    <label>
                      <strong>university :</strong>
                    </label>
                    {" "}
                    {currentStudent.university}
                  </div>
                  <div>
                    <label>
                      <strong>Status : </strong>
                    </label>
                    {" "}
                    {currentStudent.Graduate ? "Graduate" : "Didn't graduate"}
                  </div>
                </div>
                ) : (
                <div>
                  <br/>
                  <p>Please Click on a Name...</p>
                </div>
                )}
        </div>
      </div>
      
    )
  }
}
