import Mocha from 'mocha';

const newdate = new Date();
const formattedDate = newdate.toLocaleString('id-ID', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

const mocha = new Mocha({
  timeout: 10000,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'report',
    reportFilename: '',
    reportTitle: `Test Report - ${formattedDate}`,
    timestamp: 'longDate',
    quite: true,
    html: true,
    json: true,
  },
  // parallel: true,
});

// mocha.addFile('./test/loginTest.mjs');
mocha.addFile('./test/inventoryTest.mjs');

mocha.run((failures) => {
  process.exitCode = failures ? 1 : 0;
});
