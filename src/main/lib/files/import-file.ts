import { FileSchema } from '@shared/types'
import { dialog } from 'electron'
import readXlsxFile from 'read-excel-file/node'
import { enterToDB } from '../file.actions'
import { schema } from './file-schema'

const readExcel = async (filepath: any, schema: any): Promise<FileSchema[]> => {
  const data = await readXlsxFile(filepath, { schema: schema })
  return data.rows as FileSchema[]
}

export const importFile = async () => {
  const result = await dialog.showOpenDialog({ properties: ['openFile'] })
  const files = result.filePaths

  if (files.length > 0 && files[0].includes('xlsx')) {
    const file = files[0]
    const data = await readExcel(file, schema)
    enterToDB(data)
  }
}
