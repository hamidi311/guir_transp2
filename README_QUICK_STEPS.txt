QUICK STEPS
1) On Netlify, set Environment variables (Build & deploy → Environment):
   - TWILIO_ACCOUNT_SID
   - TWILIO_AUTH_TOKEN
   - TWILIO_FROM  (your Twilio phone, e.g. +16175550123)
   - SMS_TO       (+18573339639)  ← already set for you
2) Connect this repo in Netlify (or upload folder). Publish directory: . (root). No build command.
3) Ensure this path exists in repo: netlify/functions/quote.js
4) Deploy. Submit the form on the site → you should receive a text.
