> use ecommerce
switched to db ecommerce

> db.createCollection("messages")
{ "ok" : 1 }

> db.createCollection("products")
{ "ok" : 1 }

> db.messages.insert([  { "userEmail": "car@gmail.com", "messageDate": "Tue Aug 31 2021 16:34:37 GMT-0300 (hora estándar de Argentina)", "userMessage": "car" }, { "userEmail": "duck@gmail.com", "messageDate": "Tue Aug 31 2021 16:34:37 GMT-0300 (hora estándar de Argentina)", "userMessage": "duck" }, { "userEmail": "asdas@gmail.com", "messageDate": "Tue Aug 31 2021 16:34:37 GMT-0300 (hora estándar de Argentina)", "userMessage": "asdas" }, { "userEmail": "car@gmail.com", "messageDate": "Tue Aug 31 2021 16:34:37 GMT-0300 (hora estándar de Argentina)", "userMessage": "car" }, { "userEmail": "duck@gmail.com", "messageDate": "Tue Aug 31 2021 16:34:37 GMT-0300 (hora estándar de Argentina)", "userMessage": "duck" }, { "userEmail": "asdas@gmail.com", "messageDate": "Tue Aug 31 2021 16:34:37 GMT-0300 (hora estándar de Argentina)", "userMessage": "asdas" }, { "userEmail": "car@gmail.com", "messageDate": "Tue Aug 31 2021 16:34:37 GMT-0300 (hora estándar de Argentina)", "userMessage": "car" }, { "userEmail": "duck@gmail.com", "messageDate": "Tue Aug 31 2021 16:34:37 GMT-0300 (hora estándar de Argentina)", "userMessage": "duck" }, { "userEmail": "asdas@gmail.com", "messageDate": "Tue Aug 31 2021 16:34:37 GMT-0300 (hora estándar de Argentina)", "userMessage": "asdas" }, { "userEmail": "asdas@gmail.com", "messageDate": "Tue Aug 31 2021 16:34:37 GMT-0300 (hora estándar de Argentina)", "userMessage": "asdas" } ])
BulkWriteResult({
        "writeErrors" : [ ],
        "writeConcernErrors" : [ ],
        "nInserted" : 10,
        "nUpserted" : 0,
        "nMatched" : 0,
        "nModified" : 0,
        "nRemoved" : 0,
        "upserted" : [ ]
})

> db.products.insert([ { "timestamp": "Mon Sep 06 2021 20:31:00 GMT-0300 (hora estándar de Argentina)", "name": "Calculator", "description": "Simple Calculator", "code": 214124, "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-128.png", "price": 123.45, "stock": 24, "__v": 0 }, { "timestamp": "Mon Sep 06 2021 20:53:00 GMT-0300 (hora estándar de Argentina)", "name": "Clock", "description": "Simple clock", "code": 52534, "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/clock-stopwatch-timer-time-128.png", "price": 345.0, "stock": 14, "__v": 0 }, { "timestamp": "Mon Sep 06 2021 20:32:52 GMT-0300 (hora estándar de Argentina)", "name": "Squad", "description": "Simple Squad", "code": 5252, "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png", "price": 234.56, "stock": 42, "__v": 0 }, { "timestamp": "Mon Sep 06 2021 20:31:00 GMT-0300 (hora estándar de Argentina)", "name": "Calculator", "description": "Simple Calculator", "code": 214124, "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-128.png", "price": 123.45, "stock": 24, "__v": 0 }, { "timestamp": "Mon Sep 06 2021 20:53:00 GMT-0300 (hora estándar de Argentina)", "name": "Clock", "description": "Simple clock", "code": 52534, "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/clock-stopwatch-timer-time-128.png", "price": 345.0, "stock": 14, "__v": 0 }, { "timestamp": "Mon Sep 06 2021 20:32:52 GMT-0300 (hora estándar de Argentina)", "name": "Squad", "description": "Simple Squad", "code": 5252, "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png", "price": 234.56, "stock": 42, "__v": 0 }, { "timestamp": "Mon Sep 06 2021 20:31:00 GMT-0300 (hora estándar de Argentina)", "name": "Calculator", "description": "Simple Calculator", "code": 214124, "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-128.png", "price": 123.45, "stock": 24, "__v": 0 }, { "timestamp": "Mon Sep 06 2021 20:53:00 GMT-0300 (hora estándar de Argentina)", "name": "Clock", "description": "Simple clock", "code": 52534, "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/clock-stopwatch-timer-time-128.png", "price": 345.0, "stock": 14, "__v": 0 }, { "timestamp": "Mon Sep 06 2021 20:32:52 GMT-0300 (hora estándar de Argentina)", "name": "Squad", "description": "Simple Squad", "code": 5252, "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png", "price": 234.56, "stock": 42, "__v": 0 }, { "timestamp": "Mon Sep 06 2021 20:32:52 GMT-0300 (hora estándar de Argentina)", "name": "Squad", "description": "Simple Squad", "code": 5252, "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png", "price": 234.56, "stock": 42, "__v": 0 } ])
BulkWriteResult({
        "writeErrors" : [ ],
        "writeConcernErrors" : [ ],
        "nInserted" : 10,
        "nUpserted" : 0,
        "nMatched" : 0,
        "nModified" : 0,
        "nRemoved" : 0,
        "upserted" : [ ]
})

