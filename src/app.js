const express =require('express');
const path=require('path');
const hbs=require('hbs');
const geoCode=require('./utils/geocode');
const forecastCode=require('./utils/forecast');
const app=express();
const port=process.env.PORT || 3000 ;
//Define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials');

//Setup handlebars engine and  views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get('',(request,response)=>{
    response.render('index',{
        title:'Weather App',
        name:'Mayank Lal'
    });
});

app.get('/about',(request,response)=>{
    response.render('about',{
        title:'About Me',
        name:'Mayank Lal',
    });
});

app.get('/help/',(request,response)=>{
    response.render('help',{
        title:'Help',
        helpText:'This is some helpful text',
        name:'Mayank Lal'
    });
});

app.get('/weather',(request,response)=>{
    if(!request.query.location){
        return response.send({
            error:'Unable to retrieve location.Try with a valid search term.',
        });
    }
    geoCode(request.query.location,(error,{latitude,longitude,location,locationCode}={})=>{
        if(error)
            return response.send({error});
        else{
            forecastCode({latitude,longitude},(error,dataForecast)=>{
                if(error)
                    return response.send({error});
                else
                    response.send({
                        location:{
                            latitude,
                            longitude,
                            location,
                            locationCode,
                        },
                        TemperatureData:dataForecast.currently,
                    })
            });

        }

    });

});


app.get('/products',(request,response)=>{
    if(!request.query.search){
        return response.send({
            error:'You must provide a search term',
        });
    }else{
    }
});


app.get('/help/*',(request,response)=>{
    response.render('rootError',{
        title:'Error 404',
        name:'Mayank Lal',
        description:'Help article not found',
    });
});

app.get('*',(request,response)=>{
    response.render('rootError',{
        title:'Error 404',
        name:'Mayank Lal',
        description:'Page not found',
    });
});

app.listen(port,()=>{
    console.log(`Server is up and running on port ${port}.`);
});