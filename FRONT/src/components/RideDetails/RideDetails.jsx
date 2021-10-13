/* eslint-disable linebreak-style */
import React, { useEffect, useRef, useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import RideInfo from './RideInfo/index';

import conversation from '../../assets/img/info-ride/conversation.svg';
import send from '../../assets/img/info-ride/send.svg';

import {
  sendNewMessage, addUserToRide, deleteRide, getOneRideById,
  getRideIsLoading, userQuitRide, kickUserFromRide,
} from '../../actions/rides';
import { translateDate } from '../../utils/translateDate';
import { reverseGeocoding } from '../../utils/reverseGeocoding';

import './RideDetails.scss';
import Header from '../Header/Header';
import { reinitRenderAgain } from '../../actions/users';
import { dburlWithoutApi } from '../../utils/dburl';
import RideParticipants from './RideParticipants';

const RideDetails = () => {
  const { id } = useParams();
  const chatZone = useRef();
  const dispatch = useDispatch();

  const { user: userProfile } = useSelector((state) => state);

  const {
    ride_id, max_number_dogs, participants,
    host_id, messages, start_coordinate, end_coordinate,
  } = useSelector((state) => state.rides.currentRide);

  const { errorMessage } = useSelector((state) => state.rides);

  messages.sort((a, b) => a.message_id - b.message_id);

  useEffect(() => {
    dispatch(reinitRenderAgain());
    dispatch(getRideIsLoading());
    dispatch(getOneRideById(id));
  }, [userProfile.renderAgain]);

  const [startPointAddress, setStartPointAddress] = useState('');
  const [endPointAddress, setEndPointAddress] = useState('');
  reverseGeocoding(start_coordinate, setStartPointAddress);
  reverseGeocoding(end_coordinate, setEndPointAddress);

  let nbOfDogs = 0;

  participants.map((participant) => nbOfDogs += participant.dogs.length);

  participants.sort((a, b) => {
    if (a.participant_id === host_id) {
      return -1;
    }
    return 0;
  });


  const { register, handleSubmit, reset } = useForm();

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);
  const [isDeleteRideModalOpen, setIsDeleteRideModalOpen] = useState(false);
  const [isKickUserModalOpen, setIsKickUserModalOpen] = useState(false);
  const [userKicked, setUserKicked] = useState(0);

  const handleDelete = () => {
    dispatch(deleteRide(ride_id));
    setIsRedirect(true);
  };

  const handleKick = () => {
    dispatch(kickUserFromRide(userKicked, id));
    setIsKickUserModalOpen(false);
    setUserKicked(0);
  };

  const scrollDownChat = () => {
    setTimeout(() => {
      chatZone.current.scrollTo({
        top: chatZone.current.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }, 250);
  };

  const onSubmit = ({ message }) => {
    dispatch(sendNewMessage(
      userProfile.id, id, message,
    ));
    reset();
    scrollDownChat();
  };

  return (
    <>
      <Header />
      {
        errorMessage === 'Ride not found' ? (
          <div className="ride-details__ride-not-found">Balade non trouvée</div>
        ) : (
          <>
            <main>
              <div className="ride-details">
                {isRedirect && <Redirect to="/home" />}
                <RideInfo
                  start_coordinate={start_coordinate}
                  end_coordinate={end_coordinate}
                  nbOfDogs={nbOfDogs}
                  max_number_dogs={max_number_dogs}
                  nbParticipants={participants.length}
                  startPointAddress={startPointAddress}
                  endPointAddress={endPointAddress}
                />

                <RideParticipants
                  setIsKickUserModalOpen={setIsKickUserModalOpen}
                  setUserKicked={setUserKicked}
                  nbOfDogs={nbOfDogs}
                  setIsDeleteRideModalOpen={setIsDeleteRideModalOpen}
                  id={id}
                />

                {
                  participants.find(
                    (participant) => participant.participant_id === userProfile.id,
                  ) && (
                    <button
                      type="button"
                      className={isChatOpen ? 'ride-details__toggle chat-open' : 'ride-details__toggle'}
                      onClick={() => {
                        setIsChatOpen(!isChatOpen);
                        scrollDownChat();
                      }}
                    >
                      {
                        isChatOpen ? (
                          '✖'
                        ) : (
                          <img src={conversation} alt="open chat" />
                        )
                      }
                    </button>
                  )
                }

                {isChatOpen && (
                  <section className="ride-details__chat">
                    <div className="ride-details__chat__messages-container" ref={chatZone}>
                      {
                        messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={msg.sender_id === userProfile.id ? 'ride-details__chat__messages-container__message my-message' : 'ride-details__chat__messages-container__message'}
                          >
                            <div className="ride-details__message__avatar">
                              <span className="ride-details__message__pic">
                                <img src={`${dburlWithoutApi}/user_resized/${msg.sender_photo}`} alt={msg.sender_first_name} />
                              </span>
                              <div className="ride-details__message__sent-info">
                                <span className="ride-details__message__sent-name">
                                  {msg.sender_first_name}
                                </span>
                                <span className="ride-details__message__sent-date">
                                  {translateDate(msg.sent)}
                                </span>
                              </div>
                            </div>

                            <span>{msg.message}</span>
                          </div>
                        ))
                      }
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="ride-details__chat__new-message">
                      <input
                        id="message"
                        name="message"
                        type="text"
                        placeholder="Nouveau message"
                        {...register('message', { required: true })}
                      />
                      <button type="submit">
                        <img src={send} alt="Envoyer" />
                      </button>
                    </form>

                  </section>
                )}

                {
                  isDeleteRideModalOpen && (
                    <div className="ride-details__modal-wrapper">
                      <div className="ride-details__modal">
                        <button
                          type="button"
                          className="ride-details__modal__close"
                          onClick={() => setIsDeleteRideModalOpen(false)}
                        >
                          ✖
                        </button>
                        <p className="ride-details__modal__bold">Attention !</p>
                        <p className="ride-details__modal__text">
                          Vous êtes l'organisateur de cette balade.
                        </p>
                        <p className="ride-details__modal__text">
                          En vous retirant vous la supprimerez.
                        </p>
                        <p className="ride-details__modal__text">
                          Continuer ?
                        </p>
                        <div className="ride-details__modal__btn-container">
                          <button
                            type="button"
                            className="ride-details__modal__back-btn"
                            onClick={() => setIsDeleteRideModalOpen(false)}
                          >
                            Retour
                          </button>
                          <button
                            type="button"
                            className="ride-details__modal__delete-btn"
                            onClick={() => handleDelete()}
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                }

                {
                  isKickUserModalOpen && (
                    <div className="ride-details__modal">
                      <button
                        type="button"
                        className="ride-details__modal__close"
                        onClick={() => {
                          setIsKickUserModalOpen(false);
                          setUserKicked(0);
                        }}
                      >
                        ✖
                      </button>
                      <p
                        className="ride-details__modal__text"
                      >
                        Voulez allez retirer {
                          participants.find(
                            (participant) => participant.participant_id === userKicked,
                          ).participant_first_name
                        } de la balade
                      </p>
                      <p
                        className="ride-details__modal__text"
                      >
                        Continuer ?
                      </p>
                      <div className="ride-details__modal__btn-container">
                        <button
                          type="button"
                          className="ride-details__modal__back-btn"
                          onClick={() => {
                            setIsKickUserModalOpen(false);
                            setUserKicked(0);
                          }}
                        >
                          Retour
                        </button>
                        <button
                          type="button"
                          className="ride-details__modal__delete-btn"
                          onClick={() => handleKick()}
                        >
                          Retirer
                        </button>
                      </div>
                    </div>
                  )
                }
              </div>
            </main>
          </>
        )
      }
    </>
  );
};

export default RideDetails;
