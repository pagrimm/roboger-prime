# Mr. Roboger's Neighborhood
**Weekly Project for Epicodus**  
By Peter Grimm, 05.29.2020

## Description

Week 3 project for Epicodus. A page that will return a list of numbers from 0 to the inputted number, and replace numbers containing a one, two, or three with snippets of text. Designed to showcase my skills in looping Javascript logic, behavior driven development, and the separation of business and user interface logic.

## Specifications
| Behavior                                                                           | Input  | Output                                   |
|------------------------------------------------------------------------------------|--------|------------------------------------------|
| Users may only input numbers in the numbers field.                                 | dog    | invalid                                  |
| Return a range of numbers from 0 to the input number.                              | 5      | 0, 1, 2, 3, 4, 5                         |
| Numbers that contain a 1: all digits are replaced with "Beep!"                     | 5      | 0, Beep!, 2, 3, 4, 5                     |
| Numbers that contain a 2: all digits are replaced with "Boop!"                     | 5      | 0, 1, Boop!, 3, 4, 5                     |
| Numbers that contain a 3: all digits are replaced with "Won't you be my neighbor?" | 5      | 0, 1, 2, Won't you be my neighbor?, 4, 5 |
| Behavior 4 should only apply if behavior 5 does not.                               | 12     | ... Boop!                                |
| Behavior 4 and 5 should only apply if behavior 6 does not.                         | 13, 23 | ... Wont you be my neighbor?             |
| Users may enter their name and it is displayed in "Won't you be my neighbor?"      | Peter  | ... Wont you be my neighbor, Peter?      |

## Setup/Installation Requirements

* Clone this repository using the command `git clone https://github.com/pagrimm/mr-roboger-project.git`
* Navigate to the `mr-roboger-project` folder
* Open `index.html` in a browser of your choice
* This project is also available on GitHub pages: https://pagrimm.github.io/mr-roboger-project/

## Technologies Used

HTML  
CSS  
Bootstrap 4.5.0  
jQuery 3.5.1

## Legal

Copyright (c) 2020, Peter Grimm  
This software is licensed under the MIT license.