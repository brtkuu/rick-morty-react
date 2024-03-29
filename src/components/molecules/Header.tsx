import { FormEvent, useState } from "react";
import "../../assets/scss/_header.scss";

type HeaderProps = {
	readonly name: string;
	handleSearch: Function;
};

function Header(props: HeaderProps) {
	const handleTyping = (value: string) => {
		props.handleSearch(value);
	};

	return (
		<header className="header__container">
			<nav className="header__nav-container">
				<img
					src="./images/rm_logo.png"
					className="header__logo"
					alt="Rick Morty logo"
				/>
				<div className="header__search-container">
					<input
						type="text"
						className="header__search-input"
						placeholder="Start typing to search..."
						value={props.name}
						onInput={(e: FormEvent<HTMLInputElement>) =>
							handleTyping(e.currentTarget.value)
						}
					/>
					<svg
						className="header__search-icon"
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 0 24 24"
						width="24px"
						fill="#000000"
					>
						<path d="M0 0h24v24H0z" fill="none" />
						<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
					</svg>
				</div>
			</nav>
		</header>
	);
}

export default Header;
