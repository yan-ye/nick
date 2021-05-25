const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * {   social_token: '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',
          old_token: '',
          email: '',
          provider: 'github',
          social_id: '25119861',
          display_name: '闫野',
          avatar_url: 'https://avatars.githubusercontent.com/u/25119861?v=4'
      }
 *
 * */
const schema = new Schema({
    social_id: {type: String, required: true},//ID
    email:String,//email
    display_name: String,//名称
    provider: String,//名称
    avatar_url: String,//图标文件ID
    create_date: {type: Date, default: Date.now},//创建时间
    update_date: {type: Date, default: Date.now},//修改时间
}, {collection: 'user_social', versionKey: false});

schema.index({id: 1}, {unique: true});//ID唯一索引
schema.index({name: 1});
schema.index({social_id: 1});

mongoose.model('user_social', schema);
