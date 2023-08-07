#!/usr/bin/env node

import chalk from 'chalk';
import figlet from 'figlet';
import getUserInput from './getUserInput';

function start() {
    try {
        const aschiiZaity = figlet.textSync('Zaity', { width: 150 });
        console.log(chalk.cyan(aschiiZaity));
        console.log(chalk.cyan('\n Your transcription library for accessibility!'));
        getUserInput()
    } catch (error) {
        console.log(error)
    }
}

start()