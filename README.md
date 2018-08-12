# [Noteable](http://noteable1.herokuapp.com/)

> A journaling app to document your varying pursuits of interest!

---

## Update (8/07/2018)
> Noteable now features a back-end.


### New features
- Make an account (login/logout/signup)
- View other users and what they're learning

---

## Many Interests, One Place to Track Them

![Noteable in Action](/assets2/gif/Showcase.gif)

I'm a practitioner of **writing down findings related to my various topics of interest**. I feel like they stick better in my memory that way, and its way easier to backtrack to an idea you wrote down than to flip through pages in a book.

Since I was already doing this with old-fashioned pen and paper, I figured why not **make an app to explore how to make this better?**

**[Noteable](http://noteable1.herokuapp.com/)** is the idea I came up with.

## How's it Work?
![Noteable Dashboard](/assets2/img/Topics.png)

**[Noteable](http://noteable1.herokuapp.com/)** starts with **Topics**.

Categorize your interests by **Topic**, and then add **Notes** to them.


### Adding Notes

![Adding a note in Noteable](/assets2/gif/AddNote.gif)
(A Note can be **text** or a **list**.)


---

## User Authentication (8/07/2018 Update &darr; )
![Signing up in Noteable](/assets2/gif/SignUp.gif)

#### Make an account to:
- maintain your notes across multiple devices
- participate in the community of **[Noteable](http://noteable1.herokuapp.com/)** users


## Community
![Community in Noteable](/assets2/gif/Users.gif)
#### Learning Together
**[Noteable](http://noteable1.herokuapp.com/)** strives to be a place where **you** can jot down your thoughts and discoveries, but also where **friends** can keep up with each other's findings.

Here's how **[Noteable](http://noteable1.herokuapp.com/)** plans to expand this idea in the near-future:
- **Comment** on a friend's note to contribute to the idea, or just to let him/her know you like it!
- Get **notified** when your friends add new notes.
- Of course, the option to have **private topics** that are for your eyes only.

---

## The Technical Stuff
**[Noteable](http://noteable1.herokuapp.com/)** was built with the **MERN stack**.
- **M**ongoDB/Mongoose (tested with `mocha`)
- **E**xpress
- **R**eact/Redux
- **N**ode

**[Noteable](http://noteable1.herokuapp.com/)** was built from the ground up using my [React-Redux starting template](https://github.com/devonbahary/react-redux-starter-template) and [MERN stack starting template](https://github.com/devonbahary/mern-template).

#### MongoDB
- 3 schemas (User, Topic, Note)
- Custom validation (find duplicate element; O(n) complexity)
- `bcrypt` hashed passwords so that sensitive data is never stored on the server
- `jsonwebtoken` to validate user sessions


#### Express
- Custom authentication middleware for private routes
- API endpoints at `/api/users` and `/api/notes`
- Serves up client-side code for all other requests

#### React/Redux
- `axios` API calls from action generators
- `redux-thunk` for asynchronous Redux actions

#### Node
- Client-side build with Webpack

## UI Design

### Modeling After Successful Implementations

**Google** already has a successful implementation of **[Noteable's](http://noteable1.herokuapp.com/)** concept called **[Google Keep](https://keep.google.com/)**, which I admittedly use.

In fact, I've modeled **[Noteable](http://noteable1.herokuapp.com/)** after the UI design of **Google Keep**.

![Comparison with Google Keep](/assets2/img/Wireframe1.png)

Developing **[Noteable](http://noteable1.herokuapp.com/)** has been a fun exercise in borrowing from a polished UI design and reiterating it from scratch.

![Comparison with Google Keep](/assets2/img/Wireframe2.png)

### Noteable vs. Google Keep

I've admitted to using **Google Keep**, but it functions best as a digital notepad.

**Google Keep** allows you to create unlimited notes, but you can only categorize related information by keeping it all in the same note with an approriate title.

With **[Noteable](http://noteable1.herokuapp.com/)**, you're offered endless *notepads* (via Topics), and can make each note as arbitrarily concise or long as you'd like to.

And now with the addition of User Authentication (8/07/2018), you can learn from others, too!
