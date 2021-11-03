const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');
const awsUtils = {};

AWS.config.update({
	s3: {
		accessKeyId: process.env.S3_ACCESS_KEY,
		secretAccessKey: process.env.S3_SECRET_KEY,
		region: process.env.REGION,
		apiVersion: process.env.AWS_S3_API_VERSION,
		signatureVersion: 'v4',
	}
});

const s3 = new AWS.S3();

awsUtils.uploadImage = (file, storagePath) => {
	return new Promise(async (resolve, reject) => {
		try {

			const extension = path.extname(file.originalFilename);
			const newFilename = `${new Date().valueOf()}${extension}`;
			const newPath = storagePath + newFilename;
			const myBucket = process.env.BUCKET_NAME;
			let params = {
				Bucket: myBucket,
				Key: newPath,
				Body: "",
				ACL: 'public-read',
				ContentType: file.type,
			};
			await fs.readFile(file.path, async (err, data) => {
				if (err) {
					throw err;
				}
				// original image upload
				params.Body = data;
				await s3.putObject(params, async (err, result) => {
					if (err) {
						return reject(err);
					}
					return resolve(newFilename);
				});
			});
			fs.unlinkSync(file.path);
		} catch (err) {
			return reject(err);
		}
	});
};

module.exports = awsUtils;