> db.products.find()
{ "_id" : ObjectId("6146017a77a0302845b35550"), "timestamp" : "Mon Sep 06 2021 20:31:00 GMT-0300 (hora estándar de Argentina)", "name" : "Calculator", "description" : "Simple Calculator", "code" : 214124, "thumbnail" : "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-128.png", "price" : 123.45, "stock" : 24, "__v" : 0 }
{ "_id" : ObjectId("6146017a77a0302845b35551"), "timestamp" : "Mon Sep 06 2021 20:53:00 GMT-0300 (hora estándar de Argentina)", "name" : "Clock", "description" : "Simple clock", "code" : 52534, "thumbnail" : "https://cdn3.iconfinder.com/data/icons/education-209/64/clock-stopwatch-timer-time-128.png", "price" : 345, "stock" : 14, "__v" : 0 }
{ "_id" : ObjectId("6146017a77a0302845b35552"), "timestamp" : "Mon Sep 06 2021 20:32:52 GMT-0300 (hora estándar de Argentina)", "name" : "Squad", "description" : "Simple Squad", "code" : 5252, "thumbnail" : "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png", "price" : 234.56, "stock" : 42, "__v" : 0 }
{ "_id" : ObjectId("6146017a77a0302845b35553"), "timestamp" : "Mon Sep 06 2021 20:31:00 GMT-0300 (hora estándar de Argentina)", "name" : "Calculator", "description" : "Simple Calculator", "code" : 214124, "thumbnail" : "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-128.png", "price" : 123.45, "stock" : 24, "__v" : 0 }
{ "_id" : ObjectId("6146017a77a0302845b35554"), "timestamp" : "Mon Sep 06 2021 20:53:00 GMT-0300 (hora estándar de Argentina)", "name" : "Clock", "description" : "Simple clock", "code" : 52534, "thumbnail" : "https://cdn3.iconfinder.com/data/icons/education-209/64/clock-stopwatch-timer-time-128.png", "price" : 345, "stock" : 14, "__v" : 0 }
{ "_id" : ObjectId("6146017a77a0302845b35555"), "timestamp" : "Mon Sep 06 2021 20:32:52 GMT-0300 (hora estándar de Argentina)", "name" : "Squad", "description" : "Simple Squad", "code" : 5252, "thumbnail" : "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png", "price" : 234.56, "stock" : 42, "__v" : 0 }
{ "_id" : ObjectId("6146017a77a0302845b35556"), "timestamp" : "Mon Sep 06 2021 20:31:00 GMT-0300 (hora estándar de Argentina)", "name" : "Calculator", "description" : "Simple Calculator", "code" : 214124, "thumbnail" : "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-128.png", "price" : 123.45, "stock" : 24, "__v" : 0 }
{ "_id" : ObjectId("6146017a77a0302845b35557"), "timestamp" : "Mon Sep 06 2021 20:53:00 GMT-0300 (hora estándar de Argentina)", "name" : "Clock", "description" : "Simple clock", "code" : 52534, "thumbnail" : "https://cdn3.iconfinder.com/data/icons/education-209/64/clock-stopwatch-timer-time-128.png", "price" : 345, "stock" : 14, "__v" : 0 }
{ "_id" : ObjectId("6146017a77a0302845b35558"), "timestamp" : "Mon Sep 06 2021 20:32:52 GMT-0300 (hora estándar de Argentina)", "name" : "Squad", "description" : "Simple Squad", "code" : 5252, "thumbnail" : "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png", "price" : 234.56, "stock" : 42, "__v" : 0 }
{ "_id" : ObjectId("6146017a77a0302845b35559"), "timestamp" : "Mon Sep 06 2021 20:32:52 GMT-0300 (hora estándar de Argentina)", "name" : "Squad", "description" : "Simple Squad", "code" : 5252, "thumbnail" : "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png", "price" : 234.56, "stock" : 42, "__v" : 0 }

