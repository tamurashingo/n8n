import { INodePropertyOptions, INodeProperties } from 'n8n-workflow';

export const companyOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: {
            show: {
                resource: [
                    'company,'
                ],
            },
        },
        options: [
            {
                name: 'Get Company',
                value: 'getCompany',
                description: 'ユーザーが所属する事業所の一覧を取得する',
            }
        ],
        default: 'getCompany',
        description: 'The operation to perform',
    }

] as INodeProperties[];



