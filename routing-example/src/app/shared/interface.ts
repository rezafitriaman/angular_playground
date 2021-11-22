export interface ServerInfo {
  name: string,
  status: string
}
export interface Server extends ServerInfo {
  id: number | null
}
