import React from "react";
import _ from "lodash";
import PropTypes from 'prop-types'

const Pagination = ({itemsCount, pageSize, currentPage, onPageChange}) => {
    const pageCount = Math.ceil(itemsCount / pageSize)
    if(pageCount === 1) return 0;
    const pages = _.range(1,pageCount+1)
    return (
    <nav>
        <ul className="pagination">
            {pages.map((page) => (
                <li className={"page-item" + (page === currentPage ? " active" : "")} key={"page_" + page}>
                    <button className="page-link" onClick={()=>onPageChange(page)}>{page}</button>
                </li>
            ))}
        </ul>
    </nav>
    )
}

Pagination.prototype = {
    itemsCount: PropTypes.number.isRequired, 
    pageSize: PropTypes.number.isRequired, 
    currentPage: PropTypes.func.isRequired, 
    onPageChange: PropTypes.number.isRequired
}

export default Pagination