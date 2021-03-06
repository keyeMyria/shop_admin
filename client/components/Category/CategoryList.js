// @flow
import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown';
import {Grid, Cell, Button, Textfield, List} from 'react-mdl';
import Page from '../Page/PageComponent';
import AddCategoryMutation from './AddCategoryMutation';
import CategoryItem from './CategoryItem';
import styles from './styles/CategoryList.scss';

export default class AddFeature extends React.Component {
    constructor() {
        super();
        this.state = {
            categoryTitle: '',
            categoryViewTitle: '',
            categoryDescription: ''
        }
    }

    static propTypes = {
        viewer: PropTypes.object.isRequired,
        relay: PropTypes.object.isRequired
    };


    addCategory = () => {
        let category = {
            title: this.state.categoryTitle,
            view_title: this.state.categoryViewTitle,
            description: this.state.categoryDescription,
        }
        AddCategoryMutation.commit(
            this.props.relay.environment,
            category,
            this.props.viewer.id,
        );
    }

    onChangeTitleInput(e) {
        let title = e.target.value;

        this.setState({
            categoryTitle: title
        });
    }

    onChangeViewTitleInput(e) {
        let viewTitle = e.target.value;

        this.setState({
            categoryViewTitle: viewTitle
        });
    }

    onChangeDescriptionTextArea(e) {
        let description = e.target.value;

        this.setState({
            categoryDescription: description
        });
    }

    render() {
        return (
            <Grid style={{zIndex: 999}}>
                <Cell col={12}>
                    <h4>Categories</h4>
                </Cell>
                <List className={styles.list}>
                    {this.props.viewer.categories.edges.map(category => {
                        return <CategoryItem
                            key={category.node.id}
                            title={category.node.view_title}
                            description={category.node.description}
                            categoryId={category.node.id}
                            relay={this.props.relay}
                        />
                    })}
                </List>
            </Grid>
        );
    }
}
