import React, { Component } from 'react'
import ConsultantService from '../services/ConsultantService';

export default class ViewConsultant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ohr: this.props.match.params.ohr,
            consultant: {},
            showMe: false
        }
    }

    componentDidMount() {
        ConsultantService.getConsultantByOhr(this.state.ohr).then(res => {
            this.setState({ consultant: res.data });
        })
    }

    cancel() {
        this.props.history.push('/consultants');
    }

    operation() {
        this.setState({
            showMe: !this.state.showMe
        })
    }

    render() {
        return (
            <div className='body'>
                <div className="card col-md-6 offset-md-3">
                    <h2 className="text-center head">View Consultant Details</h2>
                    <div className="card-body">
                        <div className="text-center">
                            <b>Name:</b> {this.state.consultant.name}
                        </div>
                        <div className="text-center">
                            <b>Location:</b> {this.state.consultant.location}
                        </div>
                        <div className="text-center">
                            <b>OHR:</b> {this.state.consultant.ohr}
                        </div>
                        {
                            this.state.showMe ?
                            <div>
                                <div className="text-center">
                                <b>Manager:</b> {this.state.consultant.manager}
                                </div>
                                <div className="text-center">
                                <b>Project:</b> {this.state.consultant.project}
                                </div>
                                <div className="text-center">
                                <b>Description:</b> {this.state.consultant.description}
                                </div>
                            </div>
                                : null
                        }
                        <div className='text-center'>
                            <br></br>
                            <button onClick={() => this.operation()}> {this.state.showMe? <b>Show Less</b>:<b>Show More</b>}</button>
                            &ensp;
                            <button className='Danger' onClick={this.cancel.bind(this)}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
