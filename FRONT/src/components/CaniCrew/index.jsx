/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/navbar/canipotes_logo.png';
import github from '../../assets/team/github.png';
import linkedin from '../../assets/team/linkedin.png';

import alex from '../../assets/team/alex.jpg';
import alexPet from '../../assets/team/alex_pet.jpg';
import raph from '../../assets/team/raph.jpg';
import raphPet from '../../assets/team/raph_pet.jpg';
import anne from '../../assets/team/anne.jpg';
import annePet from '../../assets/team/anne_pet.jpg';
import julien from '../../assets/team/julien.jpg';
import julienPet from '../../assets/team/julien_pet.jpg';
import mathilde from '../../assets/team/mathilde.jpg';
import mathildePet from '../../assets/team/mathilde_pet.jpg';

import './canicrew.scss';

const CaniCrew = () => {
  const [count, setCount] = useState(0);

  const devs = [
    {
      firstName: 'Mathilde',
      ghLink: 'https://github.com/mathilde-chenillot',
      linkedinLink: 'https://www.linkedin.com/in/mathildechenillot/',
      photo: mathilde,
      petPhoto: mathildePet,
      role: 'Product Owner',
      text: 'Oh une chauve-souris !',
    },
    {
      firstName: 'Julien',
      ghLink: 'https://github.com/JulienCLLT',
      linkedinLink: 'https://www.linkedin.com/in/collet-julien/',
      photo: julien,
      petPhoto: julienPet,
      role: 'Scrum Master',
      text: 'Pensez sécurité !',
    },
    {
      firstName: 'Anne',
      ghLink: 'https://github.com/AnneOsolin',
      linkedinLink: 'https://www.linkedin.com/in/anne-osolin-7b5163200/',
      photo: anne,
      petPhoto: annePet,
      role: 'Git Master',
      text: 'Vive les conflits avec git merge!',
    },
    {
      firstName: 'Alexandra',
      ghLink: 'https://github.com/Alekiel42',
      linkedinLink: 'https://www.linkedin.com/in/alexandrabercoff/',
      photo: alex,
      petPhoto: alexPet,
      role: 'Lead Back',
      text: "Allez SQL s'il te plait !!!",
    },
    {
      firstName: 'Raphaël',
      ghLink: 'https://github.com/RaphaelCharousset',
      linkedinLink: 'https://www.linkedin.com/in/raphaelcharousset/',
      photo: raph,
      petPhoto: raphPet,
      role: 'Lead Front & Git Master',
      text: 'Il suffit de display flex !',
    },
  ];

  const handleClick = (strCode) => {
    switch (strCode) {
      case 'previous':
        if (count === 0) setCount(4);
        else setCount((old) => old - 1);
        break;
      case 'next':
        if (count === 4) setCount(0);
        else setCount((old) => old + 1);
        break;
      default:
        break;
    }
  };

  return (
    <div className="cani-crew-wrapper">
      <header className="cani-crew-header">
        <div className="cani-crew-header__logo">
          <NavLink
            to="/home"
            exact
          >
            <img src={logo} alt="logo cani potes" />
          </NavLink>
          <NavLink
            to="/home"
            exact
          >
            Retour à l'accueil
          </NavLink>
        </div>
      </header>

      <main className="cani-crew">
        <div className="cani-crew__annoucement">
          <h1>La CaniCrew</h1>
          <p>Une équipe qui a du chien !</p>
        </div>

        <div className="cani-crew__container">
          <button type="button" onClick={() => handleClick('previous')}>
            ← {
              devs[(count - 1)] ? devs[(count - 1)].firstName : devs[4].firstName
            }
          </button>

          <div className="card">
            <div className="card__content">

              <div className="card__content__avatar">
                <div className="card__content__avatar-images">
                  <img src={devs[count].photo} alt={devs[count].firstName} className="card__content__avatar-user" />
                  <img src={devs[count].petPhoto} alt="animal" className="card__content__avatar-pet" />
                </div>

                <p className="card__content__avatar-social">
                  <a href={devs[count].ghLink} target="_blank" rel="noreferrer">
                    <img src={github} alt="github" className="github" />
                  </a>

                  {devs[count].firstName}

                  <a href={devs[count].linkedinLink} target="_blank" rel="noreferrer">
                    <img src={linkedin} alt="linkedin" className="linkedin" />
                  </a>
                </p>
              </div>

              <div className="card__content__text">
                <span>{devs[count].text}</span>
              </div>

              <div className="card__content__role">
                <span>{devs[count].role}</span>
              </div>
            </div>
          </div>

          <button type="button" onClick={() => handleClick('next')}>
            {
              devs[(count + 1)] ? devs[(count + 1)].firstName : devs[0].firstName
            } →
          </button>
        </div>
      </main>
    </div>
  );
};

export default CaniCrew;
