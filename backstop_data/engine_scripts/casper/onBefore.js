module.exports = function (casper, scenario, vp) {
    require('./loadCookies')(casper, scenario);
    casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36');
    casper.thenOpen('http://127.0.0.1:8080/wp-login.php', function () {
        this.fill('form#loginform', {
            'log': 'admin',
            'pwd': 'admin'
        }, true);
        this.wait(1000);
    });
    casper.thenOpen(scenario.url);

};
