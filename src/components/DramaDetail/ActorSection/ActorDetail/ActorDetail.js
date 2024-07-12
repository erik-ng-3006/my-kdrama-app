import React from 'react';
import classes from './ActorDetail.module.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useDispatch, useSelector } from 'react-redux';
import { toggleShowActorModal } from '../../../../app/uiSlice';
import FacebookIcon from '@mui/icons-material/Facebook';

const ActorDetail = () => {
	const dispatch = useDispatch();
	const actorDetail = useSelector((state) => state.actor.actorDetail);
	const socialDetail = useSelector((state) => state.actor.socialDetail);

	const {
		name,
		birthday,
		biography,
		place_of_birth: birthPlace,
		profile_path: path,
	} = actorDetail;

	const profilePath =
		path !== null
			? `https://image.tmdb.org/t/p/original/${path}`
			: '/img/default-profile.png';

	const d = new Date(birthday);
	const closeButtonHandler = () => {
		dispatch(toggleShowActorModal());
	};
	return (
		<div className={classes.actorDetail}>
			<span onClick={closeButtonHandler}>&times;</span>
			<img alt='profile' src={profilePath} />
			<div>
				<h3>{name}</h3>
				<p>
					<span>
						<b>Birthday: </b>
						{d.toDateString().slice(3)}
					</span>
					{birthPlace && (
						<span>
							<b>Place: </b>
							{birthPlace}
						</span>
					)}
				</p>
				{biography && (
					<p>
						<b>Bio: </b>
						<p>{biography}</p>
					</p>
				)}
				{socialDetail && socialDetail['instagram_id'] && (
					<a
						href={`https://www.instagram.com/${socialDetail['instagram_id']}`}
						target='_blank'
						rel='noreferrer'
					>
						<InstagramIcon
							sx={{
								fontSize: '3rem',
								marginTop: '1rem',
								transition: 'translate 300ms ease-out',
								':hover': { translate: '0 -.5rem' },
							}}
						/>
					</a>
				)}
				{socialDetail && socialDetail['facebook_id'] && (
					<a
						href={`https://www.facebook.com/${socialDetail['facebook_id']}/`}
						target='_blank'
						rel='noreferrer'
					>
						<FacebookIcon
							sx={{
								fontSize: '3rem',
								marginTop: '1rem',
								transition: 'translate 300ms ease-out',
								':hover': { translate: '0 -.5rem' },
							}}
						/>
					</a>
				)}
			</div>
		</div>
	);
};

export default ActorDetail;
