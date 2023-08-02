import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import "./PaginationStyle.scss";
function PaginationComponent({ curPage, totalPage, onPageChange }) {
  const handleClick = (page) => {
    onPageChange(page);
  };
  // Hạn chế hiển thị chỉ 5 trang xung quanh trang hiện tại (nếu có đủ trang)
  const pageItem = [];
  const maxPageToShow = 5;
  let startPage = Math.max(1, curPage - Math.floor(maxPageToShow / 2));
  let endPage = Math.min(totalPage, startPage + maxPageToShow - 1);

  if (endPage - startPage < maxPageToShow - 1) {
    // Nếu số trang hiển thị ít hơn 5, cố gắng cân bằng vị trí của trang đầu và trang cuối
    startPage = Math.max(1, endPage - maxPageToShow + 1);
  }
  for (let index = startPage; index <= endPage; index++) {
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
