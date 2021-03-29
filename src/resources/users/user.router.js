const { OK, NO_CONTENT } = require('http-status-codes');
const router = require('express').Router();

const userService = require('./user.service');
const { id, user } = require('../../utils/validation/schemas');
const multer = require('multer');
const moment = require('moment');
const path = require('path');


const storage = multer.diskStorage({

  destination:function(req, file, cb) {
    cb(null, path.join(__dirname, 'avatars'))
  },

  filename:function(req, file, cb) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS')
    cb(null, `${date}-${file.originalname}`)
  }
})

const loader = multer({ storage: storage });
const {
  validator,
  userIdValidator
} = require('../../utils/validation/validator');

router.post(
  '/',
  loader.single('avatar'),
  validator(user, 'body'),
  async (req, res) => {
    const avatar = req.file ? req.file.path : '';
    const body = { ...req.body, avatar };
    const userEntity = await userService.save(body);
    res.status(OK).send(userEntity.toResponse());
  }
);

router.get(
  '/:id',
  userIdValidator,
  validator(id, 'params'),
  async (req, res) => {
    const userEntity = await userService.get(req.params.id);
    res.status(OK).send(userEntity.toResponse());
  }
);

router.put(
  '/:id',
  userIdValidator,
  validator(id, 'params'),
  validator(user, 'body'),
  async (req, res) => {
    const userEntity = await userService.update(req.userId, req.body);
    res.status(OK).send(userEntity.toResponse());
  }
);

router.delete(
  '/:id',
  userIdValidator,
  validator(id, 'params'),
  async (req, res) => {
    await userService.remove(req.params.id);
    res.sendStatus(NO_CONTENT);
  }
);

module.exports = router;
