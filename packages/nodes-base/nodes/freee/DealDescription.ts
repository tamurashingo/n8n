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
                name: '取引の削除',
                value: 'deleteDeal',
                description: '取引の削除',
            },
            {
                name: '取引（収入／支出）一覧の取得',
                value: 'getDeals',
                description: '指定した事業所の取引一覧（収入／支出）を取得する',
            },
            {
                name: '取引（収入／支出）の取得',
                value: 'getDeal',
                description: '指定した事業所の取引（収入／支出）を取得する',
            },
            {
                name: '取引（収入／支出）の作成',
                value: 'createDeal',
                description: '指定した事業所の取引（収入／支出）を作成する',
            },
            {
                name: '取引（収入／支出）の更新',
                value: 'updateDeal',
                description: '指定した事業所の取引（収入／支出）を更新する',
            },
        ],
        default: 'getDeals',
        description: '取引（収入／支出）',
    },
] as INodeProperties[];

export const dealFields = [
/* -------------------------------------------------------------------------- */
/*                                 deal:common                                */
/* -------------------------------------------------------------------------- */
    {
        displayName: '事業所ID',
        name: 'company_id',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'deal',
                ],
                operation: [
                    'deleteDeal',
                    'getDeals',
                    'getDeal',
                    'createDeal',
                    'updateDeal',
                ],
            }
        },
        default: '',
    },
/* -------------------------------------------------------------------------- */
/*                                 deal:deleteDeal                            */
/* -------------------------------------------------------------------------- */
    {
        displayName: '取引ID',
        name: 'id',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'deal',
                ],
                operation: [
                    'deleteDeal',
                ],
            },
        },
    },
/* -------------------------------------------------------------------------- */
/*                                 deal:getDeals                              */
/* -------------------------------------------------------------------------- */
    {
        displayName: 'Additional FIelds',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: [
                    'deal',
                ],
                operation: [
                    'getDeals',
                ],
            },
        },
        options: [
            {
                displayName: '取引先ID',
                name: 'partner_id',
                type: 'string',
                default: '',
            },
            {
                displayName: '勘定科目ID',
                name: 'account_item_id',
                type: 'string',
                default: '',
            },
            {
                displayName: '取引先コード',
                name: 'partner_code',
                type: 'string',
                default: '',
            },
            {
                displayName: '決済状況',
                name: 'status',
                type: 'options',
                options: [
                    {
                        name: '未決済',
                        value: 'unsettled',
                    },
                    {
                        name: '完了',
                        value: 'settled',
                    },
                ],
                default: 'unsettled',
            },
            {
                displayName: '収支区分',
                name: 'type',
                type: 'options',
                options: [
                    {
                        name: '収入',
                        value: 'income',
                    },
                    {
                        name: '支出',
                        value: 'expense',
                    },
                ],
                default: 'income',
            },
            {
                displayName: '発生日（開始日）',
                name: 'start_issue_date',
                type: 'string',
                placeholder: 'yyyy-mm-dd',
                default: '',
            },
            {
                displayName: '発生日（終了日）',
                name: 'end_issue_date',
                type: 'string',
                placeholder: 'yyyy-mm-dd',
                default: '',
            },
            {
                displayName: '支払期日（開始日）',
                name: 'start_due_date',
                type: 'string',
                placeholder: 'yyyy-mm-dd',
                default: '',
            },
            {
                displayName: '支払期日（終了日）',
                name: 'end_due_date',
                type: 'string',
                placeholder: 'yyyy-mm-dd',
                default: '',
            },
            {
                displayName: '+更新日（開始日）',
                name: 'start_renew_date',
                type: 'string',
                placeholder: 'yyyy-mm-dd',
                default: '',
            },
            {
                displayName: '+更新日（終了日）',
                name: 'end_renew_date',
                type: 'string',
                placeholder: 'yyyy-mm-dd',
                default: '',
            },
            {
                displayName: '取得レコードのオフセット',
                name: 'offset',
                type: 'number',
                typeOptions: {
                    minValue: 0,
                },
                default: 0,
            },
            {
                displayNmae: '取得レコードの件数',
                name: 'limit',
                type: 'number',
                typeOptions: {
                    maxValue: 100,
                },
                default: 20,
            },
            {
                displayName: '取引登録元アプリで絞込',
                name: 'registered_from',
                type: 'options',
                options: [
                    {
                        name: '本APIを叩くアプリ自身から登録した取引のみ',
                        value: 'me',
                    },
                ],
                default: 'me',
            },
            {
                displayName: '取引の債権債務行の表示',
                name: 'accruals',
                type: 'options',
                options: [
                    {
                        name: '表示しない',
                        value: 'without',
                    },
                    {
                        name: '表示する',
                        value: 'with',
                    },
                ],
                default: 'without',
            },
        ],
    },
/* -------------------------------------------------------------------------- */
/*                                 deal:getDeal                               */
/* -------------------------------------------------------------------------- */
    {
        displayName: '取引ID',
        name: 'id',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: [
                    'deal',
                ],
                operation: [
                    'getDeal',
                ],
            },
        },
    },
    {
        displayName: 'Additional FIelds',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: [
                    'deal',
                ],
                operation: [
                    'getDeal',
                ],
            },
        },
        options: [
            {
                displayName: '取引の債権債務行の表示',
                name: 'accruals',
                type: 'options',
                options: [
                    {
                        name: '表示しない',
                        value: 'without',
                    },
                    {
                        name: '表示する',
                        value: 'with',
                    },
                ],
                default: 'without',
            },
        ]
    },
] as INodeProperties[];


