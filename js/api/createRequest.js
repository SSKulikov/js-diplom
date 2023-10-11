/**
 * Основная функция для совершения запросов по Yandex API.
 * */
const createRequest = (options = {}) => {
    const method = options.method
    let url = new URL(options.url)
    let headers = options.headers
    let params = options.data
    let callback = options.callback
    let error = null
    const xhr = new XMLHttpRequest()

    xhr.responseType = 'json'
    if (params) {
        Object.entries(params).forEach(([k, v]) => {
            url.searchParams.set(k, v)
        })
    }
    
    xhr.open(method, url)
    Object.entries(headers).forEach(([k, v]) => {
        xhr.setRequestHeader(k, v)
    })

    xhr.send()
    
    xhr.onload = () => {
        
        if (xhr.status >= 200 && xhr.status < 300) {
            callback(error, xhr.response)
            // console.log(xhr.response)
        }
    }
    
    
    xhr.onerror = function(msgError) {
        error = msgError
    }
};
