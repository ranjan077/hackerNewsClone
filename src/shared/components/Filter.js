import React from 'react';


function Filter({filteredNews}) {
    return (
        <div className="filterConatiner">
            <button className="no-background-btn">Top</button>
            <span className="pipe"> | </span>
            <button className="no-background-btn new-btn" onClick={e => filteredNews(`numericFilters=created_at_i > ${(Date.now() - 10000000)/1000}`)}>New</button>
        </div>
    );
}

export default Filter;
