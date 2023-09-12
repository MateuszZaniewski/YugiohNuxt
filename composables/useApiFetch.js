import axios from 'axios';

/*
Explanation about params : {
  fname - search for part of name (example : if card contains specific string);
  attribute - search for attribute of monster (example : ['Light','Dark','Water','Fire']);
  level - search for level of monster (example: [1,2,3,4,5...]);
  race - search for monster, spell and trap "races". Example : 
        monsters - ['Aqua','Spellcaster','Dragon','Reptile']
        spell - ['Normal','Continous','Ritual']
        trap - ['Normal','Continous','Counter'];
  type - search for effect of lack of it (example : 
        mainDeckTypes : ['Effect Monster','Ritual Monster','Normal Monster','Trap Card','Spell Card']
        extraDeckTypes : ['Fusion Monster','XYZ Monster','Synchro Monster']
        other : ['Skill card','Token']);
  atk - search for card contains given attack, less/more too;
  def - search for card contains given defecne , less/more too;     
  archetype - search for an archetype of card (example : ['Dark Magician','Exodia']);

}

*/


export const connectToYugiohApi = async function(fname, attribute, level, race, type ) {
  try {
    const params = useSearchParams(attribute,level,race,type)

    if (Array.isArray(attribute) && attribute.length > 0) {
      params.attribute = attribute.join(',');
    } else if (typeof attribute === 'string') {
      params.attribute = attribute;
    }

    if (Array.isArray(level) && level.length > 0) {
      params.level = level.join(',');
    } else if (typeof level === 'string') {
      params.level = level;
    }

    if (Array.isArray(race) && race.length > 0) {
      params.race = race.join(',');
    } else if (typeof race === 'string') {
      params.race = race;
    }

    if (Array.isArray(type) && type.length > 0) {
      params.type = type.join(',');
    } else if (typeof type === 'string') {
      params.type = type;
    }





    const response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php', {
      params: {
        fname : fname,
        ...params
      }
    });
    const fetchedCards = response.data.data;
    return fetchedCards
    

  }
  catch (error) {
    console.log(error)
  }
}