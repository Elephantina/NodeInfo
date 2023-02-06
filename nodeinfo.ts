export type WellKnown = {
	links: {
		rel: string
		href: string
	}[]
}

export type NodeInfo = {
	version: Version
	software: Software
	protocol: Protocol

	services: Services
	openRegistrations: boolean
	usage: Usage
	metadata: Record<string, unknown>
}

export type Version = '2.0' | '2.1' // no support 1.x
export type Software = {
	/*
	 * The canonical name of this server software.
	 *
	 * Limited characters /^[a-z0-9-]+$/
	 */
	name: string

	/*
	 * The version of this server software.
	 */
	version: string

	/*
	 * The url of the source code repository of this server software.
	 */
	repository?: string

	/*
	 * The url of the homepage of this server software.
	 */
	homepage?: string
}

export type Protocol =
	| 'activitypub'
	| 'buddycloud'
	| 'dfrn'
	| 'diaspora'
	| 'libertree'
	| 'ostatus'
	| 'pumpio'
	| 'tent'
	| 'xmpp'
	| 'zot'

export type Services = {
	inbound: ServiceInbound[]
	outbound: ServiceOutbound[]
}
export type ServiceInbound = 'atom1.0' | 'gnusocial' | 'imap' | 'pnut' | 'pop3' | 'pumpio' | 'rss2.0' | 'twitter'
export type ServiceOutbound =
	| 'atom1.0'
	| 'blogger'
	| 'buddycloud'
	| 'diaspora'
	| 'dreamwidth'
	| 'drupal'
	| 'facebook'
	| 'friendica'
	| 'gnusocial'
	| 'google'
	| 'insanejournal'
	| 'libertree'
	| 'linkedin'
	| 'livejournal'
	| 'mediagoblin'
	| 'myspace'
	| 'pinterest'
	| 'pnut'
	| 'posterous'
	| 'pumpio'
	| 'redmatrix'
	| 'rss2.0'
	| 'smtp'
	| 'tent'
	| 'tumblr'
	| 'twitter'
	| 'wordpress'
	| 'xmpp'

export type Usage = {
	users: {
		total: number
		activeHalfyear: number
		activeMonth: number
	}
	localPosts: number
	localComments: number
}
