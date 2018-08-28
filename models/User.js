import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['staff', 'free', 'premium'],
    default: 'free',
  },
});

// password hash middleware
userSchema.pre('save', function save(next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  return bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    return bcrypt.hash(user.password, salt, null, (bcryptErr, hash) => {
      if (err) {
        return next(bcryptErr);
      }

      user.password = hash;
      return next();
    });
  });
});

// validates user's password.
userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  const { password } = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, password, (err, isMatch) => {
      if (err) {
        reject(err);
      }

      resolve(isMatch);
    });
  });
};

const User = mongoose.model('User', userSchema);

export default User;
