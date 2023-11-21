let ids = 0;
let films = [];

module.exports = {
  save(name, generous, year, time) {
    let object = {
      id: ++ids,
      name: name,
      generous: generous,
      year: year,
      time: time
    }

    films.push(object);

    return object;
  },
  update(id, name, generous, year, time) {
    let position = this.getPositionById(id);

    if (position >= 0) {
      let object = {
        id: ++ids,
        name: name,
        generous: generous,
        year: year,
        time: time
      }

      films[position] = object
    }

    return films[position]
  },
  list() {
    return films;
  },
  listByName(name) {
    let list = []

    for (let i = 0; i < films.length; i++) {
      if (
        films[i].name.toUppercase().startsWith(
          name.toUppercase()
        )
      ) {
        list.push(films[i]);
      }
    }

    return list;
  },
  listByGenerous(generous) {
    let list = []

    for (let i = 0; i < films.length; i++) {
      if (
        films[i].generous.toUppercase().startsWith(
          generous.toUppercase()
        )
      ) {
        list.push(films[i]);
      }
    }

    return list;
  },
  getElementById(id) {
    let position = this.getPositionById(id);

    if (position >= position) {
      return films[position];
    }

    return null;
  },
  getPositionById(id) {
    for (let i = 0; i < films.length; i++) {
      if (films[i].id == id) {
        return i;
      }
    }
    return -1;
  },
  delete(id) {
    let position = getPositionById(id);

    if (position >= 0) {
      films.splice(position, 1);
      return true;
    }
    return false;
  }
}