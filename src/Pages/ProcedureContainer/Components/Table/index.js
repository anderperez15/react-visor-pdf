import React, {Component} from 'react';
import './style.css';

class Table extends Component {
	constructor(props){
		super(props);
		this.state={
			view:[]
		}

		this.viewCelda = this.viewCelda.bind(this);
	};

	viewCelda(number){
		if(!this.state.view.some(n=>n===number)){
			this.setState({view:this.state.view.concat([number])});
		} else{
			let view = this.state.view.filter(n=>n!==number);
			this.setState({view:view});
		}
	}

	render(){
		const {data} = this.props;
		return (
			<table width="100%" className="display table table-striped table-condensed" cellSpacing="0">
				<thead>
			        <tr>
						<th></th>
						<th>L3n</th>
						<th>PID</th>
						<th>Handlung</th>
						<th>Risk</th>
						<th>Options</th>
			        </tr>
	      		</thead>
	      		<tbody>
	      			{
	      				data.length?
	      				null:
	      				(
	      					<tr>
	      						<td colSpan={6} style={{textAlign:'center'}}>Loading...</td>
	      					</tr>
	      				)
	      			}

					{
						data.map((obj,i) => {
							let see = this.state.view.some(n => n===i);
							return (
								<React.Fragment key={i}>
									<tr>
										<td className="details-control">
											<i className={`fa fa-${see?'minus':'plus'}-square`} onClick={() =>this.viewCelda(i)}></i>
										</td>
										<td>{obj.L3n}</td>
										<td>{obj.PID}</td>
										<td>{obj.Handlung}</td>
										<td>
											<span 
												className={
													obj.risk_strategy==='Low'?'label label-warning':'label label-success'
												}
											>
												{obj.risk_strategy}
											</span>
										</td>
										<td>
											<button className="btn btn-info btn-sm" onClick={this.props.showModal}>
												Options
											</button>
										</td>
									</tr>
									{
										see?
										<tr>
											<td colSpan={6}>
												<button type="button" className={`margin-min btn btn-${obj[1]} btn-sm`}>EI</button>
											    <button type="button" className={`margin-min btn btn-${obj[2]} btn-sm`}>VO</button>
											    <button type="button" className={`margin-min btn btn-${obj[3]} btn-sm`}>RI</button>
											    <button type="button" className={`margin-min btn btn-${obj[4]} btn-sm`}>PA</button>
											    <button type="button" className={`margin-min btn btn-${obj[5]} btn-sm`}>KO</button>
											    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
											    <button type="button" className={`margin-min btn btn-${obj[6]} btn-sm`}>VO</button>
											    <button type="button" className={`margin-min btn btn-${obj[7]} btn-sm`}>RV</button>
											    <button type="button" className={`margin-min btn btn-${obj[8]} btn-sm`}>VO</button>
											    <button type="button" className={`margin-min btn btn-${obj[9]} btn-sm`}>BZ</button>
											    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
											    <button type="button" className={`margin-min btn btn-${obj[10]} btn-sm`}>EV</button>
											    <button type="button" className={`margin-min btn btn-${obj[11]} btn-sm`}>VO</button>
											    <button type="button" className={`margin-min btn btn-${obj[12]} btn-sm`}>KV</button>
											    <button type="button" className={`margin-min btn btn-${obj[13]} btn-sm`}>RB</button>
											</td>
										</tr>:
										null
									}
								</React.Fragment>
							);
						})
					}
				</tbody>
			</table>
		);
	};
};

export default Table;