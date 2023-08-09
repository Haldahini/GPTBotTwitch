declare namespace NodeJS {
	interface ProcessEnv {
		USERNAME: string
		OAUTH_TOKEN: string
		OPENAI_SECRET_KEY: string
		OPENAI_ORG: string
		BOT_PREPROMPTS: string
		DEBUG: string
	}
}
