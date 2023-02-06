import { Handler } from 'https://deno.land/std@0.176.0/http/server.ts'
import { Protocol, Services, Software, Usage, Version } from './nodeinfo.ts'

export const Server = (cfg: Config): Handler => {
	const wellKnown = Array.isArray(cfg.version)
		? JSON.stringify({
			links: cfg.version.map((v) => ({
				rel: `http://nodeinfo.diaspora.software/ns/schema/${v}`,
				href: `${cfg.domain}${cfg.apiPath}/nodeinfo/${v}`,
			})),
		})
		: JSON.stringify({
			links: [{
				rel: `http://nodeinfo.diaspora.software/ns/schema/${cfg.version}`,
				href: `${cfg.domain}${cfg.apiPath}/nodeinfo/${cfg.version}`,
			}],
		})

	return (request) => {
		if (!request.url.startsWith(cfg.domain)) {
			return new Response(null, { status: 500 })
		}
		const path = request.url.substring(cfg.domain.length)

		if (path.startsWith('/.well-known/nodeinfo')) {
			return new Response(wellKnown)
		}

		const version = path.substring(`${cfg.apiPath}/nodeinfo/`.length)
		if (version === '') {
			return new Response(null, { status: 404 })
		}

		return (async () =>
			new Response(JSON.stringify({
				version: version,
				software: await getData(cfg.software),
				protocol: await getData(cfg.protocol),
				services: await getData(cfg.services),
				openRegistrations: await getData(cfg.openRegistrations),
				usage: await getData(cfg.usage),
				metadata: await getData(cfg.metadata),
			})))()
	}
}

export type Config = {
	domain: string
	apiPath: string // example: /api/v1/nodeinfo/2.0 => /api/v1

	version: Version | Version[]
	software: Get<Software>
	protocol: Get<Protocol>

	services: Get<Services>
	openRegistrations: Get<boolean>
	usage: Get<Usage>
	metadata: Get<Record<string, unknown>>
}

type Get<T> = T | (() => Promise<T>)

const getData = async <T>(g: Get<T>): Promise<T> => {
	return g instanceof Function ? await g() : g
}
