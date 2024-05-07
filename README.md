# Pitch Wizard

**YouTube Demo: [youtu.be/1a27eqAXpLg](https://youtu.be/1a27eqAXpLg)**

**GitHub Repo: [github.com/ethmth/pitch-wizard](https://github.com/ethmth/pitch-wizard)**

**Hosted Site: [pitchwizard.lol](https://pitchwizard.lol)**

**[Demo Video](https://youtu.be/Vy7uF103mDI)**

> :warning: **Only tested on Chromium-based browsers.**

Pitch Wizard is an interactive web app with examples and a quiz to teach users how to identify the differences between four baseball pitches: Fastball, Changeup, Curveball, and Knuckleball.

Built with Flask, jQuery, Bootstrap, and plain HTML/CSS/Javascript for Spring 2024 of [COMS 4170 UI Design](http://coms4170.cs.columbia.edu/2024-spring/) at Columbia University.


## Running it locally

> :warning: **Only tested on Linux, Python 3.12.3 and Flask 2.3.3.**

1. Install Python 3.
2. Install `flask`

```sh
pip install flask
# OR
pip3 install flask
```

3. Clone this repo
```sh
git clone https://github.com/ethmth/pitch-wizard.git
cd pitch-wizard/
```

4. Run the server
```sh
python server.py
# OR
python3 server.py
```

## Responsibilities

I completed this project individually, so there is no division of labor. However, here is an overview of some of my completed tasks:

- **Media Collection**: I created a (private) automated web scraper for pitching videos from [baseballsavant.mlb.com](https://baseballsavant.mlb.com/). I then used ffmpeg to strip the audio from all videos because announcers tend to give away too much. I used [`ML-auto-baseball-pitching-overlay`](https://github.com/chonyy/ML-auto-baseball-pitching-overlay) for one or two examples, but clip preparation was too burdensome to use for much. 
- **Media Hosting**: I am hosting all of the media on my personal web server. Since I already had a web server for various purposes, adding the media was not too burdensome.
- **Data Architecture**: I created all of the lessons and quiz questions, and translated them into json so that they could by rendered by my Javascript app. 
- **Design**: I designed the application myself, first with a low-fi version in Google Slides, then implemented the design in my web application.
- **User Demos**: I facilitated three user testing demos in the low-fi and iterated design stages, understanding user interactions and adapting my design to create a smoother and more interactive, intuitive user experience. 
- **Implementing the UI**: I implemented the UI using JQuery, CSS, and HTML templates. 
- **Backend Logic**: I handled checking user quiz submissions and storing user data on the backend Flask server. I used Flask sessions to associate certain quiz progress/scores with certain users. 
- **Testing**: I thoroughly tested my project to ensure that all transitions work, all answers are correct, and there is no way to break my program. I even implemented a custom 404 page so that users don’t have to see that ugly Flask thing.
- **Hosting**: I decided to host my application on the web [pitchwizard.lol](https://pitchwizard.lol/). I’m logging user visits and answers, so data from users using my application can potentially be used to improve my quiz and learning experience even more based on what users are failing at.