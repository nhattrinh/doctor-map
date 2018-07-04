import { Component, React } from 'react';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            middleName: ''
        };
    }

    render() {
        return(
            <form>
                <label className='form-control'>First Name</label>
                <input type='text' value={this.state.firstName} placeholder="The doctor's first name" />
                <label className='form-control'>Middle Name</label>
                <input type='text' value={this.state.middleName} placeholder="The doctor's middle name" />
                <label className='form-control'>Last Name</label>
                <input type='text' value={this.state.lastName} placeholder="The doctor's last name" />
            </form>
        );
    }
}
