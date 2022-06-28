import { validateCharacter } from "../lib/validations.js";

import CharacterServices from "../services/character.services.js";
const characterServices = new CharacterServices();

export const getCharacters = async (request, response) => {
  return response.status(200).json(await characterServices.getAllCharacters(request.query));
}

export const createCharacter = async (request, response) => {
  const { error } = validateCharacter(request.body);
  if (error)
    return response.status(400).json(error.details[0].message);

  try {
    const newCharacter = await characterServices.createCharacter(request.body);
    response.status(200).json({ message: 'Character created', data: newCharacter});
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }

}

export const updateCharacter = async (request, response) => {
  const { error } = validateCharacter(request.body);
  if (error)
    return response.status(400).json(error.details[0].message);

  try {
    const characterId = request.params.id;
    const character = await characterServices.updateCharacterById(characterId, request.body);
    response.status(200).json({ message: 'Character updated', data: character });
  } catch (error) {
    return response.status(500).json({message: error.message})
  }

}

export const deleteCharacter = async (request, response) => {
  try {
    const characterId = request.params.id ;
    await characterServices.deleteCharacterById(characterId);
    response.status(200).json({ message: 'Character deleted' });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }

}

