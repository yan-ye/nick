const modles = require('../models')

const modle = exports.modle = modles.user_social

exports.find = async (where, filed, sort, limit) => modle.find(where, filed).sort(sort).limit(limit).lean()

exports.findById = async id => modle.find({_id: id})

exports.save = async m => m.save()

exports.create = async data => modle.create(data)

exports.remove = async id => modle.remove({_id: id})

exports.updateOne = async (id, doc) => modle.updateOne({_id: id}, doc)


