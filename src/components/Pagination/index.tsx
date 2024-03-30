import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

type PaginationProps = {
  pageCurrent: number;
  onChangePage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  pageCurrent,
  onChangePage,
}) => (
  <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    onPageChange={(event) => onChangePage(event.selected + 1)}
    pageRangeDisplayed={4}
    pageCount={3}
    forcePage={pageCurrent - 1}
    previousLabel="<"
    renderOnZeroPageCount={null}
  />
);

export default Pagination;
