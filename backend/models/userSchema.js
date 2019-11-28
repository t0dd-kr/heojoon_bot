const mongoose = require('mongoose');
const crypto = require('crypto');
const db = require('../db');
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, match : /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/ },
  nickname: { type: String, required: true },
  // password: { type: String, trim: true },
  // salt: { type: String, trim: true },
  level: {type: Number, default: 1},
  exp: {type: Number, default: 0},

  image: {type: String, trim: true, default: '' },

  balance: {type: Number, default: 0},

  themes: [
    { type: String }
  ],
  curTheme: { type: Number, default: -1 },

  joinIp: { type: String, trim: true, required: true },
  joinDate: { type: Date, required: true },

  lastLoginIp: { type: String, trim: true, default: '' },
  lastLoginDate: { type: Date, default: null },

  created: { type: Date, required: true },
  disabled: {type: Boolean, default: false},

  fb_id: {type: String, trim: true},
  google_id: {type: String, trim: true},
  kakao_id: {type: String, trim: true},

  id: mongoose.Schema.Types.ObjectId
});

// userSchema.index({ email: 1 });

// userSchema.methods.comparePassword = function(password, cb)  {
//   if(this.salt && this.password) {
//     crypto.pbkdf2(password, this.salt, 99321, 64, 'sha512', (err, key) => {
//       if(key.toString('base64') == this.password) {
//         cb(null, true);
//       } else {
//         cb('error');
//       }
//     })
//   } else {
//     cb('error')
//   }
// };

module.exports = db.model('User', userSchema);
