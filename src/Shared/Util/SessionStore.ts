export class SessionStore {
	private static accessTokenKey = 'app.accessToken';

	static get accessToken(): any {
		return localStorage.getItem(this.accessTokenKey);
	}

	static set accessToken(accessToken: string) {
		localStorage.setItem(this.accessTokenKey, accessToken);
	}

	private static accessTokenTyprKey = 'app.accessTokenType';

	static get accessTokenType(): any {
		return localStorage.getItem(this.accessTokenTyprKey);
	}

	static set accessTokenType(accessTokenType: string) {
		localStorage.setItem(this.accessTokenTyprKey, accessTokenType);
	}


}