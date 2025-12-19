import Mocha from 'mocha';

const mocha = new Mocha({
    timeout : 10000,
    reporter : 'mochawesome',
    reporterOptions : {
        reportDir : 'report',
        reportFilename : '[status]_[datetime]-report',
        timestamp : 'longDate',
        quite : true,
        html : true,
        json : true
    }
});

mocha.addFile('./test/loginTest.mjs');
// mocha.addFile('./test/inventoryTest.mjs');


mocha.run(failures => {
    process.exitCode = failures ? 1:0;
});
