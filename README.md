# Work With Us Web APP

# Developers:

David de Lamo & Toni Sanchez

# Link

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
| GET    | '/'                                          | render index Homepage (public)                                                |
| GET    | '/announcements'                             | render list of announcements (public)                                         |
| GET    | '/auth'                                      | render Login & signup form (public)                                           |
| POST   | '/login'                                     | redirect to /user-profile (public)                                            |
| POST   | '/signup'                                    | redirect to /user-profile && create an instance of user on DB (public)        |
| GET    | '/myaccount'                                 | render account data (private)                                                 |
| POST   | '/myaccount'                                 | Update data of user (private)                                                 |
| GET    | '/announcements'                             | render announcements list                                                     |
| GET    | '/announcements/:announcement id'            | render announcement details                                                   |
| POST   | '/announcements/:announcement id/make-offer' | Make offer to client (professional user) (button hidden if professional user) |
| GET    | '/announcements/:announcement id/edit'       | render announcement data form (private) (button on announcement)              |
| POST   | '/announcements/:announcement id/edit'       | update announcement data (private)                                            |
| POST   | '/announcements/:announcement id/delete'     | remove announcement from DB (private) (button on announcement)                |
| GET    | '/new-announcement'                          | render new announcement form                                                  |
| POST   | '/new-announcement'                          | Create new announcement on DB & redirect to '/announcements/:announcement id' |
| GET    | '/user/:userid'                              | render user profile (public)                                                  |

## Models

- User: {

  - Name
  - LastName
  - Email
  - PWD
  - userType (client or professional)
  - Reviews => Rating media
  - Announcements => [Model.type('Announcement')]
  - Description (Professional user): {
    Sector,
    Location,
    Description
    }
    }

- Announcement: {

  - Title
  - Description
  - Tags
  - Photos
  - Assigned (boolean)
  - Announcer (Model.type('Client User'))
  - Professional (Model.type('Professional User'))
  - Offers: [{
    - Model.type('Professional')
    - EstimatePrice
    - Comments
      }]
  - Reviews => [Model.type('Review')]
  - Finished (boolean)
    }

- Review: {
  - Title
  - Announcement(Model.type('Announcement'))
  - Description
  - Rating
    }
