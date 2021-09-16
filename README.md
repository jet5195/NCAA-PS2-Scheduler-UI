# NCAA PS2 Scheduler

This project allows you to edit the schedule for NCAA Football 06 (and probably other NCAA PS2 games) via an electronjs GUI. This program pulls data from 2 user chosen Excel files, your schedule, and your conference alignment. Included in the release are examples you can use. The program also pulls data from a School_Data.xlsx file for school names, rivalries, etc. but this is not chosen via the GUI. Feel free to modify that file or add more teams as needed (for any custom teams or FCS teams I haven't included yet).

This program creates a new schedule file that can be converted to a csv file (I'd like to switch to using csv's instead of excel files at some point for simplicity) and then imported into PS2 NCAA Football dynasties at the beginning of seasons. (Pre-season is the only time I have attempted to modify the schedule) Be sure to make a backup of your dynasty before trying this. It works fine for me but I can't be sure it handles every possibility.

## How do I use it?

Should be easy now! First, you need to export your SCHED file from your dynasty using a database editor and convert it to an Excel file. Then, if you're using custom conferences, you'll need to create a new Excel file containing your alignment. Use one of the examples in the release to come up with the format. Next, just download the .ZIP and any needed Excel files from a release, extract, and run the .exe. Make your changes and then hit the save button. Then, you'll need to use Excel to convert the saved file to a csv. Next, just import the .csv file into your Dynasty's schedule using a database editor.

Editing custom conferences in the GUI is purely superficial at this point.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Update/Generate electron app
npm run start:electron

npx electron-packager . --overwrite