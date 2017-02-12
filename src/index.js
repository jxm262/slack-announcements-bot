import cheerio from 'cheerio'
import request from 'superagent'


export default function app(cb) {
    request.get('https://nodejs.org/en/blog/')
        .then((res) => {

            const $ = cheerio.load(res.text)

            const blogPostings = $('.blog-index \> li')

            console.log(blogPostings.length);
            blogPostings.foreach((elem, idx) => {
                console.log('el ', elem);
                //console.log("time ", elem.find('time'))
                //return elem
            })

            cb()
        }, (err) => {
            console.log("err ", err);
            cb()
        })
}
