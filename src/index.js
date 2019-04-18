import React, { Component } from 'react';
import '../lib/require';

class Bridge extends Component{
    constructor(props, context) {
        super(props, context);
        window['require'] && window['require'].config({
            baseUrl: this.props.baseUrl || '../',
            path: {
                text : "../lib/text",
                async: '../lib/async',
                font: '../lib/font',
                goog: '../lib/goog',
                image: '../lib/image',
                json: '../lib/json',
                noext: '../lib/noext',
                mdown: '../lib/mdown',
                propertyParser : '../lib/propertyParser',
                markdownConverter : '../lib/Markdown.Converter'
            }
        });
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.mn !== this.props.mn){
            this.getFile(nextProps);
        }
    }

    componentDidMount(){
        this.getFile(this.props);
    }

    getFile(props){
        let { sessionName, mn, pathname, id, extra, onLoad } = props;
        let { store, reducers, actions } = props;
        if(mn){
            sessionStorage.setItem(sessionName,JSON.stringify({ sessionName, mn, pathname,extra }));
        }else{
            let param = JSON.parse(sessionStorage.getItem(sessionName))||{};
            mn = param.mn;
            pathname = param.pathname;
            extra = param.extra;
        }
        id = id || 'app';
        extra = extra || [];
        let extras = extra.map((v)=>`./${mn}/${v}`);
        mn && window['require']([`./${mn}/index`,...extras],(enter) => {
            enter({ pathname, id ,mn}, { store, reducers, actions },sessionName);
            if(onLoad && (typeof onLoad === 'function')){
                onLoad();
            }
        });
    }

    render(){
        return <div id={ this.props.id || 'app'}> </div>
    }
}

export default Bridge;