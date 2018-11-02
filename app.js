const yargs = require("yargs");
const geocode = require("./geocode/geocode.js");
const weather = require("./weather/weather.js");
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



geocode.geocodeAddress(argv.address, (errorMessage,results)=>{
	if(errorMessage){
		console.log(errorMessage);
	}

	else {
		console.log(`The adress is:${results.address}`);
		// console.log(`Printing address: ${JSON.stringify(results,undefined,2)}`);
		weather.getWeather(results.latitude,results.longitude, (errorMessage,weatherResults)=>{
			if(errorMessage){
				console.log(errorMessage);
			}
			else {
				console.log(`It's currently ${weatherResults.temperature} but feels like ${weatherResults.apparentTemp}`);
			}
	});
	}


});





