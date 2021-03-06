// @flow
import { graphql, commitMutation, Environment } from 'react-relay/compat';

const mutation = graphql`
    mutation AddProductMutation($input: AddProductInput!) {
        addProduct(input: $input) {
            __typename
            productEdge {
                node {
                    name
                    price
                }
            }
            viewer {
                id
            }
        }
    }
`;

function getConfigs(viewerId) {
    return [{
        type: 'RANGE_ADD',
        parentName: 'viewer',
        parentID: viewerId,  
        connectionName: 'products',
        edgeName: 'productEdge',
        rangeBehaviors: {
            '': 'append',
        },
    }];
}

function getOptimisticResponse(data, viewerId) {
    return {
        addProduct: {
            productEdge: {
                node: data
            },
            viewer: {
                id: viewerId
            }
        }
    };
}

function commit(
    environment: Environment,
    data: Object,
    viewerId: number
) {
    commitMutation(
        environment,
        {
            mutation,
            variables: { input: data },
            optimisticResponse: getOptimisticResponse(data, viewerId),
            configs: getConfigs(viewerId),
        }
    );
}

export default { commit };
