import Character from "../models/Character.js";
import Movie from "../models/Movie.js";

class MoviesService {
  async getAllMovies(query) {
    const { title, genre, order } = query ;
    
    let queryToFind = {}
    let titleOrder = []
    
    if (title)
      queryToFind.title = title;
  
    if (genre) { 
      queryToFind.genreId = genre
    }
    if (order) {
      if (query.order == 'ASC') {
        titleOrder.push(['title', 'ASC'])
      } else {
        titleOrder.push(['title', 'DESC'])
      }
    }
  
    return await Movie.findAll({
      where: queryToFind,
      order: titleOrder,
      attributes: ['image','title','createdAt']
    });
  
  }

  async getMovieById(id) {
    return await Movie.findByPk(id, {
      include: {
        model: Character,
        as: 'characters',
        through: {
          attributes: []
        }
      }
    })
  }

  async createMovie(data) {
    const {image, title, calification } = data ;
    await Movie.create({ image, title, calification });
  }

  async updateMovieById(movieId, data) {
    return await Movie.update(data, { where: { id: movieId } });
  }

  async deleteMovieById(movieId) {
    return await Movie.destroy({ where: { id: movieId } });
  }
}

export default MoviesService;