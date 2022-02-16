import React from 'react';
import { Route, withRouter } from "react-router-dom";
class Scroll2Top extends React.Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0)
        }
    }
    render() {
        return this.props.children
    }
}
export default withRouter(Scroll2Top);