// @flow/* eslint-disable global-require */import React from 'react';import PropTypes from 'prop-types';import Page from '../Page/PageComponent';import {Grid, Cell, Card, CardTitle, CardText, CardActions, Button} from 'react-mdl';import AddProduct from './AddProductComponent'export default class ProductComponent extends React.Component {    static propTypes = {        viewer: PropTypes.object.isRequired,        relay: PropTypes.object.isRequired,    };    render() {        return (            <Page heading='Products'>                <AddProduct relay={this.props.relay} viewer={this.props.viewer}/>                {this.props.viewer.products.edges.map((product, key) => {                    return (                        <div key={product.node.id}>                            <p>Product<span>{product.node.name}</span></p>                            <p>Price<span>{product.node.price}</span></p>                            <hr/>                        </div>                    )                })}            </Page>        );    }}