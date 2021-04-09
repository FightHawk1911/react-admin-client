import React from 'react'
import {Switch, Route} from "react-router-dom";
import ProductHome from "./home";
import ProductAddUpdate from "./addupdate";
import ProductDetail from "./detail";

/*
  产品路由
 */
export default class Product extends React.Component<any, any>{

    render() {
        return (
            <Switch>
                <Route exact path='/product/' component={ProductHome} />
                <Route path='/product/addupdate' component={ProductAddUpdate} />
                <Route path='/product/detail' component={ProductDetail} />
            </Switch>
        );
    }
}