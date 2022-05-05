This exercise code was updated as of 4/4/2021 with the following changes from what was shown in the course:

General: In late 2019, the major browsers all rolled out security updates that make it so you have to be on https for samesite=none cookies to flow as before. As a result, all the versions of the backend STS and API projects have been updated to use https.

For each module's demos, you will now find the following:
- Original Angular 8 and ASP.NET Core 2.2 projects remain unchanged, other than switching the STS and API projects to use https
- Angular 11 version of the app added. The only changes were updated packages and some changes to the way Angular material modules get imported
- ASP.NET 2.2 version of the backend, unchanged from the original course code other than the configuration change to https addressing
- ASP.NET 3.1 version of the backend. Due to updated QuickStart code from IdentityServer for this version of ASP.NET Core, there were a few changes to the code there but those are straight from the IdentityServer4 repo samples.
- .NET 5 version of the backend. No diffs with the ASP.NET Core 3.1 version other than framework version.

To get the code running, do the following:
1. Make sure you have a fairly recent version of NodeJS installed
2. Make sure you have Angular CLI installed:
npm install -g @angular/cli
3. Open a command prompt or Powershell window in the securing-angular-client folder
4. Run:
npm install
5. Run:
ng serve
Client app will build and be available on localhost:4200
6. Open and build the SecuringAngularApps.API solution
7. Run the InitData.sql script against (localdb)\MSSQLLocalDB master to create the DBs and populate with seed data.
8. Run the STS and API projects
9. go to localhost:4200