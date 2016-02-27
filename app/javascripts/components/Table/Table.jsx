import React, { Component } from "react";
import classnames from  "classnames/bind";
import TableHead from  "./TableHead";
import TableRow from  "./TableRow";
import styles from "./styles.css";

class Table extends Component {
  static propTypes = {
    className: React.PropTypes.string,
    heading: React.PropTypes.bool,
    model: React.PropTypes.object,
    source: React.PropTypes.array
  };

  static defaultProps = {
    className: '',
    heading: true,
    source: []
  };

  renderHead () {
    if (this.props.heading) {
      const {model, ...rest} = this.props;

      return (
        <TableHead
          model={model}
          {...rest}
        />
      );
    }
  }

  renderBody () {
    const rows = this.props.source.map((data, index) => {
      return (
        <TableRow
          data={data}
          index={index}
          key={index}
          model={this.props.model}
        />
      );
    });

    return <tbody>{rows}</tbody>;
  }

  render () {
    const cx = classnames.bind(styles)
    return (
      <table className={cx(['root', this.props.className])}>
        {this.renderHead()}
        {this.renderBody()}
      </table>
    );
  }
}

export default Table;
