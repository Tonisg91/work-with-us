# Work With Us Web APP

# Developers:

David de Lamo & Toni Sanchez

# [Link to heroku](https://workwithus.herokuapp.com/) || Offline. Updating Backend & passing front to React.

## Description

Work With Us is an App for offer jobs.

## User Stories

- As a user I want to see a list of announcements.
- As a user (professional & client) I want to have a profile page.
- As a user (client) I want to post an announcement.
- As a user (client) I want to edit my announcement.
- As a user (professional) I want to be able to offer for a work.
- As a user (professional & client) I want to edit my data profile.
- As a user (professional & client) I want to view finished works.

## Backlog

- As a user (client) I want to be able to define the geocalization of my announcement.
- As a user I want to see a list of announcements in my area.
- As a user (professional & client) I want to post a review of the work done.

## Routes

| Method | URL                                          | Description                                                                   |
| ------ | -------------------------------------------- | ----------------------------------------------------------------------------- |
| GET    | '/'                                          | Render index Homepage (public)                                                |
| GET    | '/auth'                                      | Render Login & signup form (public)                                           |
| GET    | '/auth/:email'                               | Render Login & signup form with email added on '/'                            |
| POST   | '/login'                                     | Redirect to /user-profile (public)                                            |
| POST   | '/signup'                                    | Redirect to /user-profile && create an instance of user on DB (public)        |
| GET    | '/logout'                                    | Close Session and redirect to index                                           |
| GET    | '/myaccount'                                 | Render account data (private)                                                 |
| POST   | '/editUser/:userid'                          | Update the user data                                                          |
| GET    | '/announcements'                             | Render announcements list                                                     |
| GET    | '/announcements/:announcement id'            | Render announcement details                                                   |
| POST   | '/announcements/:announcement id/make-offer' | Make offer to client (professional user) (button hidden if professional user) |
| GET    | '/announcements/:announcement id/edit'       | Render announcement data form (private) (button on announcement)              |
| POST   | '/announcements/:announcement id/edit'       | Update announcement data (private)                                            |
| POST   | '/announcements/:announcement id/delete'     | Remove announcement from DB (private) (button on announcement)                |
| GET    | '/addAnnouncement'                           | Render new announcement form                                                  |
| POST   | '/addAannouncement'                          | Create new announcement on DB & redirect to '/announcements/:announcement id' |
| GET    | '/user/:userid'                              | Render user profile (public)                                                  |
| GET    | '/addreview/:userid'                         | Render form for add a review after finish work                                |
| POST   | '/addreview/:userid'                         | Create the review at DB                                                       |

## Models

- User: {
  - email
  - photo
  - name
  - PWD
  - Announcements => [Model.type('Announcement')]
  - workInProgress: ObjectId
  - address
  - city
  - description
  - reviews: [ObjectId]
  
    }

- Announcement: {
  - Title
  - Category
  - Description
  - Tags
  - Photos
  - PhotoCard
  - Assigned (boolean)
  - Announcer: ObjectId
  - Professional: ObjectId
  - Offers: [{
    - ObjectId
      }]
  - Offer Accepted
  - Finished (boolean)
  - Chat: ObjectId
  - Location {
      state
      city
      lat
      lng
  }
    }

- Review: {
  - Title
  - Announcement(Model.type('Announcement'))
  - Description
  - Rating
    }

- Offers: {
   - professional: ObjectId,
   - announcement: ObjectId,
   - estimatedPrice:
   - accepted:
   - finished:
}

- Chat: {
   - messages: [String],
   - announcement: ObjectId
}
