import { Menu } from 'electron'
import { exportFile } from './lib/files/export-file'
import { importFile } from './lib/files/import-file'

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
