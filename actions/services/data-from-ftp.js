const ftp = require('basic-ftp');
const fs = require('fs');

/**
 *
 * @param { host: String, user: String, password: String, secure: Bool, dir: String } connexionIds
 * @param { string } filename
 * @returns
 */
exports.getDataFromFtp = async function (
  { host, user, password, secure, dir = '/' },
  filename
) {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    await client.access({
      host: host,
      user: user,
      password: password,
      secure: secure,
    });
    await client.downloadTo(
      process.env.DATA_DIR + '/' + filename,
      dir + '/' + filename
    );

    return fs.readFileSync(process.env.DATA_DIR + '/' + filename).toString();
  } catch (err) {
    console.log(err);
  }

  client.close();
};
