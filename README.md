# GetItDone
## A full stack application employed React, Material UI, Ruby on Rails

GetItDone is a task management application.

## Installation

Fork and clone this repo then run npm!
```bash
npm i
```

## Usage
Users are able to create their own tasks along with setting:
* Expiration date
* Priority levels
* Task name
* Task notes

Users can create a profile (with user authentication using bcrypt) with their own username, avatar, and bio.

Tasks can be sorted by priority or date (due today, upcoming, past due). A seperate calendar page will be populated with tasks ordered by their due date; these tasks will be segmented into the months they're due, with a title of the month displayed above (only the months with due tasks are displayed). Tasks passed their due date will also be organised into their own page. 

When a user completes a task a short confetti animation will play, the confetti will start falling from the bottom of the navbar to the bottom of the screen.
