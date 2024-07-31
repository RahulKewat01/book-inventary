// const mongoose = require('mongoose');

// const BookSchema = mongoose.Schema({pkey:{
//     book_name:{
//       tyepe:String,
//       required:true,
//       duplicate:false
//     } ,
//     author_name: {
//       type:String,
//       required:true,
//     },
//     author_email: {
//       type: String,
//       required:true
//     },
//     phone: {
//       type:Number,
//       required:true
//     },
//     is_active:  { type: Boolean, default: false },
//     is_verified:  { type: Boolean, default: false },
//     is_deleted:  { type: Boolean, default: false }
// }, {
//     timestamps: true
// }
// });

// module.exports = mongoose.model('Book', BookSchema);

const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
  book_name: {
    type: String, 
    required: [true, "book name is required"],
    unique: true 
  },
  author_name: {
    type: String,
    required: [true, "author name is required"],
  },
  author_email: {
    type: String,
    required: [true, "author email is required"],
    unique: true 
  },
  phone: {
    type: Number,
    required: [true, "Phone number is required"],
  },
  is_active: { 
    type: Boolean, 
    default: false 
  },
  is_verified: { 
    type: Boolean, 
    default: false 
  },
  is_deleted: { 
    type: Boolean, 
    default: false 
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Book', BookSchema);
