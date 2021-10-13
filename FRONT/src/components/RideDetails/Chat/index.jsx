/* eslint-disable linebreak-style */
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { sendNewMessage } from '../../../actions/rides';

import { dburlWithoutApi } from '../../../utils/dburl';
import { translateDate } from '../../../utils/translateDate';

import conversation from '../../../assets/img/info-ride/conversation.svg';
import send from '../../../assets/img/info-ride/send.svg';

import './chat.scss';

const Chat = ({
  userId, id,
}) => {
  const dispatch = useDispatch();
  const chatZone = useRef();
  const { register, handleSubmit, reset } = useForm();
  const { participants, messages } = useSelector((state) => state.rides.currentRide);

  const [isChatOpen, setIsChatOpen] = useState(false);

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
      userId, id, message,
    ));
    reset();
    scrollDownChat();
  };
  return (
    <>
      {
        participants.find(
          (participant) => participant.participant_id === userId,
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
                  className={msg.sender_id === userId ? 'ride-details__chat__messages-container__message my-message' : 'ride-details__chat__messages-container__message'}
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
    </>
  );
};

export default Chat;
