// define the port
const PORT = 8000

// Initialize packages
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

// Initialize using express - get whatever is in the const express from above, set it to app
const app = express()

// Listen to the port and make sure it's running, get console message
app.listen(PORT, () => console.log(`server runnning on PORT ${PORT}`))

// Create an empty array to store jobs
const jobs = []

// Scrape the webpages
app.get('/', (req, res) => {
    // Set the target
    axios.get('https://www.mygisjobs.com/california')
        // chain actions once the page is got
        .then((response)=> {
            // Get the response html
            const html = response.data
            // use cheerio to pick out different pieces
            const $ = cheerio.load(html)
            

            // TO DO - Get pagination information and click through, getting the same job info as before
            // Best bet is to find the next button on each new page. If next button exists, click it, if not you're done
            // .Pagination li class 'Next'
            // https://stackoverflow.com/questions/50776770/scrape-paginate-using-nodejs-cheerio
            const pages = $('.Pagination').text()

            console.log(pages)

            // // Get each li within the PostList div class and run a function on it to pull out elements
            // $('.PostList li', html).each(function () {
            //     // Get the header text and link
            //     const title = $('h2 a', this).text().trim().replace(/\n/g, '')
            //     const link = $('h2 a', this).attr('href')
            //     // Get the job location
            //     const location = $('.location', this).text().trim().replace(/\n/g, '')
            //         jobs.push({
            //             title,
            //             link,
            //             location
            //         })
            // })
            
            // // Write jobs on the page
            // res.json(jobs)
            // console.log(jobs)

        // Check for errors and log them
        }).catch((err) => console.log(err))
})