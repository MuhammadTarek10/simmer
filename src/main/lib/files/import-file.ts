import { dialog } from 'electron'
import readXlsxFile from 'read-excel-file/node'
import { schema } from './file-schema'

export const importFile = async () => {
  const result = await dialog.showOpenDialog({ properties: ['openFile'] })
  const files = result.filePaths

  if (files.length > 0 && files[0].includes('xlsx')) {
    const file = files[0]
    const data = await readXlsxFile(file, { schema: schema })

    data.rows.map((row) => {
      console.log(row.name)
    })
  }
}
