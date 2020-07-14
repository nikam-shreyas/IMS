const router = require("express").Router();
const handle = require("../handlers");

router
  .route("/uploadCompletionCertificate")
  .get(handle.uploadCompletionCertificate);
router
  .route("/downloadCompletionCertificate")
  .get(handle.downloadCompletionCertificate);
router
  .route("/getCompletionCertificateMetaData")
  .get(handle.getCompletionCertificateMetaData);

module.exports = router;
