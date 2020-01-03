import React , { Component } from 'react';

class Error extends React.Component {
    render(){
        return (
            <div className="J-Error">Error 404<button onClick={ () => this.props.history.goBack() }>返回</button></div>
        )
    }
}

export default Error;