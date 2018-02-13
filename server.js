var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser= require('body-parser');
app.use(cors());
app.use(bodyParser.json());
var inlineBase64 = require('nodemailer-plugin-inline-base64');


var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url='mongodb://rajatrawataku:ramu1%40boy@ds149743.mlab.com:49743/innerve_registration';
var nodemailer = require('nodemailer');
var response_value;


app.post('/endpoint', function(req, res){
  response_value="";
  var new_registration_enroll_func = function(db,callback){
  var contents={client_name:req.body.your_name_back,tel_number:req.body.telephone_value_back,email:req.body.email_value_back,message:req.body.message_value_back,date_of_registration:new Date()};

  var dbo = db.db("innerve_registration");

  if(req.body.email_value_back!=undefined)
  {
    dbo.collection('reg_table').insertOne(contents,function(err,res){
          assert.equal(err,null);
          console.log(req.body.email_value_back);
          console.log("Registred Sucessfully");
          response_value="Registred Sucessfully";
          db.close();

          var transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            auth: {
                user: "rajatrawataku1@gmail.com",
                pass: "9410900074"
            }
         });


          var mailOptions = {
            from: 'rajatrawataku1@gmail.com',
            to: req.body.email_value_back,
            subject: ' Drupple || Successful Registraion',
            html: '<head> <title> </title> <style> #one{ position: absolute; top:0%; left:0%; height: 60%; width: 40%; } #gatii{ position: absolute; top:5%; right:5%; height: 80%; width: 40%; } #text_div { position: absolute; top: 10%; left: 5%; } #final_regards { position: absolute; top: 50%; left: 5%; } </style> </head> <body> <div id="text_div"> <b>Thank you for joining Drupple. </b> <br> <br> We will get back to you shortly. <br> <br></div>  <br> <div id="final_regards"> Regards, <br><br> Team Drupple <br> <br> </div> </body>',
          };

          transporter.use('compile', inlineBase64());
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              console.log("email_not_sent");
              response_value="Not Registred Sucessfully";
            } else {
              console.log('Email sent: ' + info.response);
              res.writeHead(200,{'Content-Type':'text/html'});
              res.write("Your mail has been sent : "+info.response);
              response_value="Registred Sucessfully";
            }
          });
    });
    res.send({"val":response_value});
   }
  else {
    res.send({"val":"Not Registred Sucessfully"});
  }
}

  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    new_registration_enroll_func(db, function() {
        db.close();
    });
  });

});

app.get('/check',function(req,res){
   console.log("sdfxcvxzcdvdadfdf");
  res.send('kutta');
})

app.listen(3000);

// to download the file :  mongoexport -h ds149743.mlab.com:49743 -d innerve_registration -c reg_table -u rajatrawataku -p ramu1@anshu -o reg_table.csv --csv -f team_name,college_name,tel_number,email
