exports.getPostData = function(ctx) {

    return new Promise(function(resolve, reject) { //需要返回一个promise对象
        try {
            let str = '';
            ctx.req.on('data', function(chunk) {

                str += chunk;
            })
            ctx.req.on('end', function(chunk) {

                resolve(str);
            })


        } catch (err) {
            reject(err);

        }
    })

}