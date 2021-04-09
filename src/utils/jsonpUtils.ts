interface params {
    [propName: string]: string | number
}


function jsonpGet (url: string, params?: params, callback = 'callback') {
    return new Promise((resolve, reject) => {
        // get our complete url
        let completeUrl: string;
        if (params) {
            completeUrl = url + '?'
            for (let i in params) {
                completeUrl += `${i}=${params[i]}&`
            }
            completeUrl += `${callback}=myback`
        } else {
            completeUrl = `${url}?${callback}=myback`
        }

        function myback (data: any) {
            // @ts-ignore
            window['jsonpData'] = data
            // @ts-ignore
            delete window['myback']
        }

        function cleanScript () {
            // @ts-ignore
            let script: HTMLElement = document.getElementById('for-jsonp')
            // @ts-ignore
            let parentNode: Node = script.parentNode
            parentNode.removeChild(script)
        }
        // @ts-ignore
        window['myback'] = myback

        // creste a script element
        let script: HTMLScriptElement = document.createElement('script')
        script.type = 'text/javascript'
        script.src = encodeURI(completeUrl)
        script.id = 'for-jsonp'
        script.onload = () => {
            cleanScript()
            // @ts-ignore
            resolve(window['jsonpData'])
            // @ts-ignore
            delete window['jsonpData']
        }
        script.onerror = (e: any) => {
            cleanScript()
            let errorText: string = `Your jsonp request to ${e.target.src} is fail, please check your url or params again.`
            reject(errorText)
        }
        let body: HTMLElement = document.body
        body.appendChild(script)
    })
}

export default jsonpGet