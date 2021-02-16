const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const nodemailer=require('nodemailer');
const dotenv=require('dotenv').config();
const fs=require('fs');

const app=express();
app.use(express.static(path.join(__dirname+'/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

var transport=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'lunaticfreak2017@gmail.com',
        pass:'753018925'
    }
})


const data=()=>{
    var data=fs.readFileSync('./data.json')
    return JSON.parse(data);
}

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/public/index.html'))
})

app.get('/appointment',(req,res)=>{
    res.sendFile(path.join(__dirname+'/public/book.html'))
})

app.post('/book',(req,res)=>{
    var name=req.body.name;
    var address=req.body.address;
    var work=req.body.work;
    var time=req.body.date;
    var place=req.body.place;
    var number=req.body.mobile;

    var mailOptions={
        from:process.env.USER_EMAIL,
        to:'bbcmohanty.1999@gmail.com',
        subject:'New Booking',
        text:`An appointment has been booked by the customer ${name}. She request for ${work} at ${time} in ${place}. Her contact number is ${number} `
    }
    if(address!==""){
        mailOptions={
            from:process.env.USER_EMAIL,
            to:'bbcmohanty.1999@gmail.com',
            subject:'New Booking',
            text:`A home service appointment has been booked by the customer ${name}. She request for ${work} at ${time} in ${address}. Her contact number is ${number} `
        }
    }
    transport.sendMail(mailOptions,(err,info)=>{
        if(err) console.log(err)
        console.log(err)
    })
    res.sendFile(path.join(__dirname+'/public/confirm.html'))
})

app.get('/data',(req,res)=>{
    res.send(data())
})

app.post('/postreview',(req,res)=>{
    var name=req.body.name;
    var msg=req.body.msg;
    var dat=data()
    let newData={
        name:name,
        msg:msg
    }
    dat.push(newData)
    fs.writeFile('./data.json',JSON.stringify(dat),(err)=>{
        if(err) throw err;
        console.log('done writing')
    })
    
    res.send(dat)
})


const port=process.env.PORT || 7070;
app.listen(port,(err)=>{
    console.log(`server started at ${port}`)
})