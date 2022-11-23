import React, { Component } from 'react'
import ConsultantService from '../services/ConsultantService';

export default class UpdateConsultant extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      location: '',
      
      manager:'',
      project:'',
      description:'',
      ohr: this.props.match.params.ohr,
    }
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeLocationHandler = this.changeLocationHandler.bind(this);
    this.changeOhrHandler = this.changeOhrHandler.bind(this);
    this.changeManagerHandler=this.changeManagerHandler.bind(this);
    this.changeProjectHandler=this.changeProjectHandler.bind(this);
    this.changeDescriptionHandler=this.changeDescriptionHandler.bind(this);
    this.updateConsultant = this.updateConsultant.bind(this);
  }

  componentDidMount() {
    ConsultantService.getConsultantByOhr(this.state.ohr).then((res) => {
      let consultant = res.data;
      this.setState({
        name: consultant.name,
        location: consultant.location,
        ohr: consultant.ohr,
        manager: consultant.manager,
        project: consultant.project,
        description: consultant.description
      });
    });
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

  updateConsultant = (e) => {
    e.preventDefault();
    let consultant = { name: this.state.name, location: this.state.location, ohr: this.state.ohr, manager: this.state.manager, project: this.state.project, description: this.state.description};
    console.log('consultant=>' + JSON.stringify(consultant));

    ConsultantService.updateConsultant(consultant).then((res) => {
      console.log(res.data);
      this.props.history.push('/consultants');
    })
      .catch(function (e) {
        if (e.response.status == 404 || e.response.status == 400) {
          alert("Consultant OHR can not be updated");

        }
      });
  }

  cancel() {
    this.props.history.push('/consultants');
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 className='text-center head'>Update Consultant Form</h2>
            <div className='card-body'>
              <form>
                <div>
                  <label>Name:</label>
                  <input name="name" className="form-control" value={this.state.name} onChange={this.changeNameHandler}></input>
                </div>
                <div>
                  <label>Job Location:</label>
                  <input name="location" className="form-control" value={this.state.location} onChange={this.changeLocationHandler}></input>
                </div>
                <div>
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
                  <button className='view' onClick={this.updateConsultant}>Update</button>
                  &ensp;
                  <button className='Danger' onClick={this.cancel.bind(this)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
