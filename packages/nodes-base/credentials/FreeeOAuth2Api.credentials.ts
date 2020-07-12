import {
	ICredentialType,
	NodePropertyTypes,
} from 'n8n-workflow';


export class FreeeOAuth2Api implements ICredentialType {
	name = 'freeeOAuth2Api';
	extends = [
		'oAuth2Api',
	];
	displayName = 'freee OAuth2 Api';
	properties = [
		{
			displayName: 'Webアプリ認証用URL',
			name: 'authUrl',
			type: 'string' as NodePropertyTypes,
			default: 'https://accounts.secure.freee.co.jp/public_api/authorize',
			required: true
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'string' as NodePropertyTypes,
			default: 'https://accounts.secure.freee.co.jp/public_api/token',
			required: true
		},
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string' as NodePropertyTypes,
			default: '',
			required: true,
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'string' as NodePropertyTypes,
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'hidden' as NodePropertyTypes,
			default: 'read write',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden' as NodePropertyTypes,
			default: 'body',
		},
	];
}
