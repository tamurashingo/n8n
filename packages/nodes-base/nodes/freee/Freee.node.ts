import {
    IExecuteFunctions,
} from 'n8n-core';

import {
    IDataObject,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
} from 'n8n-workflow';

import {
    freeeApiRequest,
} from './GenericFunctions';

import {
    companyOperations,
} from './CompanyDescription';

import {
    dealFields,
    dealOperations,
} from './DealDescription';

export class Freee implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'freee',
        name: 'freee',
        icon: '',
        group: ['output'],
        version: 1,
        subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
        description: 'Consume freee API',
        defaults: {
            name: 'freee',
            color: '#429fd9',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'freeeOAuth2Api',
                required: true,
            },

        ],
        properties: [
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                options: [
                    {
                        name: 'Company',
                        value: 'company',
                        description: '',
                    },
                    {
                        name: 'Deal',
                        value: 'deal',
                        description: '',
                    },
                ],
                default: 'company',
                description: 'Resource to consume',
            },
            ...dealOperations,
            ...dealFields,
            ...companyOperations,
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: IDataObject[] = [];
        let responseData;
        const resource = this.getNodeParameter('resource', 0) as string;

        let method: string = '';
        let endpoint: string = '';
        let body: any = {};

        for (let i = 0; i < items.length; i++) {
            if (resource === 'company') {
                method = 'GET';
                endpoint = '/api/1/companies';
            }
            else if (resource === 'deal') {
                const operation = this.getNodeParameter('operation', 0) as string;
                if (operation === 'getAll') {
                    method = 'GET';
                    const company_id = this.getNodeParameter('company_id', i) as string;
                    endpoint = `/api/1/deals?company_id=${company_id}`
                }
            }


            try {
                responseData = await freeeApiRequest.call(this, method, endpoint, body);
            } catch (err) {
                throw new Error(`freee Error: ${err}`);
            }

            if (Array.isArray(responseData)) {
                returnData.push.apply(returnData, responseData as IDataObject[]);
            } else {
                if (responseData === undefined) {
                    responseData = {
                        errors: [],
                        success: true,
                    }
                }
                returnData.push(responseData as IDataObject);
            }
        }
        return [this.helpers.returnJsonArray(returnData)];
    }
}
