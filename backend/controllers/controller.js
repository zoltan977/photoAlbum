const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");

const photoController = (serviceName, methodName) =>
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const files = req?.files;
    const params = req?.params;
    const body = req?.body;
    const user = res?.locals?.user;

    const service = require(`../services/${serviceName}.service`);

    console.log(serviceName, methodName);

    const result = await service[methodName](params, body, user, files);

    return res.json(result);
  });

module.exports = photoController;
