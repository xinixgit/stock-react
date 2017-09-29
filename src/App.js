import React, { Component } from 'react';
import { createStore } from 'redux'
import DataTableContainer from './container/DataTableContainer'
import reducer from './reducer/TableDataReducer'

const store = createStore(reducer);

class App extends Component {
  render() {
    return (
      <DataTableContainer store={store} />
    )
  }
}

export default App;
