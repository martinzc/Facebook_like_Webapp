import { expect } from 'chai'
import { go, sleep, findId, findCSS, By, searchText } from './selenium'
import common from './common'

describe('Test Main Page', () => {

    // const preamble = 'you are logged in as'

    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('should log in as test user', (done) => {
        sleep(500)
        .then(findId('username').getText().then(text => {
            expect(text).to.equal(common.creds.username)
        }))
        .then(done)
    })

    it("should create a new article", (done) => {
        findId('newArticleText').sendKeys("Test Text")
        .then(findId('newArticleBtn').click())
        .then(sleep(500))
        .then(findId('articleID').getText().then(articleText => {
            expect(articleText).to.equal("Test Text")
        }))
        .then(done)
    })


    it("should edit an article", (done) => {
        findId('newArticleText').clear()
        .then(findId('newArticleText').sendKeys("Test Text"))
        .then(findId('newArticleBtn').click())
        .then(sleep(500))
        .then(findId('articleID').getText().then(articleText => {
            expect(articleText).to.equal("Test Text")
        }))
        .then(done)
    })

    it("should update the status headline", (done) => {
        findId('updateStatus').clear()
        .then(findId('updateStatus').sendKeys("New Headline"))
        .then(findId('updateStatusBotton').click())
        .then(findId('status').getText().then(text => {
            expect(text).to.equal("Status: New Headline")
        })).then(done)
    })


    it("should add and remove a follower", (done) => {
        let followerNum;
        findCSS("#followedUser .text-info")
        .then(r => followerNum = r.length)
        .then(
            findId('unfollow').click()
            .then(sleep(500))
            .then(() => findCSS("#followedUser .text-info"))
        )
        .then(
            findCSS("#followedUser .text-info")
            .then(r => followerNum = r.length)
            .then(
                findId('newFollowerText').clear()
                .then(findId('newFollowerText').sendKeys("cz16"))
                .then(findId('followBtn').click())
                .then(sleep(500))
                .then(() => findCSS("#followedUser .text-info"))
                )
        ).then(() => done())
    })

    it("should search special &quot", (done) => {
        findId('searchField').clear()
        .then(findId('searchField').sendKeys("&"))
        .then(sleep(500))
        .then(() => findCSS("#articleID"))
        .then(r => expect(r.length).to.equal(1))
        .then(() => done())
    })



    after('should log out', (done) => {
        common.logout().then(done)
    })
})
