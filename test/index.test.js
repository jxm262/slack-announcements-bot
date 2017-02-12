import { blogs, announcements } from '../src/index'
import chai from 'chai'
chai.should()

describe('app', function() {

  describe('blogs', function() {
    it('posts to slack', function(done) {
      blogs(done)
    })
  })

  describe('announcements', function() {
    it('posts to slack', function(done) {
      announcements(done)
    })
  })

})
