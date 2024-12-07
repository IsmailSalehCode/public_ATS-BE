# Description
This repository has the code for one of three software products developed for an Attendance Tracking System- my Master's diploma project in Computer and Software Engineering.

<p><a href="https://github.com/IsmailSalehCode/public_ATS-Kiosk-FE">A desktop application</a> designated for kiosk installation. Workers use it to scan their NFC tags and record their activities- entering or leaving the construction site.</p>

<p><a href="https://github.com/IsmailSalehCode/public_ATS-FE">A website</a> for authenticated personnel to: 
  <ul><li>Specify a time frame and analyze workers' total work durations.</li>
  <li>Execute CRUD operations on data (attendance-tracked personnel, attendance tracking tags, kiosks & attendance entries).</li>
  <li>Manage the platform's users through additional CRUD operations. This requires a higher-level of authorization.</li></ul></p>

<p><a href="https://github.com/IsmailSalehCode/public_ATS-BE">Back end</a>- the core of ATS. A Node.js app, which communicates with a MySQL database using Sequelize ORM. Both the back-end application and the website are hosted on the same shared-hosting server.</p><br>

# ATS-BE Architecture
![BE](https://github.com/user-attachments/assets/1d8ee602-a534-44b2-a0a7-875329701965)

ER diagram:
![ER](https://github.com/user-attachments/assets/e0d99c85-82a6-4139-88af-e90439e61c30)


# Documentation [BG]
[Дипломна работа; ATS; Исмаил Салех.pdf](https://github.com/user-attachments/files/18040853/ATS.pdf)


# Questions by the Examining Committee
### 1. What if a construction-site worker doesn't check-out / makes two identical entries?

**Answer**: If a worker does not check out, the next time they come in, they will probably press `Starting/Resuming work`. They will receive the following warning: `You made the same selection twice in a row! Contact a sys admin or your employer if you made a mistake.`.

If the worker follows the instructions, a manager (user of the web platform) can easily add the missing record. The need for corrections was foreseen during the development of the system.

If the worker does not notify anyone, a user of the web platform is notified. When opening the Total Work Durations report, the worker's name will be followed by `has X INVALID entries!`. In the example below, two "Start/Continue Work" entries have been created by Khaled, one after the other:

![Worker made a mistake](https://github.com/user-attachments/assets/4eebcd93-c95d-4aca-98bb-f4c5a0be08a4)

The following line appears in the Total Work Durations report:

![Discrepency detected](https://github.com/user-attachments/assets/4d41ccff-4930-46d0-9525-866c67e04edd)

As you can see, it is in the employee's interest to report their mistake. Otherwise, the time they worked before making the mistake remains unaccounted for.

Applying the correction is simple:
- We open the Attendance Entries dialog from the Dashboard.
![Open Attendance Entries](https://github.com/user-attachments/assets/36eda085-3df4-4f05-9968-fcde07c766ea)

- We choose to either Add, Edit or Delete an Attendance Entry.
![ATE Actions](https://github.com/user-attachments/assets/9caac3ca-2f87-4316-b00a-d668c17e496e)


### 2. Passwords are hashed, but is user data kept pure in transit and at rest? If so, how does this meet GDPR requirements?

**Answer**: All data transmitted between the client and the server is protected via HTTPS. In the thesis documentation, we see that the first non-functional requirement for the backend covers exactly this.
![HTTPS](https://github.com/user-attachments/assets/cb9a8a12-06ce-4954-8917-3ce7ce877e28)
Currently, only passwords and password reset tokens are hashed. It is also a good practice not to store other data, particularly PII, in its raw form (e.g. phone numbers and email addresses).
When signing an employment contract, construction workers and managers agree to their data being stored and processed by their employers for the company's business purposes. It would be a good idea to add additional notices in ATS frontend actors.


### 3. Can we consider a global errorhandler for Vue.js so that we don't have to catch errors with try-catch blocks?

**Answer**: We could consider using `Vue.config.errorHandler`. However, I prefer the precision, flexibility and readability of try-catch-finally blocks. Although I don't use a global errorhandler, I reuse logic by importing errHandler files.
