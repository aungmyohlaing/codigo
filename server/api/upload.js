const router = require('express').Router();
var multer  = require('multer')

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname)
    }
  })
   
  var upload = multer({ storage: storage }).single('file')

router.route('/upload')
.post( function(req, res, next){
    console.log("UPload function")
    upload(req, res, function(err){
        if (err instanceof multer.MulterError){
            return res.status(500).json(err);            
        } else if(err){
            return res.status(500).json(err)
        }

        return res.status(200).send(req.file);
    })
})

module.exports = router;