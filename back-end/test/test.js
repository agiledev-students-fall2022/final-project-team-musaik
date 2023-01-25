process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

let app = require('../index');
let assert = chai.assert;
let should = chai.use(chaiHttp).should();
let expect = chai.expect;

let api = require('../routes/api');
let playlists = require('../routes/pinPlaylistRoute');
app.use('/sessions', api);
app.use('/playlists', playlists);

describe('GET something', () => {
    it('should pin playlists on page', (done) => {
        chai.request(api)
        .get('/playlists/pin-playlists')
        .redirects(0)
        .end((err, res) => {
            res.should.have.status()
            done();
        })
    })
})

describe('GET base url - success', () => {
    it('should redirect to /home or /login', (done) => {
        chai.request(app)
        .get('/')
        .redirects(0)
        .end((err, res) => {
            res.should.have.status(302);
            done();
        })
    })
})

describe('GET auth url - success', () => {
    it('should redirect to spotify authorization page', (done) => {
        chai.request(app)
        .get('/auth')
        .redirects(0)
        .end((err, res) => {
            res.should.have.status(302);
            done();
        })
    })
})

describe('GET session user - success', () => {
    it('should send back the session user info', (done) => {
        chai.request(app)
        .get('/user')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        })
    })
})

// need spotify authorization for this
// describe('GET session user - success', () => {
//     it('should send back the session user info', (done) => {
//         chai.request(app)
//         .get('/top_artists')
//         .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a('object');
//             console.log(res);
//             done();
//         })
//     })
// })

