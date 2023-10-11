/**
 * Класс PreviewModal
 * Используется как обозреватель загруженный файлов в облако
 */
class PreviewModal {
  constructor( element ) {
    super(element)
		this.windowPreview = element[0].querySelector('.scrolling.content')
		this.registerEvents()
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по контроллерам изображения: 
   * Отправляет запрос на удаление изображения, если клик был на кнопке delete
   * Скачивает изображение, если клик был на кнопке download
   */
  registerEvents() {
    const xBtn = this.DOMElement.querySelector('.x.icon')

		xBtn.addEventListener('click', () => {this.close()})

		this.windowPreview.addEventListener('click', (e) => {
			if (e.target.classList.contains('delete')) {
				const i = e.target.querySelector('i')
				i.classList.add('icon', 'spinner', 'loading')
				e.target.classList.add('disabled')
				let path = (e.target.dataset.path)

				Yandex.removeFile(path, (error) => {
					if (!error) {
						e.target.closest('.image-preview-container').remove()
					} 
					else {
						console.log(`ERROR!!! ${error}`)
						i.classList.remove('icon', 'spinner', 'loading')
						e.target.classList.remove('disabled')
					}
				})
			}

			if (e.target.classList.contains('download')) {
				Yandex.downloadFileByUrl(e.target.dataset.file)
			}
		})
  }


  /**
   * Отрисовывает изображения в блоке всплывающего окна
   */
  showImages(data) {
    if (data) {
      this.DOMElement.querySelector('.content').innerHTML = ''
    }

    const reverseItems = data.items
    reverseItems.reverse()

    for(let i=0; i < reverseItems.length; i++) {
      reverseItems[i] = this.getImageInfo(reverseItems[i])
    }

    this.windowPreview.innerHTML = reverseItems.join('\n')
  }

  /**
   * Форматирует дату в формате 2021-12-30T20:40:02+00:00(строка)
   * в формат «30 декабря 2021 г. в 23:40» (учитывая временной пояс)
   * */
  formatDate(date) {
    let dateTo = new Date(date)
		let option = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric'
		}
		return dateTo.toLocaleString('ru', option)
  }

  /**
   * Возвращает разметку из изображения, таблицы с описанием данных изображения и кнопок контроллеров (удаления и скачивания)
   */
  getImageInfo(item) {
    const kilobyte = Math.floor(item.size / 1000)
		const ruDate = this.formatDate(item.created)
		/*${item.preview}*/
    return `
		<div class="image-preview-container">
			<img src='${item.file}' />
			<table class="ui celled table">
				<thead>
					<tr><th>Имя</th><th>Создано</th><th>Размер</th></tr>
				</thead>
				<tbody>
					<tr><td>${item.name}</td><td>${ruDate}</td><td>${kilobyte}Кб</td></tr>
				</tbody>
			</table>
			<div class="buttons-wrapper">
				<button class="ui labeled icon red basic button delete" data-path='${item.path}'>
					Удалить
					<i class="trash icon"></i>
				</button>
				<button class="ui labeled icon violet basic button download" data-file='${item.file}'>
					Скачать
					<i class="download icon"></i>
				</button>
			</div>
		</div>
    `
  }
}
