async function getPlanets(){
  let req = await fetch('https://swapi.dev/api/planets/');
  let {results} = await req.json();

  results.forEach(planet => {
    createButton(planet);
  })
}

function createButton(planet){
  let planetList = document.getElementById('planet-list');

  let button = document.createElement('button');
  button.innerHTML = planet.name;
  button.onclick = () => fillPlanetInfo(planet);

  planetList.appendChild(button);
}

function fillPlanetInfo(planet){
  let name = document.getElementById('planet-name');
  let climate = document.getElementById('climate');
  let population = document.getElementById('population');
  let terrain = document.getElementById('terrain');

  name.innerHTML = planet.name;
  climate.innerHTML = planet.climate;
  population.innerHTML = planet.population;
  terrain.innerHTML = planet.terrain;
}

getPlanets();