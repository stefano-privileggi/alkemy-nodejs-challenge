import Character from '../models/Character.js'
import Movie from '../models/Movie.js'
import Genre from '../models/Genre.js'
import User from '../models/User.js'

async function databaseConfiguration(database) {
  try {
    Character.belongsToMany(Movie, {
      as: 'movies',
      through: 'characters_movies'
    })
    Movie.belongsToMany(Character, {
      as: 'characters',
      through: 'characters_movies'
    })
    Movie.belongsTo(Genre, { foreignKey: 'genreId' })
  
    await database.sync({force:true});
  
    mockData(database);

    console.log('Connection has been established successfully.')
  } catch (error) {
    console.log('Unable to connect to the database: ' + error)
  }
}

async function mockData() {
  
  await User.create({ 
      name: 'Alkemy User', 
      email: "alkemyuser@gmail.com", 
      password: '123'
  })

  const char1 = await Character.create({ name: 'Mickey', age: 30 })
  const char2 = await Character.create({ name: 'Minie', age: 40 })
  const char3 = await Character.create({ name: 'Donald', age: 50 })
  const movie1 = await Movie.create({ title: 'Tiburon' })
  const movie2 = await Movie.create({ title: 'Matrix' })
  const movie3 = await Movie.create({ title: 'Back to the future' })
  const genre1 = await Genre.create({ name: 'Adventure' })
  const genre2 = await Genre.create({ name: 'Thriller' })

  await char1.addMovies([movie1, movie2])
  await char2.addMovies([movie1, movie2, movie3])
  await char3.addMovies([movie3])
  await char1.save()
  await char2.save()
  await char3.save()

  await movie1.setGenre(genre1)
  await movie2.setGenre(genre2)
  await movie3.setGenre(genre1)
  await movie1.save()
  await movie2.save()
  await movie3.save()
}



export default databaseConfiguration