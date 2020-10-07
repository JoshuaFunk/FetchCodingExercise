# Fetch Coding Exercise

The purpose of this repository is for the Fetch company to evaluate a coding exercise they presented. However, this may also be valuable to other employers as well so this will be left up in the event they may want to also be able to look at this.

This small app is setup using express with node along with React and Babel via CDN to pull down from a Fetch API that gives 1000 items.
I have to request the data from the Fetch API via a Express route I setup because of Cors.
The receieved items are then filtered to ignore null and empty names and then sorted by listID followed by Name.
These are displayed in a row with Alternating colors as well as a stand out color at the start of groups to help identify when a new group started.

In order to setup the project is simple.
1. Pull from the repository.
2. npm install
3. npm start

Currently, it is set to show up on "localhost:3000"
