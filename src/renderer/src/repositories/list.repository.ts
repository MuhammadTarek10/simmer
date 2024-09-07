import { ListInfo } from '@shared/models'

export async function getList(all?: boolean): Promise<ListInfo[]> {
  return await window.context.getList(all)
}
