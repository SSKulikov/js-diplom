/**
 * Класс ImageViewer
 * Используется для взаимодействием блоком изображений
 * */
class ImageViewer {
  constructor( element ) {
    this.element = element
    this.imageBlock = element.querySelector('.row')
    this.previewImage = element.querySelector('.fluid')
    this.selectAll = element.querySelector('.select-all')
    this.send = element.querySelector('.send')
    this.registerEvents()
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по изображению меняет класс активности у изображения
   * 2. Двойной клик по изображению отображает изображаения в блоке предпросмотра
   * 3. Клик по кнопке выделения всех изображений проверяет у всех ли изображений есть класс активности?
   * Добавляет или удаляет класс активности у всех изображений
   * 4. Клик по кнопке "Посмотреть загруженные файлы" открывает всплывающее окно просмотра загруженных файлов
   * 5. Клик по кнопке "Отправить на диск" открывает всплывающее окно для загрузки файлов
   */
  registerEvents(){
    this.element.querySelector('.images-list').addEventListener('dblclick', (e) => {
      if (e.target.tagName == 'IMG') {
        this.previewImage.src = e.target.src
      }
    })

    this.element.querySelector('.images-list').addEventListener('click', (e) => {
      if (e.target.tagName == 'IMG') {
        e.target.classList.toggle('selected')
        this.checkButtonText()
      }
      
      if (e.target.classList.contains('select-all')) {
        
        const allImg = [...e.target.closest('.images-list').getElementsByTagName('img')]
        if (allImg.some(el => el.classList.contains('selected'))) {
          allImg.forEach(el => {
            el.classList.remove('selected')
          })
          
        } 
        else {
          allImg.forEach(el => {
            el.classList.add('selected')
          })
          
        }
        this.checkButtonText()
      }

      if (e.target.classList.contains('send')) {
        const fileUploader = App.getModal('fileUploader')
        const allSelectedImg = this.imageBlock.getElementsByClassName('selected')
        
        
        fileUploader.open()
        fileUploader.showImages(allSelectedImg)
      }

      if (e.target.classList.contains('show-uploaded-files')) {
        const filePreviewer = App.getModal('filePreviewer')
        filePreviewer.open()
        const i = document.querySelector('.asterisk.loading.icon.massive')
        Yandex.getUploadedFiles((error, data) => {filePreviewer.showImages(data)})
      }
    })
  }

  /**
   * Очищает отрисованные изображения
   */
  clear() {
    this.imageBlock.innerHTML = ''
  }

  /**
   * Отрисовывает изображения.
  */
  drawImages(images) {
    if (images.length > 0) {
      this.selectAll.classList.remove('disabled')
    }

    function createIMG(url) {
      let div = document.createElement('div')
      div.setAttribute('class', 'four wide column ui medium image-wrapper')

      let img = document.createElement('img')
      img.setAttribute('src', url)

      div.appendChild(img)
      return div

    }

    for(let i of images) {
      this.imageBlock.appendChild(createIMG(i))
    }
  }

  /**
   * Контроллирует кнопки выделения всех изображений и отправки изображений на диск
   */
  checkButtonText(){
    if ([...this.imageBlock.getElementsByTagName('img')].every(el => el.classList.contains('selected'))) {
      this.selectAll.textContent = 'Снять выделение'
    }
    else {
      this.selectAll.textContent = 'Выбрать всё'
    }

    if ([...this.imageBlock.getElementsByTagName('img')].some(el => el.classList.contains('selected'))) {
      this.send.classList.remove('disabled')
    }
    else {
      this.send.classList.add('disabled')
    }
  }

}