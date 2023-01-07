import './App.scss'

function App() {

  return (
    <div className="App">
      <h1>Welcome to SWEETSTACK</h1>
        <p>Visit <a href={'#'} >documentary</a> </p>
    </div>
  )
}

export default App
/*


//Example for useContext copy or overwrite

const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}

*/