var request = require('supertest');
var app = require('../lib/app.js');

describe('Response html or json', function () {
  //Если это обычный запрос, должны получить
  //ответ в виде html
  it('should be responded as html', function (done) {
    request(app)
      .get('/')
      .expect('Content-Type', /text\/html/)
      .expect(200, done);
  });

  //Если это аякс, должны получать json
  it('should be responded as json', function (done) {
    request(app)
      .get('/')
      .set('X-Requested-With', 'XMLHttpRequest')
      .expect('Content-Type', /application\/json/)
      .expect(200, done);
  });
});

describe('GET /', function () {

  it('should be included title', function (done) {
    request(app)
      .get('/')
      .end(function (err, res) {
        if (err) return done(err);
        res.text.should.include('<title>Phone book</title>');
        done();
      });
  });
});
