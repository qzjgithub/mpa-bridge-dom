import React, { Component } from 'react';
import '../lib/require';

class Bridge extends Component{
    constructor(props, context) {
        super(props, context);
        window['require'] && window['require'].config({
            baseUrl: this.props.baseUrl || '../'
        });
    }

    componentDidMount(){
        let { sessionName, mn, pathname, id } = this.props;
        let { store, reducers, actions } = this.props;
        if(mn){
            sessionStorage.setItem(sessionName,JSON.stringify({ sessionName, mn, pathname }));
        }else{
            let param = JSON.parse(sessionStorage.getItem(sessionName))||{};
            mn = param.mn;
            pathname = param.pathname;
        }
        id = id || 'app';
        mn && window['require']([`./${mn}/index`],(enter) => {
            enter({ pathname, id }, { store, reducers, actions });
        });
    }

    render(){
        return <div id={ this.props.id || 'app'}></div>
    }
}

export default Bridge;