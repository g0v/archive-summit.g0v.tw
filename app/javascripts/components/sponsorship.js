'use strict';

import React, { Component } from "react";
import { getLocale } from "../locale";

class Sponsorship extends Component {
  render() {
    let isEn = getLocale() === 'en-US'

    return <div className="sponsorship">
      <h2>{ isEn ? 'Sponsorship' : '贊助'}</h2>
      <p>{
        isEn ?
        <p>If you would like to sponsor g0v Summit 2016, please kindly contact <a href="mailto:g0v-summit-sponsor@googlegroups.com">g0v-summit-sponsor@googlegroups.com</a>.</p> :
        <p>如果您欲贊助 g0v summit 2016，請與 <a href="mailto:g0v-summit-sponsor@googlegroups.com">g0v-summit-sponsor@googlegroups.com</a> 聯絡。</p>
      }</p>
    </div>;
  }
};

export default Sponsorship;
