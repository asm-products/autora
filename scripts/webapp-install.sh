#!/bin/bash

cd webapp/client
bower install
npm install
ember build --environment=production
