const ftp = require('basic-ftp');

exports.fetchCeto = async function () {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    await client.access({
      host: process.env.CETO_FTP,
      user: process.env.CETO_FTP_USER,
      password: process.env.CETO_FTP_PASS,
      secure: false,
    });
    await client.downloadTo(
      process.env.DATA_DIR + '/ceto.xml',
      '/ceto/ceto.xml'
    );

    return fetch('http://localhost:3000/data/ceto.xml').then((res) =>
      res.text()
    );
  } catch (err) {
    console.log(err);
  }

  client.close();
};
