class XHR {
    constructor(options) {
        var defaults = {
            baseuri: '',
            responseType: 'json',
            headers: {}
        }
        this.settings = {};
        Object.keys(defaults).map((key) => {
            this.settings[key] = typeof options[key] === 'undefined' ? defaults[key] : options[key];
        });
    }
    setResponseType(responseType) {
        this.settings.responseType = responseType;
    }
    setHeader(key, value) {
        this.settings.headers[key] = value;
    }
    xhr(method, endpoint, payload) {
        return new Promise((resolve, reject) => {
            // Do the usual XHR stuff
            var request = new XMLHttpRequest();
            request.open(method, this.settings.baseuri + endpoint);
            request.responseType = this.settings.responseType;
            // Set request headers
            for (var key in this.settings.headers) {
                request.setRequestHeader(key, this.settings.headers[key]);
            };
            // Set formdata
            var formData = new FormData();
            for (var key in payload) {
                formData.append(key, payload[key]);
            }
            request.onload = this.onLoad.bind(this, request, resolve, reject);
            // Handle network errors
            request.onerror = this.onError.bind(this, request, resolve, reject);

            // Make the request
            request.send(formData);
        });
    }
    onLoad(request, resolve, reject) {
        // This is called even on 404 etc
        // so check the status
        if (request.status == 200) {
            // Resolve the promise with the response text
            resolve(request.response, request);
        } else {
            // Otherwise reject with the status text
            // which will hopefully be a meaningful error
            reject(request.response, request);
        }
    }
    onError(request, resolve, reject) {
        reject(Error("Network Error"));
    }
    get(endpoint, data) {
        var formData = [];
        for (var key in data) {
            formData.push(key + '=' + data[key]);
        }
        return this.xhr('get', endpoint + "?" + formData.join("&"), data);
    }
    post(endpoint, data) {
        return this.xhr('post', endpoint, data);
    }
    put(endpoint, data) {
        return this.xhr('put', endpoint, data);
    }
    delete(endpoint, data) {
        return this.xhr('delete', endpoint, data);
    }

}
module.exports = XHR;
