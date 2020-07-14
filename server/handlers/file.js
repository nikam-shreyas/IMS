var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/internship");
var conn = mongoose.connection;
var GridFsStorage = require("multer-gridfs-storage");
var Grid = require("gridfs-stream");
Grid.mongo = mongoose.mongo;
var gfs = Grid(conn.db("internship"), mongoose.mongo);

require("dotenv").config();
var storage = GridFsStorage({
  gfs: gfs,
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(
      null,
      file.fieldname +
        "-" +
        datetimestamp +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  },
  /** With gridfs we can store aditional meta-data along with the file */
  metadata: function (req, file, cb) {
    cb(null, { originalname: file.originalname });
  },
  root: "ctFiles", //root name for collection to store files into
});

var upload = multer({
  //multer settings for single upload
  storage: storage,
}).single("file");

exports.uploadCompletionCertificate = (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      res.json({ error_code: 1, err_desc: err });
      return;
    }
    res.json({ error_code: 0, err_desc: null });
  });
};

exports.downloadCompletionCertificate = (req, res) => {
  gfs.collection("ctFiles"); //set collection name to lookup into

  /** First check if file exists */
  gfs.files
    .find({ filename: req.params.filename })
    .toArray(function (err, files) {
      if (!files || files.length === 0) {
        return res.status(404).json({
          responseCode: 1,
          responseMessage: "error",
        });
      }
      /** create read stream */
      var readstream = gfs.createReadStream({
        filename: files[0].filename,
        root: "ctFiles",
      });
      /** set the proper content type */
      res.set("Content-Type", files[0].contentType);
      /** return response */
      return readstream.pipe(res);
    });
};

exports.getCompletionCertificateMetaData = (req, res) => {
  var filename = req.query.filename;
  gfs.exist({ filename: filename }, (err, file) => {
    if (err || !file) {
      res.send("File Not Found");
      return;
    }
    gfs.files.find({ filename: filename }).toArray((err, files) => {
      if (err) res.send(err);
      res.json(files);
    });
  });
};
