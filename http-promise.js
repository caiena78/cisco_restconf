var http = require('https');
var Promise = require('bluebird');
var util = require("util");



exports.https = Promise.method(function (options, Body) {
    return new Promise(function (resolve, reject) {
        var request = http.request(options, function (response) {
            // Bundle the result

            result = {
                'httpVersion': response.httpVersion,
                'httpStatusCode': response.statusCode,
                'headers': response.headers,
                'body': '',
                'trailers': response.trailers,
            };

            // Build the body
            response.on('data', function (chunk) {
                result.body += chunk;
            });

            response.on('end', function (data) {
                if (typeof(data)!='undefined'){
                    result.body += data;                    
                }

                switch(result.httpStatusCode){
                    case 200: 
                            resolve(result);
                            break;                        
                    case 404:                           
                           console.error(result);
                           reject(result);
                           break;
                    default:
                        console.error(result);
                        reject(result);
                        break;
                }
                
            });


        });

        // Handle errors
        request.on('error', function (error) {
            reject(error);
        });

        
        request.end(Body);
    });
});




