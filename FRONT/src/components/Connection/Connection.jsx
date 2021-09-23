import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../actions/users';

import './Connection.scss';

const Connection = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = (data) => {
    // dispatch action to post data to db through middleware and try to conenct
    // if connected, set user data in state
    console.log('submitted data : ', data);
    dispatch(loginUser());
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
      >
        OPEN
      </button>
      <main className="connection">
        <div className="connection__info">
          <div className="connection__info__text">
            <p>Je suis la présentation du site</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Esse, quae dolores delectus porro qui voluptates mollitia sequi.
              Aliquam laudantium quia quidem, totam suscipit,
              unde ipsam voluptatem delectus consequuntur ratione magnam!
            </p>
          </div>
          <div className="connection__info__map">
            GROSSE MAP DE PRESENTATION ICI
          </div>
        </div>

        {isModalOpen && (
          <div className="connection__modal">
            <button
              className="connection__modal__close"
              type="button"
              onClick={() => setIsModalOpen(false)}
            >
              X
            </button>
            <form onSubmit={handleSubmit(onSubmit)} className="connection__form">

              <div className="connection__form__field">
                <label htmlFor="email">Email</label>
                <input
                  id="emil"
                  name="email"
                  type="email"
                  {...register('email', { required: true })}
                />
              </div>

              <div className="connection__form__field">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  {...register('password', { required: true })}
                />
              </div>

              <button
                type="submit"
              >
                Se connecter
              </button>

            </form>
          </div>
        )}

      </main>
    </>
  );
};

export default Connection;
