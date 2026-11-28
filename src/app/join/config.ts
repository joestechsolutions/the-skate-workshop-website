// Where the app can be fetched. Both empty today: the app is not in the stores.
// Set a URL here only when that store listing is live.
export const joinConfig: { appStoreUrl: string; playStoreUrl: string } = {
  appStoreUrl: '',
  playStoreUrl: '',
}

export type JoinConfig = typeof joinConfig
