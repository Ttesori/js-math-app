<p align="center"><img src="https://mathchamp.netlify.app/img/mc-logo.svg" alt="MathChamp Logo" width="75%"></p>

# MathChamp: A Math Facts Game

This project is a game to help kids get better at basic math facts: addition, subtraction, multiplication and division. It was inspired by my daughter's trials learning her facts while studying at home during the pandemic.

**Link to project:** https://mathchamp.netlify.app

## How It's Made:

**Tech used:** Javascript, HTML, CSS

This project is built using entirely vanilla JS, HTML and CSS. The original version of this application only practiced multiplication facts, but in this updated version it has been extended to include all basic arithmetic. The scores are saved to local storage, so they persist between sessions. The Javascript is written in a loose revealing module pattern, but this was mostly for my sanity while writing it, not for a particular dogmatic reason.

## Lessons Learned:

The biggest thing this project taught me is that even something that seems relatively simple, like basic arithmetic, can have hidden complexity when translated into code! It also taught me the importance of developing a complete UI design before jumping into styling -- it made the process much quicker and easier.

## Optimizations

Future optimizations that I'd like to add to this:

- Utilize React for a more responsive front-end
- Add the ability to sign in and save scores to a database
- Add the ability for facts to be presented in sequential order, for when the user is first learning a particular set of facts
- Add a mega-challenge mode with larger numbers (@simonpaix)
