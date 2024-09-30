import { Menu } from 'electron'
import { importFile } from './lib/files/import-file'
import { exportFile } from './lib/files/export-file'

const template: Array<Electron.MenuItemConstructorOptions> = [
  {
    label: 'بيانات',
    submenu: [
      {
        label: 'استيراد ملف',
        click: importFile
      },
      {
        label: 'تصدير ملف',
        click: exportFile
      }
    ]
  }
]

export const createMene = () => {
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}