> db.messages.find()
{ "_id" : ObjectId("61460d1b77a0302845b3555a"), "userEmail" : "car@gmail.com", "messageDate" : "Tue Aug 31 2021 16:34:37 GMT-0300 (hora estándar de Argentina)", "userMessage" : "car" }
{ "_id" : ObjectId("61460d1b77a0302845b3555b"), "userEmail" : "duck@gmail.com", "messageDate" : "Tue Aug 31 2021 16:34:37 GMT-0300 (hora estándar de Argentina)", "userMessage" : "duck" }
{ "_id" : ObjectId("61460d1b77a0302845b3555c"), "userEmail" : "asdas@gmail.com", "messageDate" : "Tue Aug 31 2021 16:34:37 GMT-0300 (hora estándar de Argentina)", "userMessage" : "asdas" }
{ "_id" : ObjectId("61460d1b77a0302845b3555d"), "userEmail" : "car@gmail.com", "messageDate" : "Tue Aug 31 2021 16:34:37 GMT-0300 (hora estándar de Argentina)", "userMessage" : "car" }
{ "_id" : ObjectId("61460d1b77a0302845b3555e"), "userEmail" : "duck@gmail.com", "messageDate" : "Tue Aug 31 2021 16:34:37 GMT-0300 (hora estándar de Argentina)", "userMessage" : "duck" }
{ "_id" : ObjectId("61460d1b77a0302845b3555f"), "userEmail" : "asdas@gmail.com", "messageDate" : "Tue Aug 31 2021 16:34:37 GMT-0300 (hora estándar de Argentina)", "userMessage" : "asdas" }
{ "_id" : ObjectId("61460d1b77a0302845b35560"), "userEmail" : "car@gmail.com", "messageDate" : "Tue Aug 31 2021 16:34:37 GMT-0300 (hora estándar de Argentina)", "userMessage" : "car" }
{ "_id" : ObjectId("61460d1b77a0302845b35561"), "userEmail" : "duck@gmail.com", "messageDate" : "Tue Aug 31 2021 16:34:37 GMT-0300 (hora estándar de Argentina)", "userMessage" : "duck" }
{ "_id" : ObjectId("61460d1b77a0302845b35562"), "userEmail" : "asdas@gmail.com", "messageDate" : "Tue Aug 31 2021 16:34:37 GMT-0300 (hora estándar de Argentina)", "userMessage" : "asdas" }
{ "_id" : ObjectId("61460d1b77a0302845b35563"), "userEmail" : "asdas@gmail.com", "messageDate" : "Tue Aug 31 2021 16:34:37 GMT-0300 (hora estándar de Argentina)", "userMessage" : "asdas" }
{ "_id" : ObjectId("61460d5377a0302845b35564"), "userEmail" : "car@gmail.com", "messageDate" : "Tue Aug 31 2021 16:34:37 GMT-0300 (hora estándar de Argentina)", "userMessage" : "car" }
{ "_id" : ObjectId("61460d5377a0302845b35565"), "userEmail" : "duck@gmail.com", "messageDate" : "Tue Aug 31 2021 16:34:37 GMT-0300 (hora estándar de Argentina)", "userMessage" : "duck" }
{ "_id" : ObjectId("61460d5377a0302845b35566"), "userEmail" : "asdas@gmail.com", "messageDate" : "Tue Aug 31 2021 16:34:37 GMT-0300 (hora estándar de Argentina)", "userMessage" : "asdas" }
{ "_id" : ObjectId("61460d5377a0302845b35567"), "userEmail" : "car@gmail.com", "messageDate" : "Tue Aug 31 2021 16:34:37 GMT-0300 (hora estándar de Argentina)", "userMessage" : "car" }
{ "_id" : ObjectId("61460d5377a0302845b35568"), "userEmail" : "duck@gmail.com", "messageDate" : "Tue Aug 31 2021 16:34:37 GMT-0300 (hora estándar de Argentina)", "userMessage" : "duck" }
{ "_id" : ObjectId("61460d5377a0302845b35569"), "userEmail" : "asdas@gmail.com", "messageDate" : "Tue Aug 31 2021 16:34:37 GMT-0300 (hora estándar de Argentina)", "userMessage" : "asdas" }
{ "_id" : ObjectId("61460d5377a0302845b3556a"), "userEmail" : "car@gmail.com", "messageDate" : "Tue Aug 31 2021 16:34:37 GMT-0300 (hora estándar de Argentina)", "userMessage" : "car" }
{ "_id" : ObjectId("61460d5377a0302845b3556b"), "userEmail" : "duck@gmail.com", "messageDate" : "Tue Aug 31 2021 16:34:37 GMT-0300 (hora estándar de Argentina)", "userMessage" : "duck" }
{ "_id" : ObjectId("61460d5377a0302845b3556c"), "userEmail" : "asdas@gmail.com", "messageDate" : "Tue Aug 31 2021 16:34:37 GMT-0300 (hora estándar de Argentina)", "userMessage" : "asdas" }
{ "_id" : ObjectId("61460d5377a0302845b3556d"), "userEmail" : "asdas@gmail.com", "messageDate" : "Tue Aug 31 2021 16:34:37 GMT-0300 (hora estándar de Argentina)", "userMessage" : "asdas" }

