// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Cell, Button, Textfield, FABButton, Icon, Tooltip} from 'react-mdl';
import {MDLSelectField} from 'react-mdl-select';
import AddProductMutation from './AddProductMutation';
import CategoriesSelect from './CategoriesSelect';
import styles from './style/ProductForm.scss';
import axios from 'axios';

export default class AddProduct extends React.Component {
    static propTypes = {
        viewer: PropTypes.object.isRequired,
        relay: PropTypes.object.isRequired,
    };
    state: {
        name: '',
        price: 0,
        short_decsription: '',
        full_description: '',
        category: '',
        image_src: ''
    };
    createCommodity(){
        let value = Object.assign(this.state, {
            created_at: '2018-02-12',
            updated_at: '2018-02-12',
        });
        AddProductMutation.commit(
            this.props.relay.environment,
            value,
            this.props.viewer.id,
        );
    }

    onImageUpload(response) {
        this.setState({imageSrc: response.data.imageSrc})
        this.createCommodity();
    }

    onChangeName(e) {
        this.setState({name: e.target.value});
    }

    onChangePrice(e) {
        console.log(e.target.value, +e.target.value)
        this.setState({price: +e.target.value});
    }

    onChangeShortDescription(e) {
        this.setState({short_description: e.target.value})
    }

    onChangeFullDescription(e) {
        this.setState({full_description: e.target.value})
    }

    onChangeCategory(e) {
        this.setState({
            category: e
        })
    }

    addProduct = (e) => {
        if(this.state.image_src){
            let file = document.getElementById('file').files[0];
            let fd = new FormData();
            fd.append('file', file);
            const options = {
                method: 'POST',
                data: fd,
                url: 'http://localhost:8000/upload',
            };
            axios(options)
                .then(this.onImageUpload.bind(this))
                .catch(e => {
                    console.log(e)
                });
        } else {
            this.createCommodity();
        }

    };
    onInputFileChange = (e) => {
        this.setState({image_src: ''});
        document.getElementById('form-preview').src = e.target.value;
    };
    chooseFile = () => {
        document.getElementById('file').click();
    };

    render() {
        return (
            <Cell col={12}>
                <Textfield
                    onChange={this.onChangeName.bind(this)}
                    floatingLabel
                    label="Product name..."
                />
                <Textfield
                    onChange={this.onChangePrice.bind(this)}
                    floatingLabel
                    pattern="-?[0-9]*(\.[0-9]+)?"
                    error="Input is not a number!"
                    label="Price..."
                />
                <CategoriesSelect onChange={this.onChangeCategory.bind(this)} relay={this.props.relay}
                                  viewer={this.props.viewer}/>
                <Textfield
                    onChange={this.onChangeShortDescription.bind(this)}
                    floatingLabel
                    label="Short description..."
                    rows={3}
                />
                <Textfield
                    onChange={this.onChangeFullDescription.bind(this)}
                    floatingLabel
                    label="Complete description..."
                    rows={6}
                />

                <input id={'file'} name={'file-upload'} onChange={this.onInputFileChange.bind(this)} type="file"
                       className={styles.fileInput}/>
                <Tooltip label={'upload photo'} className={styles.file}>
                    <FABButton onClick={this.chooseFile.bind(this)} ripple >
                        <Icon name="add"/>
                    </FABButton>
                </Tooltip>
                <Button
                    type={'button'}
                    raised
                    accent
                    className={styles.formSubmit}
                    onClick={this.addProduct.bind(this)
                    }>Create</Button>
            </Cell>


        );
    }
}