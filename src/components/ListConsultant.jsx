import React, { Component } from 'react'
import ConsultantService from '../services/ConsultantService'

export default class ListConsultant extends Component {
    constructor(props) {
        super(props)
        this.state = {
            consultants: []
        }
        this.addConsultant = this.addConsultant.bind(this);
        this.editConsultant = this.editConsultant.bind(this);
        this.deleteConsultant = this.deleteConsultant.bind(this);
        //this.deleteConsultantByOhrs=this.deleteConsultantByOhrs(this);
    }

    componentDidMount() {
        ConsultantService.getConsultant().then((res) => {
            this.setState({ consultants: res.data });
        });
    }

    addConsultant() {
        this.props.history.push('/addconsultant');
    }

    editConsultant(ohr) {
        this.props.history.push(`/update-consultant/${ohr}`);
    }

    deleteConsultant(ohr) {
        ConsultantService.deleteConsultant(ohr).then(res => {
            this.setState({ consultants: this.state.consultants.filter(consultant => consultant.ohr !== ohr) });
        });
    }

    viewConsultant(ohr) {
        this.props.history.push(`/view-consultant/${ohr}`);
    }

    deleteConsultantByOhrs = () => {
        if (window.confirm("Are you sure to delete multiple items")) {
            const allInput = Array.from(document.getElementsByClassName('form-checked'));
            const selectedCheckboxOhrs = allInput.filter(input => input.checked).map(input => input.value);
            ConsultantService.deleteSelected(selectedCheckboxOhrs)
                .then(data => {
                    console.log(data);
                    ConsultantService.getConsultant().then((res) => {
                        this.setState({ consultants: res.data });
                    });
                })
        }
    }

    render() {
        return (
            <div>
                <div className='tab'>
                    <h2 className="text-center head" >Consultant List</h2>
                </div>
                <br></br>
                <div className='text-center'>
                    <button className='add' onClick={this.addConsultant}>Add Consultant</button>
                    &ensp;
                    <button className='Danger' onClick={() => this.deleteConsultantByOhrs()}>Delete Selected Consultant</button>
                </div>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th></th>
                                <th className='text-center'>OHR</th>
                                <th className='text-center'>Consultant Name</th>
                                <th className='text-center'>Job Location</th>
                                <th className='text-center'>Delete/Update</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.consultants.map(
                                    consultant =>
                                        <tr key={consultant.ohr}>
                                            <td className='text-center'>
                                                <label>
                                                    <input type="checkbox"
                                                        className='form-checked'
                                                        value={consultant.ohr}
                                                    ></input>
                                                </label>
                                            </td>
                                            <td className='text-center'>{consultant.ohr}</td>
                                            <td className='text-center'>{consultant.name}</td>
                                            <td className='text-center'>{consultant.location}</td>
                                            <td className='text-center'>
                                                <button className='add' onClick={() => this.editConsultant(consultant.ohr)}>Update</button>
                                                &ensp;
                                                <button className='Danger' onClick={() => { if (window.confirm("Are you sure to delete this item?")) this.deleteConsultant(consultant.ohr) }}>Delete</button>
                                                &ensp;
                                                <button className='view' onClick={() => this.viewConsultant(consultant.ohr)}>View</button>

                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}