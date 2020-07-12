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
                name: '事業所一覧の取得',
                value: 'getCompanies',
                description: 'ユーザーが所属する事業所の一覧を取得する',
            },
            {
                name: '事業所の詳細情報の取得',
                value: 'getCompany',
                description: 'ユーザーが所属する事業所の詳細を取得する',
            },
            {
                name: '事業所情報の更新',
                value: 'updateCompany',
                description: 'ユーザーが所属する事業所の情報を更新する',
            },
        ],

        default: 'getCompanies',
        description: '事業所',
    },
] as INodeProperties[];
