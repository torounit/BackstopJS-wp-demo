module.exports = function(casper, scenario, vp) {
  console.log('SCENARIO> ' + scenario.label);
  require('./clickAndHoverHelper')(casper, scenario);
  // add more helpers here...
  casper.evaluate(function () {
    console.log( 'set fonts');
    return document.querySelector('body').style.fontFamily = '"Noto Sans", "Noto Sans CJK JP", sans-serif';
  });
};
