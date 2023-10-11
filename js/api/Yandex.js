/**
 * Класс Yandex
 * Используется для управления облаком.
 * Имеет свойство HOST
 * */
class Yandex {
  static HOST = 'https://cloud-api.yandex.net/v1/disk';

  /**
   * Метод формирования и сохранения токена для Yandex API
   */
  static getToken(){
    let token = localStorage.getItem('tokenYa')
    if (!token) {
      token = prompt('Токен от Яндекс Диска')
      localStorage.setItem('tokenYa', token)
    }
    return token
  }

  /**
   * Метод загрузки файла в облако
   */
  static uploadFile(path, url, callback){
    const options = {
      method: 'POST',
      url: this.HOST + '/resources/upload',
      data: {url, path},
      headers: {'Authorization': `OAuth ${this.getToken()}`},
      callback
    }
    createRequest(options)
  }

  /**
   * Метод удаления файла из облака
   */
  static removeFile(path, callback){
    const options = {
      method: 'DELETE',
      url: this.HOST + '/resources',
      data: {path},
      headers: {'Authorization': `OAuth ${this.getToken()}`},
      callback
    }
    createRequest(options)
  }

  /**
   * Метод получения всех загруженных файлов в облаке
   */
  static getUploadedFiles(callback){
    const options = {
      method: 'GET',
      url: this.HOST + '/resources/files',
      data: {limit:100},
      headers: {'Authorization': `OAuth ${this.getToken()}`},
      callback
    }
    createRequest(options)
  }

  /**
   * Метод скачивания файлов
   */
  static downloadFileByUrl(url){
    let link = document.createElement('a')
    link.setAttribute('href', url)
    link.click()
  }
}
