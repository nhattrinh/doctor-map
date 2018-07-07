import React, { Component } from 'react';
import { connect } from 'react-redux';

import { firstNameChanged, middleNameChanged, lastNameChanged, submit, clearDoctors } from '../../redux/actions';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            middleName: ''
        };
    }

    handleSubmit(e) {
        if (this.state.firstName && this.state.lastName) {
            e.preventDefault();
            this.props.clearDoctors();
            this.props.submit(this.state.firstName, this.state.middleName, this.state.lastName);
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.firstName !== nextProps.firstName || prevState.middleName !== nextProps.middleName || prevState.lastName !== nextProps.lastName || nextProps.error !== prevState.error ) {
            return {
                firstName: nextProps.firstName,
                middleName: nextProps.middleName,
                lastName: nextProps.lastName,
                error: nextProps.error
            };
        }
        return null;
    }

    render() {
        return(
            <div style={{ backgroundColor:'light grey', padding:25, paddingTop:10 }}>
                <h5>Find Physician's Location by Name</h5>
                <br /><br />
                <form>
                    <label htmlFor='firstname' data-error='Please enter a first name'>First Name*</label>
                    <input id='firstname' required className='form-control' type='text' value={this.state.firstName} onChange={e => {this.props.firstNameChanged(e.target.value)}}/>
                    <br />
                    <label>Middle Name</label>
                    <input className='form-control' type='text' value={this.state.middleName} onChange={e => {this.props.middleNameChanged(e.target.value)}}/>
                    <br />
                    <label htmlFor='lastname' data-error='Please enter a last name'>Last Name*</label>
                    <input id='lastname' required className='form-control' type='text' value={this.state.lastName} onChange={e => {this.props.lastNameChanged(e.target.value)}}/>
                    <div className='right' style={{position: 'relative'}}>
                        <span style={{ color: 'red', fontSize: 10 }}>Fields with *(asterisk) are required</span>
                        <br />
                        <input className= 'btn right' type='submit' onClick={this.handleSubmit.bind(this)} />
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        firstName: state.search.firstName,
        middleName: state.search.middleName,
        lastName: state.search.lastName
    };
}

export default connect(mapStateToProps, { firstNameChanged, middleNameChanged, lastNameChanged, submit, clearDoctors })(SearchBar);
