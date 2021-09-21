import React from 'react';
import { useForm } from "react-hook-form";

import '../CreateRide/createRide.scss';

const CreateRide = () => {
	//todo check how to avoid errors when input is empty but only on submit (with state ?)
	const { register, handleSubmit, formState: { errors } } = useForm();

	const onSubmit = (data) => {
		console.log('submitted data : ', data);
	};

	return (
		<main className='create-ride'>
			<h2>Création d'une balade</h2>
			<form onSubmit={handleSubmit(onSubmit)}>

				<div className="create-ride__field">
					<label htmlFor="title">Nom de ma balade</label>
					<input
						id='title'
						name='title'
						defaultValue="Ma balade"
						{...register('title', {required: 'Title is needed'})}
					/>
					{/* {errors.title && <span>Le titre est obligatoire</span>} */}
				</div>

				{/* how to choose coordinates ? with map ? by writing an adress ? */}
				<div className="create-ride__field">
					<label htmlFor="startingPoint">Point de départ</label>
					<input
						id='startingPoint'
						name='startingPoint'
						defaultValue="Point de départ"
						{...register('startingPoint', {required: 'startingPoint is needed'})}
					/>
					{/* {errors.startingPoint && <span>Le point de départ est obligatoire</span>} */}
				</div>

				<div className="create-ride__field">
					<label htmlFor="endingPoint">Point d'arrivée</label>
					<input
						id='endingPoint'
						name='endingPoint'
						defaultValue="Point d'arrivée"
						{...register('endingPoint', {required: 'endingPoint is needed'})}
					/>
					{/* {errors.endingPoint && <span>Le point d'arrivée est obligatoire</span>} */}
				</div>

				{/* ADD INPUT DATE TO SELECT DATE */}

				{/* CHANGE INPUT FOR SELECT WITH OPTION */}
				<div className="create-ride__field">
					<p>Heure de départ</p>
					<label htmlFor="startHour"></label>
					<input
						id='startHour'
						name='startHour'
						defaultValue={18}
						type='number'
						{...register('startHour', {required: 'startHour is needed'})}
					/>
					<label htmlFor="startMin"></label>
					<input
						id='startMin'
						name='startMin'
						defaultValue={0}
						type='number'
						{...register('startMin', {required: 'startMin is needed'})}
					/>
				</div>

				<div className="create-ride__field">
					<p>Heure d'arrivée estimée</p>
					<p>18h55</p>
				</div>

				<div className="create-ride__field">
					<p>Temps de la balade</p>
					<p>27min</p>
				</div>

				<div className="create-ride__field">
					<label htmlFor="maxDogs">Nombre maximum de chiens</label>
					<input
						id='maxDogs'
						name='maxDogs'
						type='number'
						{...register('maxDogs', {required: 'maxDogs is needed'})}
					/>
					{/* {errors.maxDogs && <span>Le nombre max de chiens est obligatoire</span>} */}
				</div>


				{/* INPUT ==> TEXTAREA */}
				<div className="create-ride__field">
					<label htmlFor="description">Description de ma balade</label>
					<input
						{...register('description', {required: 'Description is needed'})}
					/>
					{/* {errors.description && <span>La description est obligatoire</span>} */}
				</div>
				
				<input type="submit" />
			</form>
		</main>
	);
};

export default CreateRide;
