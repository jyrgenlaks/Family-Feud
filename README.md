# Family-Feud
Project for playing family feud on a projector locally

## Keybindings

Button | Action
 --- | ---
1 | Reveals answer for the 1. position and adds the score for *current selected team*
2 | Reveals answer for the 2. position and adds the score for *current selected team*
3 | Reveals answer for the 3. position and adds the score for *current selected team*
4 | Reveals answer for the 4. position and adds the score for *current selected team*

---

Button | Action
 --- | ---
5 | Displays 1 cross for wrong answer. **Deprecated** - use **q** instead
6 | Displays 2 crosses for wrong answer. **Deprecated** - use **q** instead
7 | Displays 3 crosses for wrong answer. **Deprecated** - use **q** instead


---

Button | Action
 --- | ---
j | Selects team on the left to be the *current selected team* aka the one that gets the points and accumulates errors
k | Selects team on the right to be the *current selected team* aka the one that gets the points and accumulates errors


---

Button | Action
 --- | ---
s | Starts the game
r | Starts new round
q | Adds one to the mistake count of the *current selected team*, displays the correct amount of crosses and flips the current selected team when mistake count reaches 3
i | Pointssteal - adds points of the opposite team to the *current selected team*. **Deprecated** - when a team quesses correctly after the opposite team makes 3 mistakes, this is automatically applied. 
0 | Doesn't allow adding score this round. Use when all teams have exhausted all their options and you need to reveal the correct answers. **Deprecated** - when a team makes 3 mistakes and the other team also gives a wrong answer, this is automatically applied.

## [Example round](https://youtu.be/qCEDfP0quNU?t=6m5s)
Timestamp | Button | Reason
--- | --- | ---
5:58 | r | start of new round
6:15 | j | left team was first
6:18 | 4 | the guess was "Astover" and that is under answer 4 (the controller should have the answer sheet at hand to look up correct answers) 
6:22 | k | right team's turn
6:33 | q | wrong answer (not in the answer sheet)
6:40 | j | left team continues quessing
6:54 | q | wrong answer
7:01 | q | wrong answer
7:10 | q | wrong answer
7:31 | 1 | correct answer at box 1 = points steal and no more guesses allowed
7:43 | 2 | reveal 2. place
7:50 | 3 | reveal 3. place
8:05 | r | start of new round




