import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Col, ControlLabel, Radio, Button, Alert } from 'react-bootstrap'

import DataTable from './DataTable'

class DataTableForm extends Component {
	displayAlert() {
		this.setState({ ...this.state, alertVisible: true});
	}

	hideAlert() {
		this.setState({ ...this.state, alertVisible: false});
	}

	validatedInputs(symbol, termLength) {
		return (symbol && termLength);
	}

	handleFormSubmit(symbol, termLength) {
		const { onSymbolChange } = this.props;
		if (this.validatedInputs(symbol, termLength)) {
			this.hideAlert();
			onSymbolChange(symbol, termLength);
		} else {
			this.displayAlert();
		}
	}

	render() {
		let symbolInput, termLength, prevSymbol, prevTermLen;
		const { prevState, tableData, rawData } = this.props;

		if (prevState) {
			prevSymbol = prevState.symbol;
			prevTermLen = prevState.termLen;
		}

		return (
			<div id="container">
				<Form horizontal
					onSubmit={ e => {
						e.preventDefault();
						this.handleFormSubmit(symbolInput.value || prevSymbol, termLength || prevTermLen);
					}}
				>
					<FormGroup controlId="formSymbol">
						<Col componentClass={ControlLabel} sm={2}>Symbol</Col>
						<Col sm={6}>
							<FormControl type="text" placeholder="Symbol" inputRef={ref => { symbolInput = ref; }} />
						</Col>												
					</FormGroup>
					<FormGroup>
						<Col componentClass={ControlLabel} sm={2}>Term Length</Col>
						<Col sm={6}>
							<Radio name="termLengthRadio" inline onClick={ e => { termLength = 'qtr' }} >QTR</Radio>
							{' '}
							<Radio name="termLengthRadio" inline onClick={ e => { termLength = 'yr' }} >YR</Radio>
						</Col>
					</FormGroup>
					<FormGroup>
						<Col smOffset={2} sm={4}>
							<Button type="submit" >Submit</Button>
						</Col>
					</FormGroup>
					{
						this.state && this.state.alertVisible &&
							<Alert className="alert-message" bsStyle="danger" onDismiss={this.hideAlert}>
								<p>Symbol or term length is empty!</p>
							</Alert>
					}
				</Form>
				<DataTable rawData={rawData} tableData={tableData} />
			</div>
		)
	}
}

export default DataTableForm;