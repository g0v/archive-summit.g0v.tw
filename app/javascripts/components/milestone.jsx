'use strict';

import React, { Component } from "react";
import { getLocale } from "../locale";

import milestoneData from "../../jsons/milestones.json";

export default class Milestone extends Component {
  render() {
    let data = milestoneData[getLocale()]
    return <div className="milestone">
      <h2>{data.header}</h2>
      <section className="milestones">
        {data.milestones.map(({range, title}) => (
          <article className="milestone">
            <div className="milestone-range">
              <span className="milestone-date">{range[0]}</span>
              －
              <span className="milestone-date">{range[1]}</span>
            </div>
            <div className="milestone-title">{title}</div>
          </article>
        ))}
      </section>
    </div>;
  }
};
