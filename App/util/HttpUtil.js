'use strict';
import React, {Component} from 'react';

export let method = 'POST';

export let fetchData = (url, param) => {
    return fetch(url, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(param)
    })
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.warn(error);
        });
}