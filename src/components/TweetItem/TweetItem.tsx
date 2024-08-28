import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LikeButtonIcon } from '@src/assets/icons/Tweet/LikeButtonIcon';
import { MoreIcon } from '@src/assets/icons/Tweet/MoreIcon';
import { auth, db } from '@src/firebase';
import { getRelativeTime } from '@src/utils/getRelativeTime';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

import {
	Avatar,
	AvatarContainer,
	AvatarWrapper,
	ContentContainer,
	HeaderContainer,
	HeaderDataContainer,
	Image,
	ImageContainer,
	LikeButton,
	LikesContainer,
	LikesCount,
	MoreButton,
	MoreMenu,
	MoreMenuItem,
	Options,
	Text,
	TextContainer,
	TweetDate,
	TweetItemContainer,
	TweetUser,
	TweetUserLogin,
} from './styled';
import { TweetItemProps } from './types';

export const TweetItem = memo(
	({
		text,
		avatarUrl,
		userName,
		userLogin,
		publishDate,
		liked,
		image,
		likesAmount,
		userId,
		id,
		onDeleteTweet,
	}: TweetItemProps) => {
		const [isLiked, setIsLiked] = useState(liked);
		const [likes, setLikes] = useState(likesAmount);
		const [menuOpen, setMenuOpen] = useState(false);
		const menuRef = useRef<HTMLDivElement | null>(null);
		const relativeTime = useMemo(
			() => getRelativeTime(publishDate),
			[publishDate]
		);

		const handleLikeClick = useCallback(async () => {
			setIsLiked((prev) => !prev);
			setLikes((prev) => (isLiked ? prev - 1 : prev + 1));

			try {
				const tweetDocRef = doc(db, 'tweets', id);
				const userId = auth.currentUser?.uid;

				if (isLiked) {
					await updateDoc(tweetDocRef, {
						likes_user_id: arrayRemove(userId),
					});
				} else {
					await updateDoc(tweetDocRef, {
						likes_user_id: arrayUnion(userId),
					});
				}
			} catch (error) {
				console.error('Ошибка при обновлении лайка: ', error);
				setIsLiked((prev) => !prev);
				setLikes((prev) => (isLiked ? prev + 1 : prev - 1));
			}
		}, [isLiked, id]);

		const handleMoreClick = useCallback((event: React.MouseEvent) => {
			event.stopPropagation();
			setMenuOpen((prev) => !prev);
		}, []);

		const handleClickOutside = useCallback(
			(event: MouseEvent) => {
				if (
					menuOpen &&
					menuRef.current &&
					!menuRef.current.contains(event.target as Node)
				) {
					setMenuOpen(false);
				}
			},
			[menuOpen]
		);

		useEffect(() => {
			document.addEventListener('mousedown', handleClickOutside);
			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}, [handleClickOutside]);

		const handleMenuItemClick = useCallback(() => {
			setMenuOpen(false);
		}, []);

		const handleDeleteClick = useCallback(() => {
			if (auth.currentUser?.uid) {
				onDeleteTweet(id);
			}
		}, [id, onDeleteTweet]);

		const isOwner = auth.currentUser?.uid === userId;

		return (
			<TweetItemContainer>
				<AvatarWrapper>
					<AvatarContainer>
						<Avatar src={avatarUrl || undefined} />
					</AvatarContainer>
				</AvatarWrapper>

				<ContentContainer>
					<HeaderContainer>
						<HeaderDataContainer>
							<TweetUser>{userName}</TweetUser>
							<TweetUserLogin>{userLogin}</TweetUserLogin>
							<TweetDate>{relativeTime}</TweetDate>
						</HeaderDataContainer>
						<MoreButton onClick={handleMoreClick}>
							<MoreIcon />
						</MoreButton>
						{menuOpen && (
							<MoreMenu ref={menuRef}>
								<MoreMenuItem onClick={handleMenuItemClick}>
									{'Go to ' + userLogin + ' profile'}
								</MoreMenuItem>
								<MoreMenuItem onClick={handleMenuItemClick}>
									{'Follow ' + userLogin}
								</MoreMenuItem>
								<MoreMenuItem onClick={handleMenuItemClick}>
									{'Mute ' + userLogin}
								</MoreMenuItem>
								<MoreMenuItem onClick={handleMenuItemClick}>
									{'Block ' + userLogin}
								</MoreMenuItem>
								{isOwner && (
									<MoreMenuItem onClick={handleDeleteClick}>
										Delete Tweet
									</MoreMenuItem>
								)}
							</MoreMenu>
						)}
					</HeaderContainer>
					<TextContainer>
						<Text>{text}</Text>
					</TextContainer>
					{image && (
						<ImageContainer>
							<Image src={image} />
						</ImageContainer>
					)}
					<Options>
						<LikesContainer onClick={handleLikeClick}>
							<LikeButton>
								<LikeButtonIcon liked={isLiked} />
							</LikeButton>
							<LikesCount>{likes}</LikesCount>
						</LikesContainer>
					</Options>
				</ContentContainer>
			</TweetItemContainer>
		);
	}
);
