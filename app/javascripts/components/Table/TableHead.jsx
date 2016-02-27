import React from 'react';

const TableHead = ({ model }) => {
  const contentCells = Object.keys(model).map((key) => {
    return (
      <th
        key={key}
        className={`Table-${key}`}
      >
        {model[key].label}
      </th>

    );
  });

  return (
    <thead>
      <tr>{[...contentCells]}</tr>
    </thead>
  );
};

TableHead.propTypes = {
  className: React.PropTypes.string,
  model: React.PropTypes.object,
};

TableHead.defaultProps = {
  className: '',
  model: {},
};

export default TableHead
