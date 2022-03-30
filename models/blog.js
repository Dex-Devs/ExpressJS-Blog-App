const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* 
    Schema will define the structure the document that we will store in our collection.

    Model will provide us an interface to perform actions related to our Database 
*/

// schema creation
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true}); // auto-generate createdAt and updatedAt

// model creation - mongoose.model(sing_collectionName, schema)first arg will be the singular form of the collection name in the server.

const BlogModel =mongoose.model('Blog', blogSchema);

module.exports = BlogModel;



