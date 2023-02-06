import { assertEquals } from 'https://deno.land/std@0.176.0/testing/asserts.ts'
import { NodeInfo } from './nodeinfo.ts'
import { Config, Server } from './server.ts'

Deno.test(async function testCall() {
	const cfg: Config = {
		domain: 'http://example.com',
		apiPath: '',
		version: '2.0',
		software: () => {
			return new Promise((resolve) => {
				resolve({ name: '1', version: 'v1.1.1' })
			})
		},
		protocol: 'activitypub',
		services: { inbound: [], outbound: [] },
		openRegistrations: false,
		usage: {
			users: {
				total: 1,
				activeHalfyear: 1,
				activeMonth: 1,
			},
			localPosts: 1,
			localComments: 1,
		},
		metadata: {},
	}

	const expect: NodeInfo = {
		version: '2.0',
		software: { name: '1', version: 'v1.1.1' },
		protocol: 'activitypub',
		services: { inbound: [], outbound: [] },
		openRegistrations: false,
		usage: {
			users: {
				total: 1,
				activeHalfyear: 1,
				activeMonth: 1,
			},
			localPosts: 1,
			localComments: 1,
		},
		metadata: {},
	}
	const handler = Server(cfg)
	const resp = handler(new Request('http://example.com/nodeinfo/2.0'), {
		localAddr: {
			transport: 'tcp',
			hostname: '',
			port: 0,
		},
		remoteAddr: {
			transport: 'tcp',
			hostname: '',
			port: 0,
		},
	}) as Promise<Response>

	const body = await (await resp).json()

	assertEquals(body, expect)
})
