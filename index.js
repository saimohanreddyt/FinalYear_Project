'use strict';
const {dialogflow, SignIn} = require('actions-on-google');
const app = dialogflow({
  // REPLACE THE PLACEHOLDER WITH THE CLIENT_ID OF YOUR ACTIONS PROJE
});
// Intent that starts the account linking flow.
app.intent('ask_for_sign_in', (conv) => {
conv.ask(new SignIn());
});

app.intent('ask_for_sign_in_confirmation', (conv, params, signin) => {
if (signin.status !== 'OK') {
return conv.ask('You need to sign in before using the app.');
}
// const access = conv.user.access.token;
// possibly do something with access token
conv.ask('Great! Thanks for signing in.');
});

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
admin.initializeApp({
   credential: admin.credential.applicationDefault(),
   databaseURL:'ws://farmers-project-256805.firebaseio.com/',
});


process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  function welcome (agent) {
    agent.add(`Welcome to my agent!`);
  }

  function fallback (agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }
  function handleWhatIDO(agent){
  }
  function handleOkay(agent){
  }
  function handleLOVEU(agent){
  }
  function handleBadWords(agent){
  }
  function handleGetthedetailsofRegisternumber(agent){
   
  const RegId = agent.parameters.RegId;
    
    agent.add("please wait");
    var ref1 =  admin.database().ref().child("FarmDB/");
// assuming regId is a field of RegID node
// also check if the type of your field is correct
var query1 = ref1.orderByChild("RegId").equalTo(RegId.toString());
return query1.once("value",function(snapshot) {
   
 snapshot.forEach(function(child) {
 
  console.log(child.key);
      // name field
   
  //console.log("FirstName: " + child.val().FirstName);
  //console.log("Mobile: " + child.val().MobileNumber);
  //console.log("Email: " + child.val().EmailId);
   //var name=+child.val().FirstName;
   
   agent.add(`The student name is  ` + child.val().FirstName);
  // agent.add(`The student mobile is ` + child.val().MobileNumber);
   //agent.add(`The student mail is ` + child.val().EmailId);
      //var email = snapshot.child("EmailId").val();
      //agent.add(`The student Mail is ` + email);
      //var mobi=snapshot.child().val().RegId;
      //var Regno = snapshot.child("RegId").val();
      //agent.add(`The student Register no is ` + Regno);
      //var name = snapshot.child("FirstName").val();
      //agent.add(`The student name is ` + name);
      //var year = snapshot.child("").val();
      //agent.add(`The student currently studying ` + year);
      //var Gradu = snapshot.child("").val();
      //agent.add(`The student Department is ` + Gradu);
agent.add(new Card({
    title: ` Name:${child.val().FirstName}
             Reg No: ${child.val().RegId}
             Current Year: ${child.val().CourseName}  
             Email :  ${child.val().EmailId}
             Mobile : ${child.val().MobileNumber}
             Department: ${child.val().GraduationTypeName}`,
          imageUrl: 'https://cms.qz.com/wp-content/uploads/2018/11/RTR20M19-e1542776171862.jpg?quality=75&strip=all&w=410&h=231',
         text:  `Thanks for using Google Assistant 💁\n FARMER💁`,
         
     })
  );
    }); 
  });                                                                                  
 
  } 
  function handlestudentname(agent){
    const FirstName=agent.parameters.FirstName;
    agent.add("Please wait boss I'm fetching the data from the database server");
    var ref2=admin.databse.ref().child("FarmDB/");
    var query2=ref2.orderByChild("FirstName").startAt(FirstName.toString());
    return query2.once("value",function(snapshot) {
      snapshot.forEach(function(child) {
 
  console.log(child.key);
      // name field
   
  console.log("FirstName: " + child.val().FirstName);
  console.log("Mobile: " + child.val().MobileNumber);
  console.log("Email: " + child.val().EmailId);
   //var name=+child.val().FirstName;
   
   agent.add(`The student name is  ` + child.val().FirstName);
agent.add(new Card({
    title: ` Name:${child.val().FirstName}
             Reg No: ${child.val().RegId}
             Current Year: ${child.val().CourseName}  
             Email :  ${child.val().EmailId}
             Mobile : ${child.val().MobileNumber}
             Department: ${child.val().GraduationTypeName}`,
          imageUrl: 'https://cms.qz.com/wp-content/uploads/2018/11/RTR20M19-e1542776171862.jpg?quality=75&strip=all&w=410&h=231',
         text:  `Thanks for using Saveetha Google Assistant 💁\n  FARMER 💁`,
         buttonText: 'Saveetha.com',
        buttonUrl: 'https://saveetha.com/'
     })
  );
    }); 
  });                                                                                  
 
  }
 
  function handleUpdatedata(agent){
    
    const ProductName = agent.parameters.ProductName;
     return admin.database().ref('FarmDB/0').update({
       ProductName:ProductName
      
       
     });
    
  }
    
 
  
  
  function handleIdentifyProduct(agent){
   
  const ProductId = agent.parameters.ProductId;
   
    var ref =  admin.database().ref().child("FarmDB/");
// assuming regId is a field of RegID node
// also check if the type of your field is correct
var query = ref.orderByChild("ProductId").equalTo(ProductId);
return query.once("value",function(snapshot) {
   
 snapshot.forEach(function(child) {
 
  console.log(child.key);
     
   
   agent.add(`The Product name is  ` + child.val().ProductName);
agent.add(new Card({
    title: ` PRODUCT ID:${child.val().ProductId}
             MANUFATURER: ${child.val().Manufaturer}
             PRODUCT NAME: ${child.val().ProductName}  
             QUANTITY:  ${child.val().Quantity}
             PRICE : ${child.val().Price}
             PURPOSE: ${child.val().Purpose}`,
          imageUrl: 'https://cms.qz.com/wp-content/uploads/2018/11/RTR20M19-e1542776171862.jpg?quality=75&strip=all&w=410&h=231',
         text:  `Thanks for using Farmers advice Google Assistant 💁\n  FARMER [BACK BONE OF INDIA ]💁`,
         buttonText: 'FARMER ADVICE WEBSITE',
        buttonUrl: 'https://googlee.technology'
     })
  );
    }); 
  });                                                                                  
 
  }
   function handleProductName(agent){
   
  const ProductName = agent.parameters.ProductName;
   
    var ref3 =  admin.database().ref().child("FarmDB/");
// assuming regId is a field of RegID node
// also check if the type of your field is correct
var query3 = ref3.orderByChild("ProductName").equalTo(ProductName);
return query3.once("value",function(snapshot) {
   
 snapshot.forEach(function(child) {
 
  console.log(child.key); 
   agent.add(`The product Id is  ` + child.val().ProductId);
   agent.add(`Manufaturer is  ` + child.val().Manufaturer);
agent.add(new Card({
    title: ` PRODUCT ID:${child.val().ProductId}
             MANUFATURER: ${child.val().Manufaturer}
             PRODUCT NAME: ${child.val().ProductName}  
             QUANTITY:  ${child.val().Quantity}
             PRICE : ${child.val().Price}
             PURPOSE: ${child.val().Purpose}`,
          imageUrl: 'https://cms.qz.com/wp-content/uploads/2018/11/RTR20M19-e1542776171862.jpg?quality=75&strip=all&w=410&h=231',
         text:  `Thanks for using Farmers advice Google Assistant 💁\n  FARMER [BACK BONE OF INDIA ]💁`,
         buttonText: 'FARMER ADVICE WEBSITE',
        buttonUrl: 'https://googlee.technology'
})
  );
    }); 
  });                                                                                  
 
  }
  function handlePurpose(agent){
   
  const ProductName = agent.parameters.ProductName;
   
    var ref4 =  admin.database().ref().child("FarmDB/");
// assuming regId is a field of RegID node
// also check if the type of your field is correct
var query4 = ref4.orderByChild("ProductName").equalTo(ProductName);
return query4.once("value",function(snapshot) {
   
 snapshot.forEach(function(child) {
 
  console.log(child.key); 
   agent.add(`The Purpose of product is  ` + child.val().Purpose);
   //agent.add(`Manufaturer is  ` + child.val().Manufaturer);
//agent.add(new Card({
 //   title: ` PRODUCT ID:${child.val().ProductId}
  //           //MANUFATURER: ${child.val().Manufaturer}
             //PRODUCT NAME: ${child.val().ProductName}  
            // QUANTITY:  ${child.val().Quantity}
          //   PRICE : ${child.val().Price}
        //     PURPOSE: ${child.val().Purpose}`,
      //    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7lF8oXwLpXitlizIdXVM-cGRTGqi79X3I4t5oBlNfhGe8mKN3Dg',
    //     text:  `Thanks for using Farmers advice Google Assistant 💁\n  FARMER [BACK BONE OF INDIA ]💁`,
  //       buttonText: 'FARMER ADVICE WEBSITE',
//        buttonUrl: 'https://googlee.technology'
//})
 // );
    }); 
  });                                                                                  
 
  }
  function handlePriceOfProduct(agent){
   
  const ProductName = agent.parameters.ProductName;
   
    var ref4 =  admin.database().ref().child("FarmDB/");
// assuming regId is a field of RegID node
// also check if the type of your field is correct
var query4 = ref4.orderByChild("ProductName").equalTo(ProductName);
return query4.once("value",function(snapshot) {
   
 snapshot.forEach(function(child) {
 
  console.log(child.key); 
   agent.add(`The Price of product is  ` + child.val().Price);
  
    }); 
  });                                                                                  
 
  }
  
 
 
  
  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('WhatIDO', handleWhatIDO);
  intentMap.set('Okay', handleOkay);
  intentMap.set('studentname',handlestudentname);
   intentMap.set('Purpose',handlePurpose);
  intentMap.set('ProductName',handleProductName);
  intentMap.set('IdentifyProduct', handleIdentifyProduct);
  intentMap.set('LOVEU', handleLOVEU);
  intentMap.set('Bad Words', handleBadWords);
  intentMap.set('Updatedata', handleUpdatedata);
  
  intentMap.set('GetthedetailsofRegisternumber', handleGetthedetailsofRegisternumber);
  agent.handleRequest(intentMap);
});
