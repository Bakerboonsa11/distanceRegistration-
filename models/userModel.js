const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For hashing passwords

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A user must have a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'A user must have an email'],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
        },
        message: 'Please provide a valid email',
      },
    },
    phoneNumber: {
      type: String,
      required: [true, 'A user must have a phone number'],
      unique: true,
      validate: {
        validator: function (value) {
          return /^(09|07)\d{8}$/.test(value); // Ethiopian/Kenyan phone format
        },
        message: 'Please provide a valid phone number',
      },
    },
    uid: {
      type: String,
      required: [true, 'A user must have a UID'],
      minlength: 6,
      select: false, // Hide UID from queries
    },
    avatar: {
      type: String,
      default: 'default-avatar.png',
    },
    departement:{
    
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department', // Assuming Departemnt is another model
 
    },
   registeredCourses: [
    {
        type: String,
        validate: {
        validator: function (value) {
            return new Set(value).size === value.length; // Ensure all values are unique
        },
        message: 'Duplicate course IDs are not allowed',
        },
    },
   ],

    batch: {
      batchNumber: { type: Number, required: true },
      year: { type: Number, required: true },
    },
  },
  { timestamps: true } // Automatically adds `createdAt` & `updatedAt`
);

// Hash `uid` before saving (if it's a password)
userSchema.pre('save', async function (next) {
  if (!this.isModified('uid')) return next();
  this.uid = await bcrypt.hash(this.uid, 12);
  next();
});


// Middleware to hash the password before saving
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next(); // Skip if password is not modified

//   this.password = await bcrypt.hash(this.password, 12); // Hash the password
//   next();
// });

// userSchema.pre(/^find/, function (next) {
  
//   if (!this._populatedContacts) {
//     this.populate('contacts'); // Populate only if not already populated
//     this._populatedContacts = true; // Set a flag to prevent recursion
//   }
//   next();
// });

// Instance method to check password validity
// userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

// userSchema.methods.ispasswordUpdated=function(iat){

//   if(this.changedPasswordAt){
//        const newchangedPasswordAt= parseInt(this.changedPasswordAt.getTime()/1000,10)

//        return newchangedPasswordAt>iat
//   }
//   else{
//       return false
//   }
    
// }

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;






