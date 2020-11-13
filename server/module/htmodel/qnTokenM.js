const qiniu = require('qiniu')
const { ACCESS_KEY, SECRET_KEY, BUCKET, EXPIRES } = require("../../config");

module.exports.getqnToken = (req, res) => {
    try {
        const mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);
        const putPolicy = new qiniu.rs.PutPolicy({
            scope: BUCKET,
            expires: EXPIRES, // 指定凭证过期时间
        });
        const uploadToken = putPolicy.uploadToken(mac);
        console.log(uploadToken);
        res.json({
            uploadToken,
            expires: EXPIRES
        })
    } catch (error) {
        res.json({
            ok:-1,
            msg:error
        })
    }
}