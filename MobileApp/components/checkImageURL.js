import * as React from 'react';

export function checkImageURL(URL) {
    fetch(URL)
      .then((res) => {
        console.log("checkImageURL: " + res.status);
        if (res.status !== 200) {
          return false;
        } else {
          return true;
        }
      })
      .catch((err) => {
        return false;
      });
  }