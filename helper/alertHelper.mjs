export class AlertHelper{
    static async accept() {
        await driver.wait(until.alertIsPresent());
        await driver.switchTo().alert();        
        await alert.accept();
    };

    static async dismiss() {
        await driver.wait(until.alertIsPresent());
        await driver.switchTo().alert();        
        await alert.dismiss();
    };
};