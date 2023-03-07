import "../../assets/scss/_pagination.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

type PaginationProps = {
	pagesNumber: number;
	currentPage: number;
	nextPage: Function;
	prevPage: Function;
	setPage: Function;
};

export default function Pagination(props: PaginationProps) {
	const renderDivs = () => {
		const divs: Array<JSX.Element> = [];

		for (
			let i: number = props.currentPage > 2 ? props.currentPage - 2 : 1;
			i <=
			(props.currentPage > 2
				? props.currentPage + 2
				: props.currentPage + 4);
			i++
		) {
			divs.push(
				<div
					onClick={() => props.setPage(i)}
					className={`paggination-element ${
						props.currentPage === i ? "active" : ""
					}`}
					key={i + "paggination"}
				>
					{i}
				</div>
			);
		}
		return divs;
	};

	return (
		<div className="pagination__container">
			<button
				onClick={() => props.prevPage()}
				className="pagination__btn"
			>
				<FontAwesomeIcon icon={faChevronLeft} />
			</button>
			{renderDivs()}
			<button
				onClick={() => props.nextPage()}
				className="pagination__btn"
			>
				<FontAwesomeIcon icon={faChevronRight} />
			</button>
		</div>
	);
}
