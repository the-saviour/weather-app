const request = require("request");

var geocodeAddress = (address,callback)=>{

	var encodedAddress = encodeURIComponent(address);
	
	request ({
		url:`https://geocoder.api.here.com/6.2/geocode.json?app_id=fJwL7XD1hkohquECkoLv&app_code=iE_hJ73GW_6DKxb1UH-dBw&searchtext=${encodedAddress}`,
		json: true
	}, (error, response, body) =>{
		if (error){
			callback("Cannot connect to the location servers.");
		}
		
		else if(body.Response.View.length == 0){
			callback("Unable to find address.");
		}

		else {
			callback(undefined, {
				address: body.Response.View[0].Result[0].Location.Address.Label,	
				latitude: body.Response.View[0].Result[0].Location.DisplayPosition.Latitude,
				longitude: body.Response.View[0].Result[0].Location.DisplayPosition.Longitude
			});
		}
	});
};
	


module.exports = {
	geocodeAddress
};