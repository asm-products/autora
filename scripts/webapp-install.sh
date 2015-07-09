#!/bin/bash

(cd webapp/client; bower install)
(cd webapp/client; npm install)
(cd webapp/client; ember build --environment=production)
