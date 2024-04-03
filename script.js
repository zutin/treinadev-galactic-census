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
  button.className = 'bg-slate-700 text-white rounded-md p-2 m-2 shadow-lg hover:bg-slate-800 hover:shadow-xl transition-all duration-300 ease-in-out';
  button.onclick = () => fillPlanetInfo(planet);

  planetList.appendChild(button);
}

function fillPlanetInfo(planet){
  let planetInfo = document.getElementById('planet-information');
  let name = document.getElementById('planet-name');
  let climate = document.getElementById('climate');
  let population = document.getElementById('population');
  let terrain = document.getElementById('terrain');

  planetInfo.classList.remove('hidden');

  name.innerHTML = planet.name;
  climate.innerHTML = planet.climate;
  population.innerHTML = planet.population;
  terrain.innerHTML = planet.terrain;

  fillFamousHabitants(planet);
}

function searchPlanet(){
  let input = document.getElementById('search-input').value;

  let req = fetch(`https://swapi.dev/api/planets/?search=${input}`);

  req.then(res => res.json())
    .then(data => {
      let planet = data.results[0];

      if (!planet) return alert(`Planet "${input}" not found. Did you spell it correctly?`);

      fillPlanetInfo(planet);
    })
    .catch(err => console.log(err));
}

function fillFamousHabitants(planet){
  let residents = planet.residents;
  let famousHabitantsList = document.getElementById('famous-habitants-list');

  famousHabitantsList.innerHTML = '';

  residents.forEach(resident => {
    let req = fetch(`${resident}`);

    req.then(res => res.json())
      .then(data => {
        let tr = document.createElement('tr');
        
        tr.innerHTML = `
          <td class="p-2 text-center">${data.name}</td>
          <td class="p-2 text-center">${data.gender}</td>
          <td class="p-2 text-center">${data.birth_year}</td>
          `

        famousHabitantsList.appendChild(tr);
      })
      .catch(err => console.log(err));
  });
}

getPlanets();