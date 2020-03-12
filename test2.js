const gift = require('./gift.js');

gift
	.getGiftList('lpl')
	.then((giftList) => {
		console.log(giftList);
	});