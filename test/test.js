var request = require('supertest');
var app = require('../lib/app.js');

describe('CRUD', function () {

  it('delete all', function (done) {
    request(app)
      .del('/api/subscribers')
      .expect(200, done);
  });

  it('create', function (done) {
    request(app)
      .post('/api/subscribers')
      .send({name: 'qwerty', phoneNumber: '123456789'})
      .expect(200, done);
  });

  it('create - fail', function (done) {
    request(app)
      .post('/api/subscribers')
      .send({name: '', phoneNumber: '123456789'})
      .expect(500, done);
  });


  it('create - fail', function (done) {
    request(app)
      .post('/api/subscribers')
      .send({name: 'qwertyuiopqwertyuiopqwertyuiopqwertyuiopq' +
        'wertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyui' +
        'opqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuio' +
        'pqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiop', phoneNumber: '123456789'})
      .expect(500, done);
  });

  it('create - fail', function (done) {
    request(app)
      .post('/api/subscribers')
      .send({name: 'test', phoneNumber: '1234567890123456789012345678901234567890' +
        '1234567890123456789012345678901234567890123456789012345678901234567890' +
        '1234567890123456789012345678901234567890123456789012345678901234567890'})
      .expect(500, done);
  });

  var subscriber;

  it('get all', function (done) {
    request(app)
      .get('/api/subscribers')
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        var subscribers = res.body;
        subscriber = subscribers[0];
        done();
      });
  });

  it('get', function (done) {
    request(app)
      .get('/api/subscribers/' + subscriber._id)
      .expect(200, done);
  });

  it('update', function (done) {
    subscriber.name = 'new';

    request(app)
      .put('/api/subscribers/' + subscriber._id)
      .send(subscriber)
      .expect(200, done);
  });

  it('check update', function (done) {
    request(app)
      .get('/api/subscribers/' + subscriber._id)
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);

        if (subscriber.name === res.body.name) {
          done();
        } else {
          done('Update error!');
        }
      });
  });

  it('delete', function (done) {
    request(app)
      .del('/api/subscribers/' + subscriber._id)
      .expect(200, done);
  });

  it('get - fail', function (done) {
    request(app)
      .get('/api/subscribers/' + subscriber._id)
      .expect(404, done);
  });

  it('get all - fail', function (done) {
    request(app)
      .get('/api/subscribers')
      .expect(404, done);
  });
});
