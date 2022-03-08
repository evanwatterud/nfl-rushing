This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# theScore "the Rush" Interview Challenge
At theScore, we are always looking for intelligent, resourceful, full-stack developers to join our growing team. To help us evaluate new talent, we have created this take-home interview question. This question should take you no more than a few hours.

**All candidates must complete this before the possibility of an in-person interview. During the in-person interview, your submitted project will be used as the base for further extensions.**

### Why a take-home challenge?
In-person coding interviews can be stressful and can hide some people's full potential. A take-home gives you a chance work in a less stressful environment and showcase your talent.

We want you to be at your best and most comfortable.

### A bit about our tech stack
As outlined in our job description, you will come across technologies which include a server-side web framework (like Elixir/Phoenix, Ruby on Rails or a modern Javascript framework) and a front-end Javascript framework (like ReactJS)

### Challenge Background
We have sets of records representing football players' rushing statistics. All records have the following attributes:
* `Player` (Player's name)
* `Team` (Player's team abbreviation)
* `Pos` (Player's postion)
* `Att/G` (Rushing Attempts Per Game Average)
* `Att` (Rushing Attempts)
* `Yds` (Total Rushing Yards)
* `Avg` (Rushing Average Yards Per Attempt)
* `Yds/G` (Rushing Yards Per Game)
* `TD` (Total Rushing Touchdowns)
* `Lng` (Longest Rush -- a `T` represents a touchdown occurred)
* `1st` (Rushing First Downs)
* `1st%` (Rushing First Down Percentage)
* `20+` (Rushing 20+ Yards Each)
* `40+` (Rushing 40+ Yards Each)
* `FUM` (Rushing Fumbles)

In this repo is a sample data file [`rushing.json`](/rushing.json).

##### Challenge Requirements
1. Create a web app. This must be able to do the following steps
    1. Create a webpage which displays a table with the contents of [`rushing.json`](/rushing.json)
    2. The user should be able to sort the players by _Total Rushing Yards_, _Longest Rush_ and _Total Rushing Touchdowns_
    3. The user should be able to filter by the player's name
    4. The user should be able to download the sorted data as a CSV, as well as a filtered subset
    
2. The system should be able to potentially support larger sets of data on the order of 10k records.

3. Update the section `Installation and running this solution` in the README file explaining how to run your code

### Submitting a solution
1. Download this repo
2. Complete the problem outlined in the `Requirements` section
3. In your personal public GitHub repo, create a new public repo with this implementation
4. Provide this link to your contact at theScore

We will evaluate you on your ability to solve the problem defined in the requirements section as well as your choice of frameworks, and general coding style.

### Help
If you have any questions regarding requirements, do not hesitate to email your contact at theScore for clarification.

### Installation and running this solution

Navigate to the root of the project and run
```bash
docker-compose up -d
```
to start the database container

Use a node version manager of your choice to install and use node 16 or greater.

Run
```bash
npm install 
```
to get all the dependencies

When the postgres container is up and ready for connections run
```bash
npx prisma db push
```
to sync the prisma schema with the database

Then, run
```bash
npx prisma db seed
```
to populate the database

Finally, run
```bash
npm run dev
```
to start the development server.

When the server is up, navigate to `https://localhost:3000`

### Technical features and decision making

Given the scaling requirement is only on the order of 10k records, I made the decision to offload sorting and csv compilation to the client, removing the need for server communication post load entirely. 

So there's no loading time on the initial load, I've made use of static generation through NextJS.

To avoid rendering 10k+ table rows at once and destroying performance, I've made use of virtualization with react-window.

All columns are sortable in ascending or descending order through react-table. Simply click on a column header to sort by that column.

Filter input debounce of 300ms to reduce unneeded filtering and increase performance

### What could be better

Testing: There's very minimal testing here. Integrating React testing library with react-table is the next step here.

Component Decomposition: The PlayerTable component especially is a little bloated. Table rows and cells could be easily decomposed, especially if more table interaction is required.

Style Management: I've gone with Tailwindcss for ease of development, but the styles are messy and all over the place. Centralizing some of the more broadly used styles may help with this.

Linting: The only linting configuration is what came out of the box with NextJS. A more robust linting configuration would be nice.

Type Safety: Adding TypeScript, or PropTypes at the very least, would be great to reduce bugs and improve the development experience.
