import { OptionsWithUri } from 'request';
import {
    IExecuteFunctions,
    ILoadOptionsFunctions,
} from 'n8n-core';

export async function freeeApiRequest(this: IExecuteFunctions | ILoadOptionsFunctions, method: string, endpoint: string, body: any = {}): Promise<any> { // tslint:disable-line:no-any
    const options: OptionsWithUri = {
        method,
        headers: {
            'User-Agent': 'n8n,'
        },
        body,
        uri: '',
        json: true,
    };

    const baseUrl = 'https://api.freee.co.jp';
    options.uri = `${baseUrl}${endpoint}`;

    return await this.helpers.requestOAuth2?.call(this, 'freeeOAuth2Api', options);
}