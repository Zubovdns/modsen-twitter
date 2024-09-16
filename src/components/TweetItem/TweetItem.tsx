import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { getUserUid, isOwner } from '@api/firebase/auth';
import { likeTweet } from '@api/firebase/firestore';
import { LikeButtonIcon } from '@assets/icons/Tweet/LikeButtonIcon';
import { MoreIcon } from '@assets/icons/Tweet/MoreIcon';
import { getRelativeTime } from '@utils/getRelativeTime';

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
		likesArray,
		image,
		likesAmount,
		userId,
		id,
		onDeleteTweet,
	}: TweetItemProps) => {
		const [isLiked, setIsLiked] = useState(() =>
			likesArray.includes(getUserUid() || '')
		);
		const [likes, setLikes] = useState(likesAmount);
		const [menuOpen, setMenuOpen] = useState(false);
		const menuRef = useRef<HTMLDivElement | null>(null);
		const relativeTime = useMemo(
			() => getRelativeTime(new Date(publishDate.seconds * 1000)),
			[publishDate]
		);

		const handleLikeClick = async () => {
			setIsLiked((prev) => !prev);
			setLikes((prev) => (isLiked ? prev - 1 : prev + 1));

			try {
				likeTweet(id, isLiked);
			} catch (error) {
				console.error(error);
				setIsLiked((prev) => !prev);
				setLikes((prev) => (isLiked ? prev + 1 : prev - 1));
			}
		};

		const handleMoreClick = (event: React.MouseEvent) => {
			event.stopPropagation();
			setMenuOpen((prev) => !prev);
		};

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

		const handleMenuItemClick = () => {
			setMenuOpen(false);
		};

		const handleDeleteClick = () => {
			if (isOwner(userId)) {
				onDeleteTweet(id);
			}
		};

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
							<TweetUserLogin>{'@' + userLogin}</TweetUserLogin>
							<TweetDate>{relativeTime}</TweetDate>
						</HeaderDataContainer>
						<MoreButton onClick={handleMoreClick}>
							<MoreIcon />
						</MoreButton>
						{menuOpen && (
							<MoreMenu ref={menuRef}>
								<MoreMenuItem onClick={handleMenuItemClick}>
									{'Go to ' + '@' + userLogin + ' profile'}
								</MoreMenuItem>
								<MoreMenuItem onClick={handleMenuItemClick}>
									{'Follow ' + '@' + userLogin}
								</MoreMenuItem>
								<MoreMenuItem onClick={handleMenuItemClick}>
									{'Mute ' + '@' + userLogin}
								</MoreMenuItem>
								<MoreMenuItem onClick={handleMenuItemClick}>
									{'Block ' + '@' + userLogin}
								</MoreMenuItem>
								{isOwner(userId) && (
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
