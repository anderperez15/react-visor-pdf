import React, {Component} from 'react';
import Table from './Components/Table';
import Modalpdf from './Components/Modal';

class Procedure extends Component{
	constructor(props){
		super(props);

		this.state = {
			procedures:[],
			seeModal:false
		}
		this.showModal = this.showModal.bind(this);
	}
	componentDidMount(){
		fetch('/data.json')
		.then(data => data.json())
		.then(dataJson => {this.setState({procedures:dataJson})})
		.catch(err=>{console.log(err)});
	};

	showModal(){
		this.setState({seeModal:!this.state.seeModal});
	}

	render(){
		return (
			<div>
				<Table data={this.state.procedures} showModal={this.showModal} />
				<Modalpdf show={this.state.seeModal} onHide={this.showModal}/>
			</div>
		);
	};
}

export default Procedure;

