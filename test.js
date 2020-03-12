const huya_danmu = require('./index')
const roomid = 'lpl'
const client = new huya_danmu(roomid)

client.on('connect', () => {
	console.log(`已连接huya ${roomid}房间弹幕~`)
})

client.on('message', msg => {
	switch (msg.type) {
		case 'chat':
			console.log(`[${msg.from.name}]:${msg.content}`)
			break
		case 'gift':
			console.log(`[${msg.from.name}]->赠送${msg.count}个${msg.name}`)
			break
		case 'online':
			console.log(`[当前人气]:${msg.count}`)
			break
	}
})

client.on('error', e => {
	console.log(e)
})

client.on('close', () => {
	console.log('close')
})

client.on('giftInfo', (data) => {
	const giftList = data.vPropsItemList.value
		.filter((item) => {
			return item.iTemplateType === 227 && item.vPresenterUid.value.length === 0;
		})
		.map((item) => {
			return {
				name: item.sPropsName,
				price: item.iPropsYb / 100,
				gif: item.vPropsIdentity.value[0].sPropsPicGif.split('&')[0],
				id: item.iPropsId,
				show: item.iTemplateType === 227
			}
		});
	console.log(JSON.stringify(giftList, null, 4));
});

client.start();