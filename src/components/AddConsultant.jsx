import React, { Component } from 'react'
import ConsultantService from '../services/ConsultantService';

export default class AddConsultant extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      location: '',
      ohr: '',
      manager:'',
      project:'',
      description:''
    }
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeLocationHandler = this.changeLocationHandler.bind(this);
    this.changeOhrHandler = this.changeOhrHandler.bind(this);
    this.changeManagerHandler=this.changeManagerHandler.bind(this);
    this.changeProjectHandler=this.changeProjectHandler.bind(this);
    this.changeDescriptionHandler=this.changeDescriptionHandler.bind(this);
    this.saveConsultant = this.saveConsultant.bind(this);
  }

  changeNameHandler = (e) => {
    this.setState({ name: e.target.value });
  }

  changeLocationHandler = (e) => {
    this.setState({ location: e.target.value });
  }

  changeOhrHandler = (e) => {
    this.setState({ ohr: e.target.value });
  }

  changeManagerHandler=(e)=>{
    this.setState({manager:e.target.value});
  }
  
  changeProjectHandler=(e)=>{
    this.setState({project:e.target.value});
  }

  changeDescriptionHandler=(e)=>{
    this.setState({description:e.target.value});
  }

  saveConsultant = (e) => {
    e.preventDefault();
    if (this.state.ohr == 0) {
      alert("Consultant OHR cannot be null");
      console.log("Ohr cannot be null");
    }
    else {
      let consultant = { name: this.state.name, location: this.state.location, ohr: this.state.ohr, manager: this.state.manager, project: this.state.project, description: this.state.description };
      console.log('consultant=>' + JSON.stringify(consultant));

      ConsultantService.createConsultant(consultant).then(res => {
        this.props.history.push('/consultants');
      })
        .catch(function (e) {
          if (e.response.status == 409) {
            alert("Consultant with " + consultant.ohr + " is already exist");
          }
          if (e.response.status == 400) {
            alert("Consultant OHR should be Numeric");
          }
        });
    }
  }

  cancel() {
    this.props.history.push('/consultants');
  }

  render() {
    return (
      <div>
        <div className='container'>
          <div className='row'>
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h2 className='text-center head'>Consultant Form</h2>
              <div className='card-body'>
                <form>
                  <div className='form-group'>
                    <label>Name:</label>
                    <input name="name" className="form-control" value={this.state.name} onChange={this.changeNameHandler}></input>
                  </div>
                  <div className='form-group'>
                    <label>Job Location:</label>
                    <input name="location" className="form-control" value={this.state.location} onChange={this.changeLocationHandler}></input>
                  </div>
                  <div className='form-group'>
                    <label>OHR:</label>
                    <input name="ohr" className="form-control" value={this.state.ohr} onChange={this.changeOhrHandler}></input>
                  </div>
                  <div className='form-group'>
                    <label>Manager:</label>
                    <input name="manager" className="form-control" value={this.state.manager} onChange={this.changeManagerHandler}></input>
                  </div>
                  <div className='form-group'>
                    <label>Project:</label>
                    <input name="project" className="form-control" value={this.state.project} onChange={this.changeProjectHandler}></input>
                  </div>
                  <div className='form-group'>
                    <label>Description:</label>
                    <input name="description" className="form-control" value={this.state.description} onChange={this.changeDescriptionHandler}></input>
                  </div>
                  <div className='text-center'>
                    <br></br>
                    <button className='view' onClick={this.saveConsultant}>Save</button>
                    &ensp;
                    <button className='Danger' onClick={this.cancel.bind(this)}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
