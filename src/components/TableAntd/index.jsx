import React from "react";
import "./style.scss";
import { Pagination, Table } from "antd";
const TableAntdCustom = ({
  list = [],
  listHavePages,
  onChange,
  no,
  reload,
  type,
  totalItems = 0,
  totalPages = 0,
  arrData = null,
  emptyText = "",
  columns = null,
  className = null,
  pageSize = 5,
  pagination = true,
  // searchValue = null,
}) => {
  const handleChangePage = (page) => {
    // setCurrent(page);
    if (onChange) {
      onChange(page);
    }
  };
  const showTotal = () => {
    console.log(no, pageSize, totalItems);
    const start = (no - 1) * pageSize + 1;
    const end = Math.min(no * pageSize, totalItems);
    return `Hiển thị ${start} - ${end} trong ${totalItems} dữ liệu`;
  };

  return (
    <div className={`table_container ${className ? className : ""}`}>
      <Table
        columns={columns}
        dataSource={list}
        locale={{ emptyText }}
        pagination={false}
        bordered
        className={`table_content ${className ? className : ""}`}
      ></Table>
      {list?.length > 0 && pagination ? (
        <div className={`table_pagination ${className ? className : ""}`}>
          <div className="table_pagination-totalText">{showTotal()}</div>
          <Pagination
            current={no}
            onChange={handleChangePage}
            total={totalItems} // Provide the totalItems prop here
            pageSize={pageSize} // Specify the number of items per page
            showSizeChanger={false} // Hide the pageSize changer
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TableAntdCustom;
