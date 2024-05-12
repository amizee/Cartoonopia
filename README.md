# Lab-4-Group5-A2

FOR MARKER: CONTRIBUTOR "VERCHENDISE" IS JOSHUA LI (JOLI6799), IT IS THERE BECAUSE WE USED VSCODE LIVESHARE IN SOME INSTANCES

## Installing

Go to https://www.mongodb.com/try/download/shell and install MongoDB Compass (GUI).

After cloning the repository, from the project root run: 

```angular2html
cd app
npm install
```
then 
```angular2html
cd ..
cd frontend
npm install
```

## Running
From the project root run:
```angular2html
cd app
npm start
```
This should open the React App in the browser automatically, displaying the login page.

## Importing dataset

Open MongoDB Compass and in the URI section put:
```angular2html
mongodb+srv://kevin:hGDMKGJ0cZVWonkG@cluster0.v5i7fte.mongodb.net/
```

On the left hand panel, choose **characters**. You will see 5 collections: admins, characters, contributions, 
favourites and users. Click on a collection and click 'Add Data' to import a JSON or CSV file.


