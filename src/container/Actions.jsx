export const symbolChanged = (symbol, termLen, callback) => ({
	type: 'FETCH_NEW_DATA',
	symbol,
	termLen,
	callback
})

export const fetchSuccess = (prevState, rawData) => ({
	type: 'FETCH_SUCCESS',
	prevState,
	rawData
})