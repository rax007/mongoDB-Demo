/**
 * Created by rakesh on 30/6/14.
 */

var mongoose = require("mongoose");
var URIString = 'mongodb://localhost/helloMongoose';

console.log('Node js Server Started');

mongoose.connect(URIString,function(err){
    if(err)
        console.log('Error Connection to DB:' + err);
    else
        console.log('Successfully Connected to the server');
});

////basic structure
//var userSchema = new mongoose.Schema({
//    name:String,
//    age:Number
//});
 //,VersionKey(false); for stopping creation of __v key

//Creating schema with constraint
var userSchema = new mongoose.Schema({
    name: {type:  String, unique:true},
    age: {type: Number, min:18, max:30}
});

//First Define schema then Collection
var newUsers = mongoose.model('Users', userSchema);

//Intailize
var sampleUser = new newUsers({
    name:'gaurav',
    age: 23
});

////save sampleUsers
//sampleUser.save(function (err){
//   if(err)
//       console.log("Error While saving user....."+ err);
//   else
//       console.log('Sucessfully saved user');
//});
//
////Executing mongo command find
//newUsers.find({}).exec(function (err,result) {
//    if(err)
//        console.log('Error encountered while fetchig data from DB'+ err);
//    else
//        console.log('Sucessfully executed');
//});

//Showing data sorted by age in descendent
newUsers.find({}).sort({age:1}).limit(0).exec(function (err,result) {
    if(err)
        console.log('Error encountered while fetchig data from DB'+ err);
    else
        console.log('Sucessfully executed'+ result);
});


newUsers.update({'name':'Rakesh Sherwal'},{'name': 'rax'},{multi:true}, function (err,result) {
    console.log(err,result);
});


//newUsers.where('age').select('age').gte(20).exec(function (err, result) {
//    console.log(err, result);
//});

var query =  newUsers.find({});
query.limit(2);
query.exec(function(err, result){
    console.log(err,result);
});