const AWS = require('aws-sdk');

// Set your AWS credentials (either in the code, environment variables, or AWS config files)
AWS.config.update({
accessKeyId: '<your access key>',
secretAccessKey: '<your secret access key>',
region: 'us-west-1'
});

// Create an S3 instance
const s3 = new AWS.S3();

// Function to generate a signed URL
function generateS3SignedUrl(bucketName, objectKey, expirationTimeInSeconds = 3600) {
const params = {
Bucket: bucketName,
Key: objectKey,
Expires: expirationTimeInSeconds
};

// Generate a presigned URL for the S3 object
return new Promise((resolve, reject) => {
s3.getSignedUrl('getObject', params, (err, url) => {
if (err) {
reject(err);
} else {
resolve(url);
}
});
});
}

// Example usage
const bucketName = '<your s3 bucket name>';
const objectKey = 'personalFiles/abc.jpg'; //path on s3;
const expirationTimeInSeconds = 36; // 36 second

generateS3SignedUrl(bucketName, objectKey, expirationTimeInSeconds)
.then(signedUrl => {
console.log('S3 Signed URL:=======> ', signedUrl);
})
.catch(error => {
console.error('Error generating signed URL:', error);
});
