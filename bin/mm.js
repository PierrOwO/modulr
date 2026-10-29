#!/usr/bin/env node

import { Command } from 'commander';
import { runSetupCommand } from '../src/commands/setup.js';
import { runMakeCommand } from '../src/commands/make.js';
import { runAddCommand } from '../src/commands/add.js';
import { runListCommand } from '../src/commands/list.js';
import { env } from '../src/utils/env.js';

const program = new Command();

program
    .name('mm')
    .description('High-performance CLI for Laravel Modular Monoliths')
    .version(env('VERSION', '1.0.0'), '--v, -version');

program
    .command('setup')
    .description('Inicjalizuje środowisko mm w projekcie')
    .action(runSetupCommand);

program
    .command('list')
    .description('Wyświetla listę aktywnych modułów')
    .action(runListCommand);

// mm make / mm make crud Employee --inertia
program
    .command('make [archetype] [name]')
    .description('Tworzy nowy moduł')
    .option('--interia', 'Generuje widoki Vue/Inertia')
    .action((archetype, name, options) => runMakeCommand(archetype, name, options));

// mm add:service Employee BillingService
program
    .command('add [type] [module]')
    .description('Rozbudowuje istniejący moduł o wybrane podkomponenty')
    .action((type, module) => runAddCommand(module, type));

program.parse(process.argv);