> db.products.count()
10

> db.messages.count()
20

> db.products.insertOne({ "timestamp": "Mon Sep 06 2021 20:31:00 GMT-0300 (hora estándar de Argentina)", "name": "Calculator", "description": "Simple Calculator", "code": 214124, "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-128.png", "price": 123.45, "stock": 24, "__v": 0 })
{
        "acknowledged" : true,
        "insertedId" : ObjectId("6146121038780e43eea8b60f")
}

> db.products.find({"price": {$lt: 1000}})
{ "_id" : ObjectId("6146017a77a0302845b35550"), "timestamp" : "Mon Sep 06 2021 20:31:00 GMT-0300 (hora estándar de Argentina)", "name" : "Calculator", "description" : "Simple Calculator", "code" : 214124, "thumbnail" : "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-128.png", "price" : 123.45, "stock" : 24, "__v" : 0 }
{ "_id" : ObjectId("6146017a77a0302845b35551"), "timestamp" : "Mon Sep 06 2021 20:53:00 GMT-0300 (hora estándar de Argentina)", "name" : "Clock", "description" : "Simple clock", "code" : 52534, "thumbnail" : "https://cdn3.iconfinder.com/data/icons/education-209/64/clock-stopwatch-timer-time-128.png", "price" : 345, "stock" : 14, "__v" : 0 }
{ "_id" : ObjectId("6146017a77a0302845b35552"), "timestamp" : "Mon Sep 06 2021 20:32:52 GMT-0300 (hora estándar de Argentina)", "name" : "Squad", "description" : "Simple Squad", "code" : 5252, "thumbnail" : "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png", "price" : 234.56, "stock" : 42, "__v" : 0 }
{ "_id" : ObjectId("6146017a77a0302845b35553"), "timestamp" : "Mon Sep 06 2021 20:31:00 GMT-0300 (hora estándar de Argentina)", "name" : "Calculator", "description" : "Simple Calculator", "code" : 214124, "thumbnail" : "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-128.png", "price" : 123.45, "stock" : 24, "__v" : 0 }
{ "_id" : ObjectId("6146017a77a0302845b35554"), "timestamp" : "Mon Sep 06 2021 20:53:00 GMT-0300 (hora estándar de Argentina)", "name" : "Clock", "description" : "Simple clock", "code" : 52534, "thumbnail" : "https://cdn3.iconfinder.com/data/icons/education-209/64/clock-stopwatch-timer-time-128.png", "price" : 345, "stock" : 14, "__v" : 0 }
{ "_id" : ObjectId("6146017a77a0302845b35555"), "timestamp" : "Mon Sep 06 2021 20:32:52 GMT-0300 (hora estándar de Argentina)", "name" : "Squad", "description" : "Simple Squad", "code" : 5252, "thumbnail" : "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png", "price" : 234.56, "stock" : 42, "__v" : 0 }
{ "_id" : ObjectId("6146017a77a0302845b35556"), "timestamp" : "Mon Sep 06 2021 20:31:00 GMT-0300 (hora estándar de Argentina)", "name" : "Calculator", "description" : "Simple Calculator", "code" : 214124, "thumbnail" : "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-128.png", "price" : 123.45, "stock" : 24, "__v" : 0 }
{ "_id" : ObjectId("6146017a77a0302845b35557"), "timestamp" : "Mon Sep 06 2021 20:53:00 GMT-0300 (hora estándar de Argentina)", "name" : "Clock", "description" : "Simple clock", "code" : 52534, "thumbnail" : "https://cdn3.iconfinder.com/data/icons/education-209/64/clock-stopwatch-timer-time-128.png", "price" : 345, "stock" : 14, "__v" : 0 }
{ "_id" : ObjectId("6146017a77a0302845b35558"), "timestamp" : "Mon Sep 06 2021 20:32:52 GMT-0300 (hora estándar de Argentina)", "name" : "Squad", "description" : "Simple Squad", "code" : 5252, "thumbnail" : "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png", "price" : 234.56, "stock" : 42, "__v" : 0 }
{ "_id" : ObjectId("6146017a77a0302845b35559"), "timestamp" : "Mon Sep 06 2021 20:32:52 GMT-0300 (hora estándar de Argentina)", "name" : "Squad", "description" : "Simple Squad", "code" : 5252, "thumbnail" : "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png", "price" : 234.56, "stock" : 42, "__v" : 0 }
{ "_id" : ObjectId("6146121038780e43eea8b60f"), "timestamp" : "Mon Sep 06 2021 20:31:00 GMT-0300 (hora estándar de Argentina)", "name" : "Calculator", "description" : "Simple Calculator", "code" : 214124, "thumbnail" : "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-128.png", "price" : 123.45, "stock" : 24, "__v" : 0 }

> db.products.find({$and: [{"price": {$gte: 1000}}, {"price": {$lte: 3000}}]})

> db.products.find({"price": {$gt: 3000}})

> db.products.find({}, {"name": 1}).sort({"name": -1}).skip(2).limit(1)
{ "_id" : ObjectId("6146017a77a0302845b35552"), "name" : "Squad" }

> db.products.updateMany({}, {$set: {"stock": 100}})
{ "acknowledged" : true, "matchedCount" : 11, "modifiedCount" : 11 }

> db.products.updateMany({"price": {$gt: 4000}}, {$set: {"stock": 0}})
{ "acknowledged" : true, "matchedCount" : 0, "modifiedCount" : 0 }

> db.products.remove({"price": {$lt: 1000}})
WriteResult({ "nRemoved" : 11 })

> db.createUser(
...    {
...      user:"pepe",
...      pwd: "asd456",
...      roles:[ { role:"read", db:"ecommerce" } ]
...    }
... )
Successfully added user: {
        "user" : "pepe",
        "roles" : [
                {
                        "role" : "read",
                        "db" : "ecommerce"
                }
        ]
}
