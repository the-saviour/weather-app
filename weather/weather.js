const request = require("request");


var getWeather = (lat,long,callback)=>{
	
	request({
		url: `https://api.darksky.net/forecast/12b156de50431af2b892f4f4bc3ec1e6/${lat},${long}`,
		json: true
	}, (error,response,body)=>{
		if (error){ 
			callback("Can't connect to weather server");
		}
		else if (body.code === 400){ 
			callback("unable to fetch weather");
		}
		else {
			callback(undefined,{
				temperature: body.currently.temperature,
				apparentTemp: body.currently.apparentTemperature});
		}
	});
}; 

module.exports.getWeather = getWeather;