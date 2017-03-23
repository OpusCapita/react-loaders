let fs = require('fs');
let path = require('path');
let express = require('express');
let httpProxy = require('http-proxy');
let request = require('request');

// proxy options
let options = require(path.join(__dirname, 'proxy.json'));

let userOptions = {};

let userOptionsPath = path.join(__dirname, '..', '..', '..', '.proxyrc');
if (fs.existsSync(userOptionsPath)) {
  userOptions = JSON.parse(fs.readFileSync(userOptionsPath));
}
// merge user options to main options
for (let option in userOptions) {
  options[option] = userOptions[option];
}

let proxy = httpProxy.createProxyServer({});
let router = express.Router();

let sessionCookie;

const url = require('url');

let contextPath = url.parse(options.url).pathname;

function proxyHandler(req, res) {
  req.headers.cookie = sessionCookie;
  if (contextPath && req.url.startsWith(contextPath)) {
    //fixing redirect: remove context path from redirect url
    req.url = req.url.substring(contextPath.length, req.url.length);
  }
  proxy.web(req, res, { target: options.url });
}

// catch redirect to login from server side and throw login failed
router.use('*/login', function(req, res, next) {
  sessionCookie = null;
  let err = new Error('Login failed');
  err.status = 401;
  next(err);
});

router.use(function(req, res, next) {
  if (sessionCookie) {
    proxyHandler(req, res);
  } else {
    console.log('logged as: ' + JSON.stringify(options));

    request.post(options.url + '/j_acegi_security_check', {
      form: {
        j_username: options.login,
        j_password: options.password,
        j_language: options.language,
        rememberMe: 'on'
      },
      json: false
    }, function(err, resp, body) {
      sessionCookie = resp.headers['set-cookie'][0].split(';')[0];
      proxyHandler(req, res);
    });
  }
});

module.exports = router;
