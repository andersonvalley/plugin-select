const getTemplate = ({ data = [], placeholder, selectedId }) => {
  let textPlaceholder = placeholder ?? 'Выберите элемент'

  const items = data.map((item) => {
    let cls = ''
    if (item.id === selectedId) {
      textPlaceholder = item.value
      cls = 'select__item-current'
    }
    return `
      <li class="select__item ${cls}" 
          data-type="item" 
          data-id="${item.id}">
          ${item.value}
      </li>
    `
  })

  return `
    <div class="select__overlay" data-type="overlay"></div>
    <div class="select__input" data-type="input">
        <span data-type="value">${textPlaceholder}</span>
        <i class="material-icons select__icon">expand_more</i>
    </div>
    <div class="select__dropdown">
        <ul class="select__list">
          ${items.join('')} 
        </ul>
    </div>
  `
}

export class Select {
  constructor(selector, options) {
    this.element = document.querySelector(selector)
    this.options = options
    this.selectedId = options.selectedId

    this.#render()
    this.#setup()
  }

  #render() {
    this.element.classList.add('select')
    this.element.innerHTML = getTemplate(this.options)
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this)
    this.element.addEventListener('click', this.clickHandler)
    this.value = this.element.querySelector('[data-type="value"]')
  }

  clickHandler(e) {
    if (e.target.dataset.type === 'input') {
      this.toogle()
    } else if (e.target.dataset.type === 'item') {
      this.select(e.target.dataset.id)
    } else if (e.target.dataset.type === 'overlay') {
      this.close()
    }
  }

  select(id) {
    this.selectedId = id
    this.value.textContent = this.current.value

    this.element.querySelectorAll('[data-type="item"]').forEach((el) => {
      el.classList.remove('select__item-current')
    })

    this.element
      .querySelector(`[data-id="${id}"]`)
      .classList.add('select__item-current')

    this.options.onSelect ? this.options.onSelect(this.current) : null
    
    this.close()
  }

  get isOpen() {
    return this.element.classList.contains('select-open')
  }

  get current() {
    return this.options.data.find((item) => item.id === this.selectedId)
  }

  toogle() {
    this.isOpen ? this.close() : this.open()
  }

  open() {
    this.element.classList.add('select-open')
  }

  close() {
    this.element.classList.remove('select-open')
  }

  destroy() {
    this.element.removeEventListener('click', this.clickHandler)
    this.element.innerHTML = ''
  }
}
