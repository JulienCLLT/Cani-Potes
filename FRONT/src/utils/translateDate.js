/* eslint-disable linebreak-style */
// eslint-disable-next-line import/prefer-default-export
export const translateDate = (str) => {
  if (!str) return '';
  const strToTranslate = str.split(' ');

  // adjusting day
  switch (strToTranslate[0].toLowerCase()) {
    case 'monday':
      strToTranslate[0] = 'Lundi';
      break;
    case 'tuesday':
      strToTranslate[0] = 'Mardi';
      break;
    case 'wednesday':
      strToTranslate[0] = 'Mercredi';
      break;
    case 'thursday':
      strToTranslate[0] = 'Jeudi';
      break;
    case 'friday':
      strToTranslate[0] = 'Vendredi';
      break;
    case 'saturday':
      strToTranslate[0] = 'Samedi';
      break;
    case 'sunday':
      strToTranslate[0] = 'Dimanche';
      break;
    default:
      break;
  }

  // adjusting month
  switch (strToTranslate[2].toLowerCase()) {
    case 'january':
      strToTranslate[2] = 'Janvier';
      break;
    case 'february':
      strToTranslate[2] = 'Février';
      break;
    case 'march':
      strToTranslate[2] = 'Mars';
      break;
    case 'april':
      strToTranslate[2] = 'Avril';
      break;
    case 'may':
      strToTranslate[2] = 'Mai';
      break;
    case 'june':
      strToTranslate[2] = 'Juin';
      break;
    case 'july':
      strToTranslate[2] = 'Juillet';
      break;
    case 'august':
      strToTranslate[2] = 'Août';
      break;
    case 'september':
      strToTranslate[2] = 'Septembre';
      break;
    case 'october':
      strToTranslate[2] = 'Octobre';
      break;
    case 'november':
      strToTranslate[2] = 'Novembre';
      break;
    case 'december':
      strToTranslate[2] = 'Décembre';
      break;
    default:
      break;
  }

  return strToTranslate.join(' ');
};
