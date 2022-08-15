# Team Roster
* For this project I decided to change direction and focused my inspiration towards Halo, a beloved franchise that I first discovered with my first videogame experience.
* This single page application uses Next.js and React to render on the DOM in while using realtionships between multiple data entities.
* For authenitcation and database, Halo Roster uses Axios and Firebase to allow users to CRUD while storing their data sepperately from this application for privacy.
* Sourcing notes: The images in this application are for demonstration/educational purposes only and I do not own nor host the images being used.
## Primary Features
* This application allows users to create their own Fireteams and Spartans based on the Halo: Reach video game. 
* For user based content you're allowed to:
  * Create, Update, and Delete your own creations for Fireteams and the associated Spartans.
  * Upon creation or updating your Fireteam, you may select Public/Private option. Note: You may chnage this option later if you want.
  * You **HAVE** to create a Fireteam first before you create a Spartan. The app will not allow you and will re-direct you to the correct form for this purpose.
  ![No Teams](/public/No%20teams.png)
### Target Audience
* Clients who wish to create a team building app or manage their player base where features are not availible in Halo Matchmaking nor XBOX Live.
### Gettting Started
* Login through a Google account, if no account exists, please reach out and I can authenticate using another platform if neccessary.
* Create or navigate to any page you wish to create on, and you will be redirected to creating a Fireteam first.
* Once you create, you can modify and delete your content.
* Note **DELETE** will permanently delete your team and players associated with that team, if you delete on your team first.

### Developer Notes:
* ERD: ![ERD](/public/erd.png)
* Backlog: 
  * Will allow users to trade public teams and associated players with other clients in the application!
  * Allow users to see pending and accepted trades and be able to cancel trades.
