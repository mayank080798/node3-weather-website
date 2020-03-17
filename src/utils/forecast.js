const request=require('request');

const forecastCode=({latitude,longitude},callback)=>{
    const url='https://api.darksky.net/forecast/4247d08a56c6a01eb238a538f661a9c1/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'?units=si';
    request({url:url,json:true},(error,response)=>{
        if(error)
            callback('Invalid location',undefined);
        else if(response.body.error)
            callback('Unable to retrieve location.Try with a valid search term.',undefined);
        else{
            callback(undefined,response.body);
        }
        
    });
};

module.exports=forecastCode;