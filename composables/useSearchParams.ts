export function useSearchParams(fname: string | string[] | undefined, attribute: string | string[] | undefined, level: string | string[] | undefined, race: string | string[] | undefined, type: string | string[] | undefined, sort: string | string[] | undefined, order: string | string[] | undefined) {
    const params: {fname?: string, attribute?: string; level?: string, race?: string, type?: string, sort?: string} = {};
  
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

  
    return params;
  }