const wordRepo = require('./aggregatedWord.db.repository');

const getAll = async (userId, group, page, perPage, filter) =>
  wordRepo.getAll(userId, group, page, perPage, filter);

const get = async (wordId, userId) => wordRepo.get(wordId, userId);

const getCount = async (userId, filter) => wordRepo.getAllCount(userId, filter);

module.exports = { getAll, get, getCount };
