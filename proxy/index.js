const express = require('express');
const request = require('request');
const querystring = require("querystring");
const app = express();

const PORT = process.env.PORT || 3000;
//const SERVER_HOST = 'epdev75.haifa.ac.il:51000'; // dev
const SERVER_HOST = 'epqa75.haifa.ac.il:52000'; // qa
const SERVER = `http://${SERVER_HOST}`;
const APP = 'projectName';
const USERNAME = "000" + "000000018";
const PASSWORD = "0123459";
const NG_PORT = 4200;
const NG_URL = `http://localhost:${NG_PORT}/#/period/1`;

console.log(`## Proxy initialized on http://localhost:${PORT} ##`);

function nocache(req, res, next) {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  next();
}

function authenticate(req, res) {
  const url = `${SERVER}/${APP}${req.url}`;

  console.log('*** AUTHENTICATE ***', url);

  request(
    {
      method: "GET",
      url,
      gzip: true,
    },
    (error, response, body) => {
      const regex = /name=\"j_salt\" value=\"(.*?)\"/gm;
      const matches = regex.exec(body);
      const form = {
        no_cert_storing: "on",
        j_salt: matches !== null && matches.length > 1 ? matches[1] : undefined,
        j_username: USERNAME,
        j_password: PASSWORD,
      };
      const formData = querystring.stringify(form);
      console.log(`## [Login in] with data: ${formData} on ${url} ##`);
      request({
        headers: {
          "Content-Length": formData.length,
          "Content-Type": "application/x-www-form-urlencoded",
          Host: SERVER_HOST,
          Origin: SERVER,
          Referer: url,
        },
        url,
        method: "POST",
        body: formData,
      }).on("response", (response) => {
        const setCookies = response.headers["set-cookie"];
        for (const keyvalCookie of setCookies) {
          const partsCookie = keyvalCookie.split(/=(.+)/);
          res.cookie(partsCookie[0], decodeURIComponent(partsCookie[1]), {
            encode: decodeURIComponent,
          });
        }
        return res.redirect(NG_URL);
      });
    }
  );
}

function proxy(req, res) {
  const url = `${SERVER}${req.url}`;
  console.log(`Proxy to url: ${url}`);
  try {
    req
      .pipe(request(url))
      .on("error", (err) => console.log(`error ${err}`))
      .pipe(res);
  } catch (e) {
    console.log("Error: " + e);
  }

}

app.use("/sso", nocache, authenticate);

app.use("/proxy", nocache, proxy);

app.listen(PORT, () => {
  console.log(`proxy listening on PORT :${PORT}`);
});
