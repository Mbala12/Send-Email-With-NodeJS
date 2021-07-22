const nodemailer = require('nodemailer');
const cron = require('node-cron');
const express = require('express');
const app = express();
const port = 3000;
const emailfrom = 'kimsfood20@gmail.com';
const emailto = 'jayapoulah@gmail.com';
const pwd = process.env.pass || 'XXXXXXXXXXX';

//Email message options
const mailoptions = {
    from: emailfrom,
    to: emailto,
    subject: 'Email from Node App: A test message',
    text: `Hello buddy 
           How are you doing <br/>
           I hope you successfully got my message from new app.`
};

//Email transport configuration
const transporter = nodemailer.createTransport({
    service: 'GMAIL',
    auth: {
        user: emailfrom,
        pass: pwd
    }
});

//Send Email
//cron.schedule(second[0-59], minute[0-59], hour[0-23], day of month[1-31], month[1-12], day of week[0-7] with 0 & 7 are sunday)
/* cron.schedule('* * * * * *', ()=>{
    console.log('Email sent successfully');
}); */
cron.schedule('0 3 18 20 7 2', ()=>{
    transporter.sendMail(mailoptions, (err, info)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(`Email send: ${info.response}`)
        }
    })
});


// Use of Express web server
app.get('/', (req, res)=>{
    res.send('Welcome to my Node JS App')
})

app.get('/good', (req, res)=>{
    res.send('Good morning my neighbor')
})

app.listen(port, ()=>{
    console.log(`Server is running at ${port}`)
})

