# rocket

* please follow [git flow](http://nvie.com/posts/a-successful-git-branching-model/)
* only contains `master`, `develop`, `release` branch on `accuvally/accupass-rocket-f2e`
 
## Git flow tools
* we use https://github.com/nvie/gitflow
* create feature `git flow feature start <branch_name>` from `develop` branch
* don't use finish feature branch by `git-flow`, create a pull request


## Prepare (before start)
you shold
* clone repo 
* command : `npm install` , to update ur develop environment


## dev

* command `npm run dev` to run develop
* open `http://localhost:3000`

## prod

* command `npm run build` to package app
* command `npm run start` to run production
* open `http://localhost:8080`