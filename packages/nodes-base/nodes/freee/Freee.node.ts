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
                // common parameter
                const company_id = this.getNodeParameter('company_id', i) as string;

                if (operation === 'getDeals') {
                    method = 'GET';
                    endpoint = `/api/1/deals?company_id=${company_id}`

                    const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
                    if (additionalFields.partner_id) {
                        endpoint = endpoint + '&partner_id=' + additionalFields.partner_id as string;
                    }
                    if (additionalFields.account_item_id) {
                        endpoint = endpoint + '&account_item_id=' + additionalFields.account_item_id as string;
                    }
                    if (additionalFields.partner_code) {
                        endpoint = endpoint + '&partner_code=' + additionalFields.partner_code as string;
                    }
                    if (additionalFields.status) {
                        endpoint = endpoint + '&status=' + additionalFields.status as string;
                    }
                    if (additionalFields.type) {
                        endpoint = endpoint + '&type=' + additionalFields.type as string;
                    }
                    if (additionalFields.start_issue_date) {
                        endpoint = endpoint + '&start_issue_date=' + additionalFields.start_issue_date as string;
                    }
                    if (additionalFields.end_issue_date) {
                        endpoint = endpoint + '&end_issue_date=' + additionalFields.end_issue_date as string;
                    }
                    if (additionalFields.start_due_date) {
                        endpoint = endpoint + '&start_due_date=' + additionalFields.start_due_date as string;
                    }
                    if (additionalFields.end_due_date) {
                        endpoint = endpoint + '&end_due_date=' + additionalFields.end_due_date as string;
                    }
                    if (additionalFields.start_renew_date) {
                        endpoint = endpoint + '&start_renew_date=' + additionalFields.start_renew_date as string;
                    }
                    if (additionalFields.end_renew_date) {
                        endpoint = endpoint + '&end_renew_date=' + additionalFields.end_renew_date as string;
                    }
                    if (additionalFields.offset) {
                        endpoint = endpoint + '&offset=' + additionalFields.offset as string;
                    }
                    if (additionalFields.limit) {
                        endpoint = endpoint + '&limit=' + additionalFields.limit as string;
                    }
                    if (additionalFields.registered_from) {
                        endpoint = endpoint + '&registered_from=' + additionalFields.registered_from as string;
                    }
                    if (additionalFields.accruals) {
                        endpoint = endpoint + '&accruals=' + additionalFields.accruals as string;
                    }
                }
                else if (operation === 'getDeal') {
                    method = 'GET';
                    const id = this.getNodeParameter('id', i) as string;
                    endpoint = `/api/1/deals/${id}?company_id=${company_id}`

                    const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
                    if (additionalFields.accruals) {
                        endpoint = endpoint + '&accruals=' + additionalFields.accruals as string;
                    }
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
