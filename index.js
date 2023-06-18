#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.glitch(
        'Welcome to JavaScript Game! \n'
    );
    await sleep();
    rainbowTitle.stop();

    console.log(`
        ${chalk.bgBlue('HOW TO PLAY!')}
        I am a process on your computer.
        If you get any question wrong I will be ${chalk.bgRed("Killed!")}
        so get all the questions right..!
    `);
}

async function askName() {
    const answers = await inquirer.prompt( {
        name : 'player_name',
        type : 'input',
        message : 'What is your name?',
        default() {
            return 'Player';
        },
    });
    playerName = answers.player_name;
}

async function Question1() {
    const answers = await inquirer.prompt( {
        name : 'question_1',
        type : 'list',
        message : 'Javascript was created in 10 days then released on\n',
        choices: [
            'May 23rd, 1995',
            'Nov 24th, 1995',
            'Dec 4th, 1995',
            'Dec 17, 1996',
        ],
    });
    return handlerAnswerGame(answers.question_1 == 'Nov 24th, 1995');
}

async function question2() {
    const answers = await inquirer.prompt({
      name: 'question_2',
      type: 'list',
      message: 'What is x? var x = 1_1 + "1" + Number(1)\n',
      choices: ['4', '"4"', '"1111"', '69420'],
    });
    return handlerAnswerGame(answers.question_2 === '"1111"');
  }
  
  async function question3() {
    const answers = await inquirer.prompt({
      name: 'question_3',
      type: 'list',
      message: `What is the first element in the array? ['🐏', '🦙', '🐍'].length = 0\n`,
      choices: ['0', '🐏', '🐍', 'undefined'],
    });
  
    return handlerAnswerGame(answers.question_3 === 'undefined');
  }
  
  async function question4() {
    const answers = await inquirer.prompt({
      name: 'question_4',
      type: 'list',
      message: 'Which of the following is NOT a primitive type?\n',
      choices: [
        'boolean',
        'number',
        'null',
        'object', // Correct
      ],
    });
    return handlerAnswerGame(answers.question_4 === 'object');
  }
  
  async function question5() {
    const answers = await inquirer.prompt({
      name: 'question_5',
      type: 'list',
      message:
        'JS is a high-level single-threaded, garbage-collected,\n' +
        'interpreted(or just-in-time compiled), prototype-based,\n' +
        'multi-paradigm, dynamic language with a ____ event loop\n',
      choices: ['multi-threaded', 'non-blocking', 'synchronous', 'promise-based'],
    });
  
    return handlerAnswerGame(answers.question_5 === 'non-blocking');
}  

async function handlerAnswerGame(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();

    if(isCorrect) {
        spinner.success({text : `Nice Work ${playerName}.` });
    }else {
        spinner.error({text : `💀💀💀 Game Over, you lose ${playerName}`});
        process.exit(1);
    }
}

function winner() {
    console.clear();
    const msg = `Congrats, ${playerName} !\n $ 1, 000, 000$`;

    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    });
}

async function welcomeResume() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Hello, My name is DhruvKumar Nagar. Here is my RESUME!\n'
    );
    await sleep();
    rainbowTitle.stop();
}

async function options() {
    const seleceOption = await inquirer.prompt( {
        type: "list",
        name: "option",
        message: "Pick any options",
        choices: [
          "About me🦾",
          "Past Experience🧪",
          "Skills🤹",
          "Achievements🏆",
          "Contact📞",
          "Let's play Javascript Game🎮",
        ]
    })
    return handlerAnswer(seleceOption.option);
}

async function handlerAnswer(option) {
    if(option == "About me🦾") {
        console.log(chalk.whiteBright(`
Hello, I am Dhruvkumar Nagar.
I'm a passionate web developer with expertise in MERN stack.
    `));
    }else if(option == "Past Experience🧪") {
        pastExp();
    }else if(option == "Skills🤹") {
        skill();
    }else if(option == "Achievements🏆") {
        achievment();
    }else if(option == "Contact📞") {
        contact();
    }else {
        await welcome();
        await askName();
        await Question1();
        await question2();
        await question3();
        await question4();
        await question5();
        await winner();
    }  

    mandatory();
}

function mandatory() {
    inquirer
        .prompt({
          type: "list",
          name: "option",
          message: "You can go back or Exit?",
          choices: ["Back", "Exit"]
        })
        .then((choice) => {
          if (choice.option == "Back") {
            options();
          } else {
            console.log(chalk.red("\nSee you soon!!"));
            return;
          }
    }); 
}

function pastExp() {
    console.log(chalk.whiteBright(`
SDE intern @ Motorola solutions , Bangalore
Aug 2022 - May 2023 (11 months) | Full-time

Full Stack Developer Intern @ Desi QnA, Remote
May 2021 - Aug 2021 (4 months) | Full-time
    `))
}

function skill() {
    console.log(chalk.whiteBright(`
C/C++
JavaScript
HTML/CSS
MERN Stack
    `))
}

function contact() {
    console.log(chalk.whiteBright(`
Phone No☎️: +91 82388-48105
Email ID📧: iamdhruvnagar@gmail.com 
GitHub🔗: https://github.com/Dhruv2638
LinkedIn🔗: https://www.linkedin.com/in/dhruv2638
    `))
}

function achievment() {
    console.log(chalk.whiteBright(`
🎯 Solved more than 600 algorithmic problems using C++ on the sites LeetCode, GeeksforGeeks, CodeStudio combined.
🎯 96 global rank in CodeChef February Long 2022 out of 16000+ participants.
🎯 Semifinalist in CHARUSAT startup 2021 at college out of many selected participants.
🎯 Completed Blockchain Foundation Program, Ethereum Fun- damentals Program, 
    and Hyperledger Fabric Fundamentals Program offered by Kerala Blockchain Academy.
🎯 Completed Oracle Certified Foundations Associate.
    `))
}

await welcomeResume();
await options();