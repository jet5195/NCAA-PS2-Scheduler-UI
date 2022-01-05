# NCAA PS2 Scheduler

This project allows you to edit the schedule for NCAA Football 06 (and probably other NCAA PS2 games) via an electronjs GUI. This program pulls data from 2 user chosen Excel files, your schedule, and your conference alignment. Included in the release are examples you can use. The program also pulls data from a School_Data.xlsx file for school names, rivalries, etc. but this is not chosen via the GUI. Feel free to modify that file or add more teams as needed (for any custom teams or FCS teams I haven't included yet).

This program creates a new schedule file that can be converted to a csv file (I'd like to switch to using csv's instead of excel files at some point for simplicity) and then imported into PS2 NCAA Football dynasties at the beginning of seasons. (Pre-season is the only time I have attempted to modify the schedule) Be sure to make a backup of your dynasty before trying this. It works fine for me but I can't be sure it handles every possibility.

## How do I use it?

Make sure you have Java installed on your machine. Download the latest 7zip file from the release section for your operating system (https://github.com/jet5195/NCAA-PS2-Scheduler-UI/releases). Next, you'll need to extract the folder somewhere on your computer, shouldn't matter where (though I have run into an issue with the 32 bit version's folder name being too long, so if you run into issues you may need to check that). Then you should just be able to double click the executable file to run the app. If you get some javascript error upon running, you probably don't have Java installed. If that's the case, install whichever Java version is needed for your OS and try again.

Using the tool should be much easier now! First, you need to export your SCHED file from your dynasty using a database editor and save as a CSV. Then, if you're using custom conferences, you'll need to create a new Excel file containing your alignment. Use one of the examples in the release to come up with the format. Next, just download the .ZIP and any needed CSV/Excel files from a release, extract, and run the .exe. Make your changes and then hit the save button. Next, just import the .csv file into your Dynasty's schedule using a database editor.

Editing custom conferences in the GUI creates the SWAP file and affects the way out of conference schedules are created.

## Development Setup

I'm definitely missing some steps, but my process for running/debugging locally is to first run the NCAA Scheduler Server project (https://github.com/jet5195/ncaa-06-scheduler). I've used both Eclipse and IntelliJ with it, so either should work. Then run this project in VS Code with 'ng serve'. Currently, the artifacts used for releases are being created via Eclipse, and I'm not 100% sure how to create them via IntelliJ yet.

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
