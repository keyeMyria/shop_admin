// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Cell, Button, Textfield } from 'react-mdl';
import Page from '../Page/PageComponent';
import AddProductMutation from './AddProductMutation';

const inputData = {
    nodejs: { name: 'Nodejs', url: 'https://nodejs.org', description: 'Node.js® is a JavaScript runtime built on Chrome\'s V8 JavaScript engine' },
    html: { name: 'Html5', url: 'https://www.w3.org/TR/html5/', description: '5th major revision of the core language of the World Wide Web' },
    css: { name: 'css', url: 'https://www.w3.org/Style/CSS/Overview.en.html', description: 'Cascading Style Sheets (CSS) is a simple mechanism for adding style to Web documents.' }
};

export default class AddProduct extends React.Component {
    static propTypes = {
        viewer: PropTypes.object.isRequired,
        relay: PropTypes.object.isRequired,
    };
    state: {
        name: '',
        price: 0,
    }

    addProduct = () => {
        let value = Object.assign(this.state, {
            created_at: '2018-02-12',
            updated_at: '2018-02-12',
        });
        AddProductMutation.commit(
            this.props.relay.environment,
            value,
            this.props.viewer.id,
        );
        console.log(this)
    }

    render() {
        return (
            <Page heading='Add a Product'>
                <Grid>
                    <Cell col={9}>
                        <Textfield
                            onChange={(e) => {
                                this.setState({ name: e.target.value});
                            }}
                            label="Product name..."
                            style={{width: '200px'}}
                        />
                        <Textfield
                            onChange={(e) => {
                                this.setState({ price: +e.target.value })
                            }}
                            pattern="-?[0-9]*(\.[0-9]+)?"
                            error="Input is not a number!"
                            label="Number..."
                            style={{width: '200px'}}
                        />
                    </Cell>
                    <Cell col={3} style={{ textAlign: 'center' }}>
                        <Button raised accent onClick={this.addProduct.bind(this)}>Add product</Button>
                    </Cell>
                </Grid>
            </Page>
        );
    }
}
