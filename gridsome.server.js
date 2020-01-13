// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require('axios')
require('dotenv').config();
module.exports = function (api) {
  api.loadSource(async actions => {
    const collection = actions.addCollection('Post')
    const { data } = await axios.get(process.env.MICRO_CMS_URL + '/api/v1/info', { headers: {'X-API-KEY': process.env.MICRO_CMS_API_KEY} })

    for (const item of data.contents) {
      collection.addNode({
        id: item.id,
        title: item.text,
        content: item.body
      })
    }
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}