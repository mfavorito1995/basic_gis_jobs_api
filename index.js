
// function to check for next page and open it
function nextPageCheckOpen(loadedPage) {
    // if anything: click it 
    const nextbtn = loadedPage('.Pagination li.next a')

    if (nextbtn.length == 1) {
        return nextbtn.attr().href
    }
    else {
        return 'No more pages'
    }
}

function getLoadPage(url) {
    axios.get(url)
        // chain actions once the page is got
        .then((response)=> {
            // Get the response html
            const html = response.data
            // use cheerio to pick out different pieces
            const $ = cheerio.load(html)

            pageCheck = nextPageCheckOpen($)
            console.log(pageCheck)

        // Check for errors and log them
        }).catch((err) => console.log(err))
}

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
    axios.get('https://www.mygisjobs.com/california/')
        // chain actions once the page is got
        .then((response)=> {
            // Get the response html
            const html = response.data
            // use cheerio to pick out different pieces
            const $ = cheerio.load(html)
            

            // // TO DO - create function for get links, function for next page


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
            
            // Write jobs on the page
            res.json(jobs)
            console.log(jobs)

            pageCheck = nextPageCheckOpen($)
            console.log(pageCheck)


        // Check for errors and log them
        }).catch((err) => console.log(err))
})

// load page
// get info
// check for next page
//  if next page, start over again
// While true, break

// function doItAll() {
//     // put state variables other than the actual loop control here

//     function doTheLoop() {
//         for(var i=0; i<20; i++) {
//             if (somecondition) {
//                 return(true);    // run the loop again ---> MF Change this ro return [True, href]
//             }
//         }
//         return(false);   // done running the loop
//     }
//     while (doTheLoop()) {}
//     // do some things after the loop
// }
