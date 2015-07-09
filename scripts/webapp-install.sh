#!/bin/bash

cd webapp/client
bower install
npm install
npm install -g ember-cli
ember build --environment=production
