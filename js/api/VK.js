/**
 * Класс VK
 * Управляет изображениями из VK. С помощью VK API.
 * С помощью этого класса будет выполняться загрузка изображений из vk.
 * Имеет свойства ACCESS_TOKEN и lastCallback
 * */
class VK {

  static ACCESS_TOKEN = ((e) => {
    if (localStorage.getItem('tokenVK')) {
      return localStorage.getItem('tokenVK')
    }
    else {
      const token = prompt('Токен от VK')
      localStorage.setItem('tokenVK', token)
      return token
    }
  })();
  
  static lastCallback;
  /**
   * Получает изображения
   * */
  static get(id = '', callback){
    this.lastCallback = callback
    const script = document.createElement('script')
    script.setAttribute('class', 'scriptVK')
    script.src = `https://api.vk.com/method/photos.get?owner_id=${id}&album_id=profile&access_token=${this.ACCESS_TOKEN}&v=5.131&callback=VK.processData`
    document.body.appendChild(script)
  }

  /**
   * Передаётся в запрос VK API для обработки ответа.
   * Является обработчиком ответа от сервера.
   */
  static processData(result){
    const script = document.querySelector('.scriptVK')

    // console.log('ИЗ ВК', script)
    if (script) {
      script.remove()
    }
    
    if (result.error) {
        alert(result.error.error_msg)
        return
    }
    const imagesList = []
    const images = result.response.items
    images.forEach(el => {
        let url = (el.sizes[el.sizes.length-1].url)
        imagesList.push(url)
    })
    this.lastCallback(imagesList)
    this.lastCallback = null
  }
}
