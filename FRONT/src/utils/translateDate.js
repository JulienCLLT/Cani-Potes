/* eslint-disable linebreak-style */
// eslint-disable-next-line import/prefer-default-export
export const translateDate = (str) => {
  if (!str) return '';
  str.split(' ');

  // adjusting day
  switch (str[0].toLowerCase()) {
    case 'monday':
      str[0] = 'Lundi';
      break;
    case 'tuesday':
      str[0] = 'Mardi';
      break;
    case 'wednesday':
      str[0] = 'Mercredi';
      break;
    case 'thursday':
      str[0] = 'Jeudi';
      break;
    case 'friday':
      str[0] = 'Vendredi';
      break;
    case 'saturday':
      str[0] = 'Samedi';
      break;
    case 'sunday':
      str[0] = 'Dimanche';
      break;
    default:
      break;
  }

  // adjusting month
  switch (str[2].toLowerCase()) {
    case 'january':
      str[2] = 'Janvier';
      break;
    case 'february':
      str[2] = 'Février';
      break;
    case 'march':
      str[2] = 'Mars';
      break;
    case 'april':
      str[2] = 'Avril';
      break;
    case 'may':
      str[2] = 'Mai';
      break;
    case 'june':
      str[2] = 'Juin';
      break;
    case 'july':
      str[2] = 'Juillet';
      break;
    case 'august':
      str[2] = 'Août';
      break;
    case 'september':
      str[2] = 'Septembre';
      break;
    case 'october':
      str[2] = 'Octobre';
      break;
    case 'november':
      str[2] = 'Novembre';
      break;
    case 'december':
      str[2] = 'Décembre';
      break;
    default:
      break;
  }

  return str.join(' ');
};
