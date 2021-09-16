> use test
switched to db test

> db.createCollection("items")
{ "ok" : 1 }

> db.items.insert(  [ { "name": "Noodles", "category": "Fluor", "stock": 20 }, { "name": "Milk", "category": "Dairy", "stock": 30 }, { "name": "Cream", "category": "Dairy", "stock": 15 } ])
BulkWriteResult({
        "writeErrors" : [ ],
        "writeConcernErrors" : [ ],
        "nInserted" : 3,
        "nUpserted" : 0,
        "nMatched" : 0,
        "nModified" : 0,
        "nRemoved" : 0,
        "upserted" : [ ]
})

> db.items.find()
{ "_id" : ObjectId("61437b8f048ce5d2af724ca3"), "name" : "Noodles", "category" : "Fluor", "stock" : 20 }
{ "_id" : ObjectId("61437b8f048ce5d2af724ca4"), "name" : "Milk", "category" : "Dairy", "stock" : 30 }
{ "_id" : ObjectId("61437b8f048ce5d2af724ca5"), "name" : "Cream", "category" : "Dairy", "stock" : 15 }

> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
test    0.000GB

> show collections
items
