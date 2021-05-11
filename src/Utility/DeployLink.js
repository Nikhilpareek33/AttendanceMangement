import React, { useState } from 'react';

export default function DeployLink (link){

    const t =  "https://attendance-man-heroku.herokuapp.com";

    let a = t + link ;

    return a;
}