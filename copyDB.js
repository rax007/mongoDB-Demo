
//Load module mongoose
var mongoose = require('mongoose'),
    async = require('async');


//Define local host
var URISourceDBString = 'mongodb://localhost/sourceDB';
var URIDestinationDBString = 'mongodb://localhost/destinationDB';


var sourceDBConn = mongoose.createConnection(URISourceDBString);
var destinationDBConn = mongoose.createConnection(URIDestinationDBString);

sourceDBConn.on('error',function(err){
    console.log('err', err);
});


sourceDBConn.once('open', function () {
    console.log('source Database connection established!');

   /* mongoose.connection..collectionNames(function (error, names) {
        if (error) {
            console.log('Error: '+ error);
        } else {
            console.log(names);
        };
    });*/
});

destinationDBConn.once('open', function () {

    console.log('Destination Database connection established!');
});

//Defined Schema of personSchema

var personSchema = new mongoose.Schema({
    UserID:{type:Number, unique:true},
    Name:{type: String, min:5, max:30},
    Age:{type:Number, max:45}
}) ;

//Defined Schema of username
var usernameSchema = new mongoose.Schema({

    UserID:{type:Number, unique:true},
    Name:{type: String, min:5, max:30},
    Age:{type:Number, max:45}

});


//Defined Schema of company
var companySchema = new mongoose.Schema({

    ID:{type:Number, unique:true},
    Name:{type:String, max:30},
    Location:{type: String, min:5, max:30}

});

//Defined Collection

var usernameModel= sourceDBConn.model('username', usernameSchema);

//Defined Collection
var companyModel = sourceDBConn.model('company', companySchema);

//Defined Collection
var personModel= destinationDBConn.model('person', personSchema);
var OrgModel= destinationDBConn.model('Org', personSchema);

//add data to collection
var addDataToDB = function (dataObj, model ) {

 //intailise newEmp
 var newData = new model(dataObj);

 //save newEmp object
 newData.save(function (err) {
 if(err)
 console.log('Can not save '+ err);

 });

}

var newCompanyObj = {
    ID:41,
    Name:'toyata',
    Location:'california'
};

var newUserObj = {
    UserID:12,
    Name:'rax',
    Age:28
};

//addDataToDB(newCompanyObj, companyModel);

//Creating Query
var query = usernameModel.find();
query.exec(function (err, res) {
    if(err)
        console.log('not Executed:- '  + err);
    else {

//   console.log(res);
    }
});

//console.log('>>>>>>>>>>',data);

var copyCollection = function (srcDB, destDB) {
    var query = srcDB.find();
    query.exec(function (err, result) {
        if (err)
            console.log('not Executed:- ' + err);
        else {
//             console.log(result[1]);
//            copying data from source collection to destination collection

            var tasks = [];
            var localDestinationModel= destDB.model('person', personSchema);

            for (var objs in result) {
                tasks.push((function (obj) {
                    return  function (callback) {
                        var obj = new localDestinationModel(obj);
                        obj.save(function (err) {
                            if (err) {
                                // console.log("Error Data Saved " + err);
                                throw err;
                            }
                            callback(err, "ok");
                        });
                    }
                })(result[objs]));
            }


            async.series(tasks, function (err, result) {
                if (err) {
                    console.log("Error occurred during copying");
                    throw err;
                }
                else {
                    console.log("Data Copied Successfully");
                }

                mongoose.disconnect(function (err) {
                    if (err) {
                        throw err;
//                        console.log('error while disconnecting ', err);
                    }

                });
            })
        }

    });
}

function CopyMultiCollection(srcDB, srcDBcollectionString, destDB, destDBcollectionString) {
    var task = [];
    var srcCollectionsArray = srcDBcollectionString.split(',');
    var destCollectionsArray = destDBcollectionString.split(',');

    for (var d = 0; d < sourceCollArr.length; d++) {
        task.push((function () {
            return (function (srcdb,destd) {
                return function (callback) {

                    CopyCollections(srcdb,destd);
                    +
                        callback(null, "sucessfully done");
                }
            })('localhost', srcDB, srcCollectionsArray[d], 'localhost', destCollectionsArray, destCollArr[d]);
        }))();
    }

    async.parallel(task, function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result);
        }
    })
}
copyCollection(usernameModel, personModel);
