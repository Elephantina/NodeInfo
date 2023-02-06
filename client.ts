import { NodeInfo, WellKnown } from './nodeinfo.ts'

export const Client = async (domain: string): Promise<NodeInfo | null> => {
	const resp = await fetch(`${domain}/.well-known/nodeinfo`)
	if (resp.status !== 200) {
		return null
	}

	const href = FindVersion(await resp.json())
	if (!href) {
		return null
	}

	const dataResp = await fetch(href)
	if (dataResp.status !== 200) {
		return null
	}
	return await dataResp.json()
}

const FindVersion = ({ links }: WellKnown): string | null => {
	let v20 = ''
	let v21 = ''
	links.forEach(({ rel, href }) => {
		if (rel === 'http://nodeinfo.diaspora.software/ns/schema/2.0') {
			v20 = href
		}
		if (rel === 'http://nodeinfo.diaspora.software/ns/schema/2.1') {
			v21 = href
		}
	})

	return v21 !== '' ? v21 : v20 !== '' ? v20 : null
}
