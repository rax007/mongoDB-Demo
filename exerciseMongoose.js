/**
 * Created by rakesh on 30/6/14.
 */

//Load module mongoose
var mongoose = require('mongoose');

//Define local host
var URIString = 'mongodb://localhost/intelliGrapeDB';

//Connecting to the server
mongoose.connect(URIString, function(err){

    if(err)
        console.log('Error connection failed ' + err);
    else
        console.log('Sucessfully connected:----');
});

//Defined Schema of DB
var intliEmpSchema = new mongoose.Schema({

    empID:{type:Number, unique:true},
    fName:{type: String, min:5, max:30},
    LName:{type: String, min:5, max:30},
    salary:{type: Number, min:5000, max:1000000},
    vertical:{type: String, default:'NodeJs'},
    contactNo:{type: String, min:10, max:10 },
    designation:{type: String, default:'software developer'}

});

//Defined Collection
var emp = mongoose.model('Emplyees', intliEmpSchema);


//intailise newEmp
/*var newEmp = new emp({

 empID:004,
 fName:'vineeta',
 LName:'gupta',
 salary:100000,
 vertical:'',
 contactNo:9654722961,
 designation:''

 });*/

//save newEmp object
newEmp.save(function (err) {
    if(err)
        console.log('Can not save '+ err);
    else
        console.log('object saved ');
})

//Creating Query

var query = emp.find();
query.exec(function (err, res) {
    if(err)
        console.log('not Executed:- '  + err);
    else
        console.log(res);
})


//Update DB

newEmp.update({salary:20000},{'fName': 'Mr. Deepak'}, function (err, noOfaffected,result) {
    if(err)
        console.log('Error: '+ err);
    else
        console.log('result:- ' + noOfaffected + result);
});

newEmp.remove({fName: "rakesh"}, function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Deleted Successfully");
    }
});
