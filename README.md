ReactJS Quick Start UI Template

Login-enabled.

### Technology Stack
Component         	| Technology
---               	| ---
Frontend          	| React, Redux, React-router, React-grid-layout, Material UI, ag-grid, axios, recharts



### React Config

This is a template for a ReactJS app that will be served using Nginx server on Lord Abbett's Openshift Platform which means the app will be served statical and not dynamically hence no access to the environment vars.
In order to be able to change variables between environments, the developer is responsible for maintaining the properties files under the `config` directory.

The pipeline will handle switching properties files between environment. For local use, developer can use the local.env.


To access any variable within react that is in the properties file: `window._env_.ENV_NAME`.

Furthermore, the app is already SSO-enabled.




