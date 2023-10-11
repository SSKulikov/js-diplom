/**
 * Класс SearchBlock
 * Используется для взаимодействием со строкой ввода и поиска изображений
 * */
class SearchBlock {
  constructor( element ) {
    this.element = element
    this.registerEvents()
  }

  /**
   * Выполняет подписку на кнопки "Заменить" и "Добавить"
   * Клик по кнопкам выполняет запрос на получение изображений и отрисовывает их,
   * только клик по кнопке "Заменить" перед отрисовкой очищает все отрисованные ранее изображения
   */
  registerEvents(){
    this.element.addEventListener('click', (e) => {
      let input = this.element.querySelector('input').value.trim()
      
      if (input) {
        if (e.target.classList.contains('replace')) {
          App.imageViewer.clear()
          VK.get(input, (images) => {
            App.imageViewer.drawImages(images)
          })
        }

        if (e.target.classList.contains('add')) {
          VK.get(input, (images) => {
            App.imageViewer.drawImages(images)
          })
        }
      }
    })
  }

}