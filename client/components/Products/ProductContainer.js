// @flowimport {    createFragmentContainer,    graphql,} from 'react-relay/compat';import Product from './ProductComponent';export default createFragmentContainer(Product, {    viewer: graphql`        fragment ProductContainer_viewer on User {            products {                name,                price            }        }`});