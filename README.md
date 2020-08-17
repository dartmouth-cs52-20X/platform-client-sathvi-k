# SA 8 
[deployed heroku url](https://sathvi-lab5-platform.herokuapp.com/)

[deployed surge url (different from lab 4 and 5)](http://sathvi-cs52-sa8.surge.sh/)

## What Worked Well
Most of the instructions for setting up the main authentication was pretty straightforward, but I definitely had some mistakes that I had to debug. I also had some trouble figuring out how to access the logged-in user's information for the user permissions extra credit, but then I realized I could use redux state and it seemed to work!

## What Didn't
I hoped to finish implementing error handling for extra credit, but didn't get around to it because of time constraints.

## Extra Credit
I extended the permissions system so that users can only edit or delete their own posts after they sign in. To test this out, here are two accounts that I made a post with:

*email:* test@test.com

*password:* password

**and**

*email:* test2@test.com

*password:* password

--------------------

# Lab 4: Redux CRUD Platform - Client 

[deployed url](http://sathvi-cs52-client.surge.sh/)

## What Worked Well
Looking at all the different parts of the lab (by working on different parts for a little bit at a time) helped me understand how everything fit together. On past labs, I usually finished one part of something completely before moving onto to the next, but I found that jumping around worked a little better for this lab. Basically, being an organized mess helped ✨

## What Didn't
Figuring out Redux took a looonnnggg time, because I was still a bit confused after SA6. This lab also had more moving parts than SA6, which added to the confusion. I just jumped in and started working on one thing, and once I got really stuck, I moved to working on a different part of the lab -- this ended up helping me. Also, I tried to use some of the React styling libraries AFTER I began styling my pages using CSS (which was silly of me) and that gave me a headache so I kind of gave up on it. I did use some individual components from the Semantic UI React library though!

## Extra Credit
I made my platform a music recommendation/sharing site (hey look, it's wannabe-Spotify) instead of a blog site and I included input validation (you must enter a valid image URL and fill out all the fields) on the create new post and edit post forms. I also began to attempt the axios error handling, but I didn't finish. Also included a fallback page which you see if you enter a bad url path and sanitized all markdown content, don't know if these are really extra credit though :P

## Screenshots
All Posts:

![All Posts page](https://github.com/dartmouth-cs52-20X/platform-client-sathvi-k/blob/master/allposts.png)

Single Post:

![Show single post](https://github.com/dartmouth-cs52-20X/platform-client-sathvi-k/blob/master/postview.png)

Add a recommendation: 

![Add a recommendation](https://github.com/dartmouth-cs52-20X/platform-client-sathvi-k/blob/master/addrec.png)

Bad URL/Fallback page:

![Bad URL/Fallback page](https://github.com/dartmouth-cs52-20X/platform-client-sathvi-k/blob/master/badurl.png)

Empty fields error (input validation): 

![Empty fields error](https://github.com/dartmouth-cs52-20X/platform-client-sathvi-k/blob/master/emptyfields.png)

Invalid image URL (input validation):

![Invalid image url](https://github.com/dartmouth-cs52-20X/platform-client-sathvi-k/blob/master/invalidURL.png)
