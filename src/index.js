import cheerio from 'cheerio'
import request from 'superagent'
import _ from 'lodash'


const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


export default function app(cb) {
    request.get('https://nodejs.org/en/blog/')
        .then((res) => {

            const $ = cheerio.load(res.text)

            const blogPostings = $('.blog-index \> li')

            console.log(typeof blogPostings);
            blogPostings.each((idx, elem) => {

                const time = $(elem).find('time').text().trim()
                const m = time.split(" ")
                const [day, monthShortName] = m

                const date = new Date()
                const currentMonth = monthNames[date.getUTCMonth()+1]

                const utcDate = date.getUTCDate()
                const currentDay = (utcDate < 10) ? "0" + utcDate : utcDate

                const isCurrentMonth = currentMonth.includes(monthShortName)
                const isCurrentDay = day == currentDay


                console.log("date " + time);
                console.log('title ', $(elem).find("a").text() + "\n\n");

            })

            cb()
        }, (err) => {
            console.log("err ", err);
            cb()
        })
}
