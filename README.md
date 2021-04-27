# ubxExam
<h2>SETUP</h2>
<lu>
  <li>1. Install git (https://git-scm.com/downloads)</li>
<li>2. Clone repository https://github.com/zheiro/_flyxtest.git</li>
<li>3. Install node (https://nodejs.org/en/download/)</li>
<li>4. Download project dependencies inside the repository folder:
○ npm install</li>
<li>5. Create an account in firebase https://firebase.google.com/</li>
<li>6. Create a firestore database in firebase.</li>
<li>7. Create a .env file inside the project folder with the following parameters:
○ REACT_APP_API_KEY
○ REACT_APP_AUTH_DOMAIN
○ REACT_APP_DATABASE_URL
○ REACT_APP_PROJECT_ID
○ REACT_APP_MESSAGING_SENDER_ID
○ REACT_APP_APP_ID
The values of the parameters can be found in the project settings of firebase.</li>
<li>8. Run the application:
○ npm run start</li>
<li>9. The browser should automatically open on http://localhost:3000/home</li>
<li>10. Click sign up and create a user then login.</li>

<span>Note:</span><span> If you are having problems with steps 5 - 7 you can use the following parameters for your
.env but could lose points in grading.</span>



<h2>TASKS:<h2>
  <hr>
  <lu>
   <li> 1. Create an edit and delete function. There is already an existing function to add a posting
     in the lower right corner of the screen. UI / UX implementation is up to the developer.</li>
 <li>2. Add a search functionality. A search bar already exists on the top of the screen. Add a
function to be able to search any type of string in the postings. Bonus points if you add a
filter capability.</li>
 <li>3. Arrange the posting from highest number of votes to lowest (You can mess with the
dummy data in firebase if you did not skip steps 5-7 in the setup)</li>
 <li>4. When a user clicks a flight posting, it should add to that number. Once already voted
upon, the user cannot add another vote to that specific flight. (This would require
firebase setup)</li>
   
<h3>SUBMISSION:<h3>
<span>Push your code in the repository of your choice (Most probably github) and send
keihertz@ubx.ph an email with the link to the repository. Make sure the repository is set to
  public.</span>
  </lu>
