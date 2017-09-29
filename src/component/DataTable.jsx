import React, { Component } from 'react';
import { Table } from 'react-bootstrap'

class DataTable extends Component {
	render() {
		const {rawData, tableData} = this.props;
		return (
			<Table responsive striped id="datatable">
				<thead>
				{
					rawData && rawData.symbols &&							
						<tr className="symbolrow">
							<td></td>
							{
								rawData.symbols.map(symbol => {
									return <td>{ symbol }</td>
								})
							}
						</tr>			
				}
				</thead>
				<tbody>
				{
					rawData && rawData.symbols &&							
						<tr>
							<td></td>
							{
								rawData.symbols.map(symbol => {
									return <td>{ tableData[symbol]['dates'] }</td>
								})
							}
						</tr>			
				}
				{
					rawData && rawData.mappings && Object.keys(rawData.mappings.regular).map(key => {
						return (
							<tr>
								<td>{ rawData.mappings.regular[key] }</td>
								{
									rawData.symbols.map(symbol => (							
										<td>{ tableData[symbol]['data'][key] }</td>									
									))
								}
							</tr>						
						)
					})
				}

				{
					rawData && rawData.mappings && Object.keys(rawData.mappings.daily).map(key => {
						return (
							<tr>
								<td>{ rawData.mappings.daily[key] }</td>
								{
									rawData.symbols.map(symbol => (								
										<td>{ tableData[symbol]['data'][key] }</td>										
									))	
								}
							</tr>						
						)
					})
				}
				</tbody>
			</Table>
		)
	}
}

export default DataTable;