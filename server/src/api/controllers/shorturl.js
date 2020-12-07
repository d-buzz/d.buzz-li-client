const utils = require("../../services/utils");
const { Validator } = require("node-input-validator");
const { urlModel, whitelistedDomainModel } = require("../../models");

// Make url shorten
const shortenUrl = async (req, res, next) => {
  let response = { data: null, message: "Success", code: 200 };
  try {
    // input validation
    const v = new Validator(req.body, {
      url: "required",
    });
    const matched = await v.check();
    if (!matched) {
      return res.json(
        utils.jsonResponse(response.data, v.errors.url.message, 400)
      );
    }
    const { url } = req.body;
    // check if url exists / valid
    const validateUrl = await utils.checkUrlExists(url);
    if (!validateUrl) {
      return res.json(utils.jsonResponse(response.data, "Invalid url", 400));
    }
    // check if url exists in database
    const checkExistsDB = await urlModel.getByUrl(url);
    if (checkExistsDB) {
      response.data = {
        keyword: checkExistsDB.keyword,
      };
      return res.json(
        utils.jsonResponse(response.data, "Url already shortened")
      );
    }
    // check if url domain is blacklisted
    const whitelistedDomain = await whitelistedDomainModel.getAllActive();
    if (whitelistedDomain && whitelistedDomain.length > 0) {
      const domains = whitelistedDomain.map((x) => x.domain);
      const passedUrl =
        domains.filter((x) => x.toLowerCase() === utils.getUrlDomain(url)).length > 0;
      if (!passedUrl) {
        return res.json(
          utils.jsonResponse(response.data, "Blacklisted domain", 400)
        );
      }
    }
    // generate keyword
    const keyword = utils.generateKeyword(url);
    if (!keyword) {
      return res.json(
        utils.jsonResponse(response.data, "Failed to generate url keyword", 400)
      );
    }
    // get url remote title
    const urlMetaTitle = await utils.getUrlRemoteTitle(url);
    // set data to store
    const dataToStore = {
      keyword,
      url,
      ip: req.ip,
      title: urlMetaTitle,
      clicks: 0,
    };
    // save shortened url
    const saveIt = await urlModel.insert(dataToStore);
    if (!saveIt) {
      return res.json(
        utils.jsonResponse(response.data, "Failed to save shortened url", 400)
      );
    }
    // return shortened url
    response.data = {
      keyword: keyword,
    };
  } catch (error) {
    next(error);
    return res.json(utils.jsonResponse(response.data, error.message, 400));
  }
  return res.json(
    utils.jsonResponse(response.data, response.message, response.code)
  );
};

// Get original url by keyword
const getOrigUrl = async (req, res, next) => {
  const { keyword } = req.params;
  let response = { data: null, message: "Success", code: 200 };
  try {
    // get long url by keyword
    const getUrl = await urlModel.getByKeyword(keyword);
    if (!getUrl) {
      return res.redirect("/")
    }
    // update number of clicks
    let clicks = parseInt(getUrl.clicks) + 1;
    await urlModel.updateClicks(
      getUrl.id,
      parseInt(clicks)
    );

    // return original url
    response.data = {
      origUrl: getUrl.url,
    };
    return res.redirect(getUrl.url)
  } catch (error) {
    // next(error);
    return res.redirect("/")
  }
};

module.exports = {
  shortenUrl,
  getOrigUrl,
};
