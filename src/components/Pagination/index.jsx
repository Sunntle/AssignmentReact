import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import "./PaginationStyle.scss";
function PaginationComponent({ curPage, totalPage, onPageChange }) {
  const handleClick = (page) => {
    onPageChange(page);
  };
  const pageItem = [];
  for (let index = 1; index <= totalPage; index++) {
    const isActive = index === curPage;
    pageItem.push(
      <PaginationItem key={index}>
        <PaginationLink className={isActive ? "active" : ""} onClick={() => handleClick(index)}>
          {index}
        </PaginationLink>
      </PaginationItem>
    );
  }

  return (
    <div className="mt-5">
      <Pagination>
        {curPage > 1 ? (
          <>
            <PaginationItem>
              <PaginationLink first onClick={() => handleClick(1)} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink previous onClick={() => handleClick(--curPage)} />
            </PaginationItem>
          </>
        ) : null}
        {pageItem.map((el) => el)}
        {curPage !== totalPage ? (
          <>
            <PaginationItem>
              <PaginationLink next onClick={() => handleClick(++curPage)} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink last onClick={() => handleClick(totalPage)} />
            </PaginationItem>
          </>
        ) : null}
      </Pagination>
    </div>
  );
}

export default PaginationComponent;
