/**
 * Created by Amardeep on 02/07/17.
 */
module.exports = function (app) {
    var multer  = require('multer')
    var upload = multer({ dest: 'uploads/' })
    var QrCode = require('qrcode-reader');
    var qr = new QrCode();
    var fs = require('fs');
    var Jimp = require("jimp");
    result = false;
    app.post('/profile', upload.single('avatar'), function (req, res, next) {
        // req.file is the `avatar` file
        // req.body will hold the text
        // fields, if there were any
        console.log(req.file.filename)
        var fileName = req.file.filename
        var buffer = fs.readFileSync( 'uploads/' + fileName);

        Jimp.read(buffer, function(err, image) {
            if (err) {
                console.error(err);
                // TODO handle error
            }
            var qr = new QrCode();
            qr.callback = function(err, value) {
                if (err) {
                    console.error(err);
                    // TODO handle error
                    result= false;
                    res.redirect('/#/error')
                }
                console.log(value.result);
                console.log(value);
                if(value.result == 'Hello this is a test')
                    res.redirect('/#/sucess')
                else  res.redirect('/#/error');

            };
            qr.decode(image.bitmap);

        });
    })


    
    // var abc = function(fileName){
    //     var buffer = fs.readFileSync( 'uploads/' + fileName);
    //
    //     Jimp.read(buffer, function(err, image) {
    //         if (err) {
    //             console.error(err);
    //             // TODO handle error
    //         }
    //         var qr = new QrCode();
    //         qr.callback = function(err, value) {
    //             if (err) {
    //                 console.error(err);
    //                 // TODO handle error
    //                 result= false;
    //
    //             }
    //             console.log(value.result);
    //             console.log(value);
    //             result=  true;
    //
    //         };
    //         qr.decode(image.bitmap);
    //         return result;
    //     });
    // }

}
