#! /usr/bin/env node

const { Command } = require('commander');
const program = new Command();

program
    .name('sweetstack')
    .description('Create your own complete web project')
    .version('beta');

program.command('create')
    .description('Choose your programming language: ')

program.parse();