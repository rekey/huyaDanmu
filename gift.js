const huya_danmu = require('./index');

exports.getGiftList = async (roomId) => {
	const client = new huya_danmu(roomId);
	return new Promise((resolve) => {
		client.once('giftInfo', (data) => {
			resolve(data.vPropsItemList.value
				.filter((item) => {
					return item.iTemplateType === 227 && item.vPresenterUid.value.length === 0;
				})
				.map((item) => {
					return {
						name: item.sPropsName,
						price: item.iPropsYb / 100,
						gif: item.vPropsIdentity.value[0].sPropsPicGif.split('&')[0],
						id: item.iPropsId
					}
				}));
			client.stop();
		});
		client.start();
	});
};
