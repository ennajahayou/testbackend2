# ThanksAndTips

## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://gitlab.ec-lyon.fr/placroix/thanksandtips.git
git branch -M main
git push -uf origin main
```

# How to run backend

Make sure you have node.js installed on your computer.

In the console, open the folder were this repo is cloned. Then go in the backend folder

`cd backend`

Then install all the dependencies :

`npm i`

We don't push de .env file, so create a new one by copying the example :

`cp .env.example .env`

Make sure to modify the values according to your installation

Then run the server with the folowing command

`npm run start`
