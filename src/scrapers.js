import cheerio from 'cheerio'
import request from 'superagent'
import _ from 'lodash'
import Promise from 'bluebird'
const config  = require('../config')

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export const scrapeBlog = () => request.get('https://nodejs.org/en/blog/')
    .then((res) => {

        const $ = cheerio.load(res.text)

        const blogPostings = $('.blog-index \> li')

        const entries = _.reduce(blogPostings, (accum, elem, key) => {
            const time = $(elem).find('time')
            const [day, monthShortName] = time.text().trim().split(" ")
            const date = new Date()
            const currentMonth = monthNames[date.getUTCMonth() + 1]
            const utcDate = date.getUTCDate()
            const currentDay = (utcDate < 10) ? "0" + utcDate : utcDate

            const isCurrentMonth = currentMonth.includes(monthShortName)
            const isCurrentDay = day == currentDay

            const title = $(time).next().text().trim()

            if (true) {
            //if (isCurrentMonth && isCurrentDay) {
                accum.push({
                    date: (day + " " + monthShortName),
                    data: title
                })
            }

            return accum
        }, [])

        return Promise.resolve(entries)
    }, (err) => {
        return Promise.reject(err)
    })

export const scrapeAnnouncements = () => request.get('https://nodejs.org/en/foundation/announcements/')
    .then((res) => {

        const $ = cheerio.load(res.text)

        const newList = $('.news-list \> li')

        const d = new Date()
        const day = (d.getUTCDate() < 10) ? "0" + d.getUTCDate() : d.getUTCDate()
        const year = d.getUTCFullYear()
        const utcMon = d.getUTCMonth() + 1
        const mon = (utcMon < 10) ? "0" + utcMon : utcMon

        const dateString = year + "-" + mon + "-" + day

        const entries = _.reduce(newList, (accum, elem, key) => {
            const time = $(elem).find('time')
            const timestamp = time.text().trim()
            const link = $(time).next().text().trim()

            if (true) {
            //if (timestamp == dateString) {
                accum.push({date: timestamp, data: link})
            }

            return accum
        }, [])

        return Promise.resolve(entries)

    }, (err) => {
        Promise.reject(err)
    })


export function blogs(cb) {
    scrapeBlog().then((entries) => {

        const requests = entries.slice(0,2).map((elem) => {
            const text = `\n<https://https://nodejs.org/en/blog/|${elem.date} NodeJS Blog> - ${elem.data} \n`
            const msg = {text: text}

            return request.post(config.webhookURL)
                .set('Content-Type', 'application/json')
                .send(JSON.stringify(msg))
        })

        Promise.all(requests)
            .then((res) => {
                console.log('done')
                cb()
            })
            .catch((err) => {
                console.log('err ', err)
                cb()
            })
    })
}

export function announcements(cb) {
    return scrapeAnnouncements().then((entries) => {
        const requests = entries.slice(0,2).map((elem) => {
            const text = `\n<https://https://nodejs.org/en/blog/|${elem.date} NodeJS Announcement> -  ${elem.data} \n`
            const msg = {text: text}

            return request.post(config.webhookURL)
                .set('Content-Type', 'application/json')
                .send(JSON.stringify(msg))
        })

        Promise.all(requests)
            .then((res) => {
                console.log('done')
                cb()
            })
            .catch((err) => {
                console.log('err ', err)
                cb()
            })
    })
}
