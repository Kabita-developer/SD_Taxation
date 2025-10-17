const AWS = require('aws-sdk');

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1'
});

// Create S3 instance
const s3 = new AWS.S3();

// S3 configuration
const s3Config = {
  bucket: process.env.AWS_S3_BUCKET_NAME,
  region: process.env.AWS_REGION || 'us-east-1',
  acl: 'public-read', // Make uploaded files publicly readable
  folder: 'company-logos' // Folder within S3 bucket
};

// Function to generate unique filename
const generateFileName = (originalName) => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = originalName.split('.').pop();
  return `logo_${timestamp}_${randomString}.${extension}`;
};

// Function to upload file to S3
const uploadToS3 = async (file, folder = 'company-logos') => {
  try {
    const fileName = generateFileName(file.originalname);
    const key = `${folder}/${fileName}`;
    
    const uploadParams = {
      Bucket: s3Config.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: s3Config.acl
    };

    const result = await s3.upload(uploadParams).promise();
    return {
      success: true,
      url: result.Location,
      key: key,
      fileName: fileName
    };
  } catch (error) {
    console.error('S3 upload error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Function to delete file from S3
const deleteFromS3 = async (key) => {
  try {
    const deleteParams = {
      Bucket: s3Config.bucket,
      Key: key
    };

    await s3.deleteObject(deleteParams).promise();
    return { success: true };
  } catch (error) {
    console.error('S3 delete error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

module.exports = {
  s3,
  s3Config,
  uploadToS3,
  deleteFromS3,
  generateFileName
};
