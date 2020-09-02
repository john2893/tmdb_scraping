const fs = require('fs');
const https = require('https');
const _ = require('lodash')
const api = fs.readFileSync('./api.txt', {encoding: 'utf8'})



let actors = fs.readFileSync('./cra_cast.json', {encoding:'utf8'})
actors = JSON.parse(actors)

//iterate through every actor/ress in cra_cast.json
//for each of them get their bio and movie credits. 


function getActorMoviesInfo(actorIndex){
  const actor = actors[actorIndex];
  console.log(actor.name)
  if (!actor) return
  
//   _.each(actor.movies, movie => {
    const movie = actor.movies[0]
    console.log(movie)
    const url = `https://api.themoviedb.org/3/person/${movie.id}?api_key=${api}&language=en-US&append_to_response=credits`
    https.get(url, (res) => {
      let data = ''
      res.on('data', d => data += d)
      res.on('end', () => {
        data = JSON.parse(data)

        const {
            budget,genres, overview, popularity,
            poster_path, release_date, revenue, 
            spoken_languages, status, tagline, title,
            vote_average, vote_count, credits,
        } = JSON.parse(data)
        Object.assign(movie, {

        })
        console.log(data);
        // Write actors array to file
        // fs.writeFileSync('./cra_cast.json',
        // JSON.stringify(actors))
        // console.log ('file saved');
        // getActorMoviesInfo(actorIndex += 1)
      })
  
    // })    

  })
}

getActorMoviesInfo(0)