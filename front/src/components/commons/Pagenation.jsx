import React from 'react';
import styled from 'styled-components';

function Pagination({ currentPage, setCurrentPage, lastPage }) {
  const pages = [...Array(lastPage).keys()].map((_, index) => index + 1);
  
  // 페이지네이션에서 보여줄 최대 페이지 수
  const maxPageLimit = 10;
  
  // 시작 페이지를 계산
  let startPage = Math.floor((currentPage - 1) / maxPageLimit) * maxPageLimit;
  
  // 실제 페이지네이션에서 보여질 페이지들
  let visiblePages = pages.slice(startPage, startPage + maxPageLimit);

  return (
    <PaginationContainer>
      <PageButton
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        {'<'}
      </PageButton>

      {startPage > 0 && 
        <PageButton key="ellipsis-start" onClick={() => setCurrentPage(startPage)}>
          <Ellipsis>...</Ellipsis>
        </PageButton>
      }

      {visiblePages.map((page) => (
        <PageButton
          key={page}
          $isActive={currentPage === page}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </PageButton>
      ))}

      {startPage + maxPageLimit < lastPage && 
        <PageButton key="ellipsis-end" onClick={() => setCurrentPage(startPage + maxPageLimit + 1)}>
          <Ellipsis>...</Ellipsis>
        </PageButton>
      }

      <PageButton
        disabled={currentPage === lastPage}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        {'>'}
      </PageButton>
    </PaginationContainer>
  );
}

export default Pagination;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  align-items: center;
  gap: 1rem;
`;

const PageButton = styled.button`
  border: none;
  color: ${props => props.$isActive ? '#0070c9' : '#1d1d1f'};
  background-color: transparent;
  padding: 10px;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.3s;
  
  &:disabled {
    color: #c7c7cc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    color: #005ec3;
  }
`;

const Ellipsis = styled.span`
  color: #c7c7cc;
`;


