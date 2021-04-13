const ftp = require('basic-ftp');

exports.fetchXft = async function () {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    await client.access({
      host: process.env.XFT_FTP,
      user: process.env.XFT_FTP_USER,
      password: process.env.XFT_FTP_PASS,
      secure: false,
    });
    await client.downloadTo(
      'public/data/xftcpdstandard.xml',
      '/xftcpdstandard.xml'
    );

    return fetch('http://localhost:3000/data/xftcpdstandard.xml').then((res) =>
      res.text()
    );
  } catch (err) {
    console.log(err);
  }

  client.close();
};
