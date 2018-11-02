const yargs = require("yargs");
const axios = require("axios");

const argv = yargs
	.options({
		address: {
			demand: true,
			alias: "a",
			describe: "Address to fetch address for",
			string: true
		}
	})
	.help()
	.alias("help","h")
	.argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://geocoder.api.here.com/6.2/geocode.json?app_id=fJwL7XD1hkohquECkoLv&app_code=iE_hJ73GW_6DKxb1UH-dBw&searchtext=${encodedAddress}`;

axios.get(geocodeUrl).then((response)=>{
	if(!response.data.Response.View.length){
		throw new Error('Unable to find the address.');
	}
	var lat = response.data.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
	var long = response.data.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
	var weatherUrl = `https://api.darksky.net/forecast/12b156de50431af2b892f4f4bc3ec1e6/${lat},${long}`;
	console.log(response.data.Response.View[0].Result[0].Location.Address.Label);
	return axios.get(weatherUrl);
	})	
	.then((response)=>{
		var temperature = response.data.currently.temperature;
		var apparentTemp = response.data.currently.apparentTemperature;
		console.log(`It's currently: ${temperature} but it feels like: ${apparentTemp}`);
	})
	.catch((e)=>{
	if(e.code === "ENOTFOUND"){
		console.log("Unable to connect to API");
	} else {
		console.log(e.message);
	}
	
});

