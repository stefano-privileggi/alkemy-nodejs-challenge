import Character from "../models/Character.js";
import Movie from "../models/Movie.js";

class CharactersService {
  async getAllCharacters(query) {
    const { name, age, movies } = query ;
    let queryToFind = {}

    if (name)
      queryToFind.name = name;

    if (age)
      queryToFind.age = age

    if (movies) {
      return await Character.findAll({
        where: queryToFind,
        attributes: ['image','name'],
        include: [{
          model: Movie,
          as: 'movies',
          attributes: ['image','title','createdAt'],
          through: {
            where: {
              movieId: movies
            }
          }
        }]
      });
    }

    return await Character.findAll({
      where: queryToFind,
      attributes: ['image','name']
    });
    


  }

  async getCharacterById(id) {
    return await Character.findByPk(id, {
      include: {
        model: Movie,
        as: 'movies',
        through: {
          attributes: []
        }
      }
    })
  }

  async createCharacter(data) {
    return await Character.create(data);
  }

  async updateCharacterById(characterId, data) {
    const character = await Character.findByPk(characterId);
    await Character.update(data, { where: { id: characterId } });
    return character;
  }

  async deleteCharacterById(characterId) {
    await Character.destroy({ where: { id: characterId } });
  }
}


export default CharactersService;