const AWS = require('aws-sdk');
const fs = require('fs');

const AWS_ACCESS_KEY_ID = 'AKIA2DCWBCZ264T5SJ2V';
const AWS_SECRET_ACCESS_KEY = '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';
const BUCKET_NAME = 'missvalentine-images';
const REGION_NAME = 'ap-south-1';

// AWS.config.update({ region: REGION_NAME });

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

// const params = {
//   Bucket: BUCKET_NAME,
//   CreateBucketConfiguration: {
//     // Set your region here
//     LocationConstraint: REGION_NAME,
//   },
// };

// s3.createBucket(params, function (err, data) {
//   if (err) console.log(err, err.stack);
//   else console.log('Bucket Created Successfully', data.Location);
// });

module.exports.uploadFile = function (fileName, file) {
  // Read content from the file
  //   const fileContent = fs.readFileSync(fileName);

  // Setting up S3 upload parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName, // File name you want to save as in S3
    Body: file,
  };

  //   Uploading files to the bucket
  s3.upload(params, function (err, data) {
    if (err) {
      console.log('err-> ', err);
      return err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
    return data.Location;
  });
};