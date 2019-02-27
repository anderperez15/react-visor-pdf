import React,{Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import { Document, Page } from 'react-pdf/dist/entry.webpack';


import "react-pdf/dist/Page/AnnotationLayer.css";
import './style.css';

class Modalpdf extends Component{
	constructor(props){
		super(props);
		this.state = {
			numPages: null,
			pageNumber: 1,
		}
		this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this);
		this.goToPrevPage = this.goToPrevPage.bind(this);
		this.goToNextPage = this.goToNextPage.bind(this);
	};

	goToPrevPage = () => this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
  	goToNextPage = () => this.setState(state => ({ pageNumber: state.pageNumber + 1 }));

	onDocumentLoadSuccess = ({ numPages }) => {
		this.setState({ numPages });
	}
	render(){
		const { pageNumber, numPages } = this.state;

		return (
			<Modal
		        {...this.props}
		        bsSize="large"
		        aria-labelledby="contained-modal-title-lg"
	      	>
		        <Modal.Header closeButton>
		        	<Modal.Title id="contained-modal-title-lg">New message</Modal.Title>
		        </Modal.Header>
		        <Modal.Body>
		        	<form>
			          	<div className="form-group">
			            	<label htmlFor="recipient-name" className="col-form-label">Recipient:</label>
			            	<input type="text" className="form-control" id="recipient-name" />
			          	</div>
			          	<div className="form-group">
			            	<label htmlFor="message-text" className="col-form-label">PDF</label>
			            	<div style={{display:'flex',justifyContent:'center',border:'1px solid',flexDirection:'column',padding:'20px'}}>
						        <nav>
						        	<Button onClick={this.goToPrevPage}>Prev</Button>
						         	<Button onClick={this.goToNextPage}>Next</Button>
						        </nav>
						        <Document
						        	width={600}
						          	file="BP_r_r.pdf"
						          	options={{
										cMapUrl: 'cmaps/',
										cMapPacked: true
									}}
						          	onLoadSuccess={this.onDocumentLoadSuccess}
						        >
						        	<Page pageNumber={pageNumber} />
						        </Document>
						        <p>Page {pageNumber} of {numPages}</p>
						    </div>
			          	</div>
			        </form>
		        </Modal.Body>
		        <Modal.Footer>
		        	<Button onClick={this.props.onHide}>Close</Button>
		        	<Button className="btn btn-primary">Send message</Button>
		        </Modal.Footer>
	     	</Modal>
	    )
	}
}

export default Modalpdf;