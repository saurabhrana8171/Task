const helper = {};
var path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');



helper.response = function (response, status_code, message, data) {
	//console.log('------SENDING RESPONSE------', data)
	//console.log('------RESPONSE MESSAGE', message)
	var ret = {
		code: status_code,
		message: message,
	};
	if (data) {
		Object.assign(ret, data);
	}
	response.status(status_code).json(ret);
};

helper.date = () => {

	var lastActive = new Date();
    lastActive.setHours(lastActive.getHours() + 5);
     lastActive.setMinutes(lastActive.getMinutes() + 30)
	 return lastActive

};
helper.addImageHttps = (location) => {
	var matched = "https://";
	if (location.indexOf(matched) != 0) {
		location = matched + location;
	}
	return location;
};
helper.generateRandNo = () => {
	let rand_no = Math.random();
	let num = Math.floor(rand_no * 10000000000 + 1);
	return num; /*10 digit random number*/
}

helper.pagination = (items, page, per_page) => {

	var page = page || 1,
		per_page = per_page || 10,
		offset = (page - 1) * per_page,
		total_pages = Math.ceil(items / per_page);
	return {
		page: page,
		per_page: per_page,
		pre_page: page - 1 ? page - 1 : null,
		next_page: (total_pages > page) ? page + 1 : null,
		total: items,
		total_pages: total_pages
	};

};

helper.upload_space = function (filepath) {
	const s3 = new aws.S3({
		accessKeyId: process.env.AWS_SPACE_KEY_ID,
		secretAccessKey: process.env.AWS_SPACE_ACCESS_KEY,
	});

	const upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: `mxmusicschool/${filepath}`,
            key: function (request, file, cb) {
                // Generate a unique filename for the uploaded file
                const fileExt = path.extname(file.originalname); // Get the file extension
                const timestamp = new Date().getTime(); // Get a timestamp for uniqueness
                const randomString = Math.random().toString(36).substring(7); // Generate a random string

                const uniqueFileName = `${timestamp}-${randomString}${fileExt}`;
                cb(null, uniqueFileName);
            },
            contentType: function (request, file, cb) {
                if (file.mimetype === 'application/pdf') {
                    cb(null, 'application/pdf');
                } else {
                    cb(null, file.mimetype);
                }
            }
        }),
    });



	return upload;
};


module.exports = helper;