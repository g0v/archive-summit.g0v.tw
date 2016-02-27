import React from 'react';

class TableRow extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
    model: React.PropTypes.object,
  };

  renderCells () {
    return Object.keys(this.props.model).map((key) => {
      return <td key={key}>{this.renderCell(key)}</td>;
    });
  }

  renderColspanCells () {
    return Object.keys(this.props.data).map((key, idx) => {
      if (key === 'colSpan') return;
      if (idx === 1) return <td key={key}>{this.renderCell(key)}</td>;
      return <td key={key} colSpan={this.props.data.colSpan}>{this.renderCell(key)}</td>;
    });
  }

  renderCell (key) {
    const value = this.props.data[key];
    if (!value) return;
    if (typeof value === 'string' || Object.prototype.toString.call(value) === '[object Date]') {
      return value.toString();
    } else {
      return React.cloneElement(value);
    }
  }

  render () {
    return (
      <tr>
        {
          do {
            if (this.props.data.colSpan) {
              this.renderColspanCells()
            } else {
              this.renderCells()
            }
          }
        }
      </tr>
    );
  }
}

export default TableRow;
