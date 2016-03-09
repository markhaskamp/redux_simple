import React from "react";
import { render} from "react-dom";
import { createStore } from 'redux';


function storeReducer(state=0, action) {
    switch(action.type) {
    case 'INCREMENT':
        return state + 1;
    case 'DECREMENT':
        return state - 1;
    default:
        return state;
    }
}
let store = createStore(storeReducer);

export default class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Foo />
            </div>
        );
    }
}
export class Foo extends React.Component {
    constructor() {
        super();
        let unsub = store.subscribe(this.foo.bind(this));

        this.state = {'counter': store.getState()};
    }

    foo(n) {
        // console.log(store.getState());
        this.setState({'counter': store.getState()});
    }

    handlePlus(e) {
        store.dispatch({type: 'INCREMENT'});
    }

    handleMinus(e) {
        store.dispatch({type: 'DECREMENT'});
    }

    render() {
        return (
            <div>
                <div onClick={this.handlePlus.bind(this)}>plus</div>
                <div onClick={this.handleMinus.bind(this)}>minus</div>
                <div id="runningCounter">[ {this.state.counter} ]</div>

            </div>);
    }
}

render(<App/>, document.getElementById('app'));



