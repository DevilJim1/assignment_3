const g1 = document.getElementById("Get");
const gc = document.getElementById("GridContain");

let rl= [];

g1.addEventListener("click", function(event){
  event.preventDefault();
  var mn = document.getElementById("movies");

  for(let i of rl){
    i.remove();
  }

  let response = axios.get("https://api.themoviedb.org/3/search/movie", {
    params: {
      api_key: "8b8aa8dc742d970de5a5240a62f689d8",
      include_adult: "false",
      query: mn.value,
    }
  });

  response = response.then((moviesData) => {
    for (let movie of moviesData.data.results) {   
      axios.get(`https://api.themoviedb.org/3/movie/${movie.id}`, {
        params: {
          api_key: "8b8aa8dc742d970de5a5240a62f689d8",
          append_to_response: "videos",
        }
      }).then((movieData) => {
        const img = document.createElement('img');
        const p = document.createElement('p');
        const iframe = document.createElement('iframe');

        const newDiv = document.createElement('div');

        const trailers = movieData.data.videos.results.filter((trailer) => trailer.type === "Trailer");
        iframe.src = `https://www.youtube.com/embed/${trailers.at(0).key}`
        img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        p.innerHTML = `${movie.title} -- ${movie.release_date}
        <br><br>ID:${movie.id}
        <br><br>OverView:<br><br>
        ${movie.overview}
        <br><br>Language:${movie.original_language}
        <br><br>Popularity${movie.popularity} --- Vote Average${movie.vote_average} --- Vote Count${movie.vote_count}<br>`;

        rl.push(p,img,iframe);

        p.classList.add("descript");
        img.classList.add("poster");
        iframe.classList.add("trailer");
        newDiv.classList.add("newdiv");

        newDiv.appendChild(p);
        newDiv.appendChild(img);
        newDiv.appendChild(iframe);
        
        document.body.append(newDiv);

        console.log(movie);
      });
    }
  });

});
