var mongoose = require('mongoose');
//Schema: structure of collection
var CategorySchema = mongoose.Schema(
   {
      name: {
         type: String
      },
      description: String    //shorthand
   }
);
var CategoryModel = mongoose.model("categories", CategorySchema);
//Note: "categories" is collection name
module.exports = CategoryModel;

