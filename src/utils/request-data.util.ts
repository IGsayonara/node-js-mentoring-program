const qs = require('querystring');

export const getPostData = (request) => {
    return new Promise((resolve)=> {
        let body = '';

        request.on('data', function (data) {
            body += data;
        });

        request.on('end', function () {
            resolve(qs.decode(body));
        });
    })
}