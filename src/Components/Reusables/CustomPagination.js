import React from "react";
import { connect } from "react-redux";

import Pagination from "react-bootstrap/Pagination";

const CustomPagination = ({ pagination, form, getPageFunc }) => {
  return (
    <Pagination style={{ margin: "0", marginBottom:"0.5rem" }}>
      <div style={{ display: "inherit", margin: "auto" }}>
        <Pagination.Item
          style={pagination.currentPage <= 2 ? { opacity: "0" } : {}}
          disabled={pagination.currentPage <= 2}
          key={"firstPage"}
          onClick={() => {
            getPageFunc({ ...form, page: 1 }, false);
          }}
        >
          1
        </Pagination.Item>
        <Pagination.Item
          style={pagination.currentPage <= 2 ? { opacity: "0" } : {}}
          disabled={pagination.currentPage <= 2}
          key={"previous"}
          onClick={() => {
            getPageFunc({ ...form, page: pagination.currentPage - 1 }, false);
          }}
        >
          {"<"}
        </Pagination.Item>
        <Pagination.Item
          style={pagination.currentPage === 1 ? { opacity: "0" } : {}}
          disabled={pagination.currentPage === 1}
          key={"beforeCurrent"}
          onClick={() => {
            getPageFunc({ ...form, page: pagination.currentPage - 1 }, false);
          }}
        >
          {pagination.currentPage - 1}
        </Pagination.Item>
        <Pagination.Item active key={pagination.currentPage}>
          {pagination.currentPage}
        </Pagination.Item>
        <Pagination.Item
          style={
            pagination.currentPage === pagination.totalPages
              ? { opacity: "0" }
              : {}
          }
          disabled={pagination.currentPage === pagination.totalPages}
          key={"aftercurrent"}
          onClick={() => {
            getPageFunc({ ...form, page: pagination.currentPage + 1 }, false);
          }}
        >
          {pagination.currentPage + 1}
        </Pagination.Item>
        <Pagination.Item
          style={
            pagination.currentPage >= pagination.totalPages - 1
              ? { opacity: "0" }
              : {}
          }
          disabled={pagination.currentPage >= pagination.totalPages - 1}
          key={"next"}
          onClick={() => {
            getPageFunc({ ...form, page: pagination.currentPage + 1 }, false);
          }}
        >
          {">"}
        </Pagination.Item>
        <Pagination.Item
          style={
            pagination.currentPage >= pagination.totalPages - 1
              ? { opacity: "0" }
              : {}
          }
          disabled={pagination.currentPage >= pagination.totalPages - 1}
          key={"lastPage"}
          onClick={() => {
            getPageFunc({ ...form, page: pagination.totalPages }, false);
          }}
        >
          {pagination.totalPages}
        </Pagination.Item>
      </div>
    </Pagination>
  );
};

export default connect()(CustomPagination);
