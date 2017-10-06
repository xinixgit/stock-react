import { connect } from 'react-redux'
import { symbolChanged, fetchSuccess } from './Actions'
import DataTableForm from '../component/DataTableForm'

const reduceByBar = (arr) => {
	if (arr.length === 0) {
		return '-';
	} else if (arr.length === 1) {
		return arr[0];
	} else {
		return arr.reduce((x, y) => x == null ? y : (x + ' | ' + y));
	}
}

const mapRegular = (mappings, data, oneRow) => {
	let dates = Object.keys(data);	
	Object.keys(mappings).forEach(key => {
		let arr = []
		dates.forEach(d => {
			arr.push((data && data[d][key]) || '-')
		})

		oneRow[key] = reduceByBar(arr);
	});
}

const mapDaily = (mappings, data, oneRow) => {
	Object.keys(mappings).forEach(key => {
		oneRow[key] = data[key] || '-';
	});
}

const mapRawDataToTableData = rawData => {
	if (!rawData || Object.keys(rawData).length === 0) {
		return {};
	}

	let rows = {};
	let regularMappings = rawData.mappings.regular;
	let dailyMappings = rawData.mappings.daily;

	rawData.symbols.forEach( symbol => {
		let oneRow = {};
		let regularData = rawData.data[symbol] || {};
		let dailyData = rawData.daily_data[symbol] || {};

		if (regularMappings) {			
			mapRegular(regularMappings, regularData, oneRow);			
		}

		if (dailyMappings) {
			mapDaily(dailyMappings, dailyData, oneRow);
		}

		rows[symbol] = {
			data: oneRow,
			dates: reduceByBar(Object.keys(regularData))
		}
	});

	return rows;
};

const mapStateToProps = state => {
	return {
		prevState: state.prevState,
		rawData: state.rawData,
		tableData: mapRawDataToTableData(state.rawData)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onSymbolChange: (symbol, termLen) => {
			dispatch(symbolChanged(symbol, termLen, (rawData) => {
				dispatch(fetchSuccess({ symbol, termLen }, rawData))
			}));
		}
	}
};

const DataTableContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(DataTableForm);

export default DataTableContainer;