import cron from 'node-cron'
import {blogs, announcements} from './scrapers'

function complete() {
    console.log('completed on - ' + (new Date()))
}

cron.schedule('0 12 * * *', function () {
    console.log('starting new job')
    blogs(complete)
    announcements(complete)
})