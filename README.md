# GSB Backend

This is the backend for GoldStarBoard.

Made this since I want to try to make a scraper app in JavaScript and also remember how to make a RESTFUL APIs.

## Features

- Scrape the weather underground profile of a personal weather station
- Send the scraped data into a Postgres Database (Currently using supabase) using Drizzle ORM
- Have RESTFUL APIs for the scraped data. Only allows GET Request due to me not wanting to create an admin dashboard and doing CRUD operations in the database instead.

## Tech Stack

- Hono
- Bun
- Cheerios
- Axios
- Docker
- Drizzle
- TypeScript

## API Routes

**Stations**
- http://localhost/api/awards
- http://localhost/api/awards/:id 
- http://localhost/api/awards/station/:id

**Daily Data**
- http://localhost/api/dailydata
- http://localhost/api/dailydata/:id 
- http://localhost/api/dailydata/station/:id 

**Gold Stars**
- http://localhost/api/goldstars
- http://localhost/api/goldstars/:id 

**Hourly Data**
- http://localhost/api/hourlydata
- http://localhost/api/hourlydata/:id 
- http://localhost/api/hourlydata/station/:id 

**Stations**
- http://localhost/api/stations
- http://localhost/api/stations/:id 

**Streaks**
- http://localhost/api/streaks
- http://localhost/api/streaks/:id

**Go to my website to check it out:** [url](https://gsb.mejaresebes.com/api/stations)
