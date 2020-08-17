const fs = require('fs');
const https = require('https');
const _ = require('lodash')
const api = fs.readFileSync('./api.txt', {encoding: 'utf8'})
const cra_id = 455207
const url = `https://api.themoviedb.org/3/movie/${cra_id}/credits?api_key=${api}&language=en-US`


https.get(url, (res) => {
  let data = '';
  res.on('data', (d) => {
    data += d
  });
  res.on('end', () => {
    data = _.map(JSON.parse(data).cast, ({id, name}) => {
      return {id , name}
    })
    console.log(data)
    fs.writeFileSync('./cra_cast.json',JSON.stringify(data))
  })
})