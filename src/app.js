import './style.scss'
import { Select } from '../select'

const select = new Select('#select', {
  placeholder: 'Выберите элемент',
  data: [
    { id: '1', value: 'test' },
    { id: '2', value: 'test2' },
    { id: '3', value: 'test3' },
    { id: '4', value: 'test4' }
  ],
  onSelect(item) {
    console.log('selected', item)
  }
})

window.s = select
