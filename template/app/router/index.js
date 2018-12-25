

module.exports = function (router) {


  router.get('/', function (req, res, next) {
    res.redirect('/admin/template/index.html');
  });
  router.get('/admin', function (req, res, next) {
    res.redirect('/admin/template/index.html');
  });


};




