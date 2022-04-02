import '../../assets/scss/_pagination.scss';

type PaginationProps = {
  pagesNumber: Number,
  currentPage: Number,
  nextPage: Function,
  prevPage: Function
}

export default function Pagination (props: PaginationProps) {
  return (
    <div className="pagination__container">
      <button
        onClick={() => props.prevPage()}
        className="pagination__btn-prev"
      />
      <button
        onClick={() => props.nextPage()}
        className="pagination__btn-next"
      />
    </div>
  )
}