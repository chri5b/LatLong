LatLong
=======

Retrieves latitude and longitude for url encoded addresses in the addresses.js file.
Uses Google Maps API

usage: node server.js
navigate to http://localhost:8000/getLatLong?from=0&num=10

Best not to try more than 10 at a time because rate-limiting kicks in what with Node parallellising the requests.
