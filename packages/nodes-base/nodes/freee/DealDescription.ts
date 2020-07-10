import { INodePropertyOptions, INodeProperties } from 'n8n-workflow';

export const dealOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: {
            show: {
                resource: [
                    'deal',
                ],
            },
        },
        options: [
            {
                name: 'Get All',
                value: 'getAll',
                description: 'Get all deals',
            },
        ],
        default: 'getAll',
        description: 'The operation to perform.',
    },
] as INodeProperties[];

export const dealFields = [
/* -------------------------------------------------------------------------- */
/*                                 deal:get                                   */
/* -------------------------------------------------------------------------- */
    {
        displayName: 'Company Id',
        name: 'company_id',
        type: 'string',
        displayOptions: {
            show: {
                resource: [
                    'deal',
                ],
                operation: [
                    'getAll',
                ]
            }
        },
        default: '',
        description: 'If all results should be returned or only up to a given limit.',
    },

] as INodeProperties[];


