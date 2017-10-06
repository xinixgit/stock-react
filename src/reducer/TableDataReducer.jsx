import Api from '../utils/Api'

const fetchDataRequest = (symbol, termLen, callback) => {
	var url = '/lookup/' + symbol + '/' + termLen;
	return Api.get(url).then(json => {
		callback(json)
	});
}

const TableDataState = (state, action) => {
	switch (action.type) {
		case 'FETCH_NEW_DATA':
			return {
				req: fetchDataRequest(action.symbol, action.termLen, action.callback)
			}

		case 'FETCH_SUCCESS':
			return {
				prevState: action.prevState,
				rawData: action.rawData
			}

		default:
			return {
				rawData: {}
			}
	}
}

export default TableDataState;