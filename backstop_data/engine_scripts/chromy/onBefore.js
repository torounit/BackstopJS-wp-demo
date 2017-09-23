module.exports = function (chromy, scenario, vp) {
    require('./loadCookies')(chromy, scenario);

    // IGNORE ANY CERT WARNINGS
    chromy.ignoreCertificateErrors()
        .goto('http://127.0.0.1:8080/wp-login.php')
        .type('input#user_login', 'admin')
        .type('input#user_pass', 'admin')
        .click('#wp-submit')
        .goto(scenario.url)

};
