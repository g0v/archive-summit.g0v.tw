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
        {data.milestones.map(({range, title, url, label}) => (
          <article className="milestone" key={title}>
            <div className="milestone-range">
              <span className="milestone-date">{range[0]}</span>
              －
              <span className="milestone-date">{range[1]}</span>
            </div>
            <div className="milestone-title">
              <a href={url}>
                {title}
              </a>
              {label ? (
                <div>
                  <span className="milestone-label">{label}</span>
                </div>
              ) : ''}
            </div>
          </article>
        ))}
      </section>
    </div>;
  }
};
