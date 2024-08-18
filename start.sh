#!/bin/bash
wget https://www.digicert.com/CACerts/BaltimoreCyberTrustRoot.crt.pem
npm install
touch .env
npm run prebuild
cat .env
npm start