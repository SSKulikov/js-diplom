/**
 * Класс FileUploaderModal
 * Используется как всплывающее окно для загрузки изображений
 */
class FileUploaderModal {
  constructor( element ) {
    super(element)
    this.windowUploader = element[0].querySelector('.scrolling.content')
    this.registerEvents()
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по кнопке "Закрыть" на всплывающем окне, закрывает его
   * 3. Клик по кнопке "Отправить все файлы" на всплывающем окне, вызывает метод sendAllImages
   * 4. Клик по кнопке загрузке по контроллерам изображения: 
   * убирает ошибку, если клик был по полю вода
   * отправляет одно изображение, если клик был по кнопке отправки
   */
  registerEvents(){
    const xBtn = this.DOMElement.querySelector('.x.icon')
    const closeButton = this.DOMElement.querySelector('.ui.close.button')
    const sendAllButton = this.DOMElement.querySelector('.ui.send-all.button')

    xBtn.addEventListener('click', () => {this.close()})
    closeButton.addEventListener('click', () => {this.close()})
    sendAllButton.addEventListener('click', () => {this.sendAllImages()})

    this.windowUploader.addEventListener('click', (e) => {
      
      if (e.target.tagName == 'INPUT') {
        e.target.closest('.image-preview-container').querySelector('.input').classList.remove('error')
      }

      if (e.target.classList.contains('button') || e.target.classList.contains('upload')) {
        const imgContainer = e.target.closest('.image-preview-container')
        this.sendImage(imgContainer)
      }
    })
  }

  /**
   * Отображает все полученные изображения в теле всплывающего окна
   */
  showImages(images) {
    const reversList = [...images].reverse()

    for(let i=0; i < reversList.length; i++) {
      reversList[i] = this.getImageHTML(reversList[i].src)
    }

    this.windowUploader.innerHTML = reversList.join('\n')
  }

  /**
   * Формирует HTML разметку с изображением, полем ввода для имени файла и кнопкной загрузки
   */
  getImageHTML(item) {
    return `<div class="image-preview-container">
    <img src='${item}' />
    <div class="ui action input">
      <input type="text" placeholder="Путь к файлу">
      <button class="ui button"><i class="upload icon"></i></button>
    </div>
  </div>`
  }

  /**
   * Отправляет все изображения в облако
   */
  sendAllImages() {
    [...this.windowUploader.children].forEach((el) => {
      this.sendImage(el)
    })
  }

  /**
   * Валидирует изображение и отправляет его на сервер
   */
  sendImage(imageContainer) {
    const blockClassInput = imageContainer.querySelector('.input')
    const entryFieldInput = blockClassInput.querySelector('input').value

    if (entryFieldInput.trim() == '') {
      blockClassInput.classList.add('error')
      return
    }

    blockClassInput.classList.add('disabled')

    const blockImgUrl = imageContainer.querySelector('img').src
    const jpg = '.jpg'
    Yandex.uploadFile(entryFieldInput + jpg, blockImgUrl, () => {
      imageContainer.remove()
      if (this.windowUploader.children.length == 0) {
        this.close()
      }
    })
  }
}