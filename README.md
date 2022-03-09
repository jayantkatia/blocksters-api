#  📝 Institutions-api
Institutions API to server institutes, students and 3rd party verifiers. 

### :rocket: Get Started with the Installation 
1. Required Installations
    1. <a href="https://nodejs.org/en/download/">Install Node.js in your system</a>
    2. <a href="https://docs.docker.com/engine/install/">Install Docker in your system</a>
    3. Make sure you have ```make``` tool installed.
2. Navigate into the project directory
3. Run
    ```shell
       npm i -g yarn
       yarn install
       make mysql-docker-run
       make createdb
    ```
    This sets up and runs your mysql container, creates db in it.
4. Create and populate ```.env file```
    ```env
        # Hard coded values as per the Makefile, make changes accordingly.        
        # For quick setup, some values are already filled.

        # DATABASE SERVER
        DB_HOST=127.0.0.1
        DB_USER=root
        DB_PASS=secret
        DB_NAME=institute_api
        DB_PORT=5432

        # APPLICATION SERVER
        PORT=3000
        SECRET=blocksters

        # NODEMAILER
        MAIL_FROM_NAME=🏫 Thapar Institute
        MAIL_FROM_ADDRESS=<YOUR_MAIL_ADDRESS>
        MAIL_PASS=<YOUR_MAIL_PASSWORD>

        # HYPERLEDGER NODE
        HYPERLEDGER_NODE_IP=0.0.0.0:8801
        HYPERLEDGER_NODE_USERNAME=<USERNAME>
        HYPERLEDGER_NODE_PASSWORD=<PASSWORD>
        HYPERLEDGER_CHANNEL=common-channel
        HYPERLEDGER_CHANNEL_CHAINCODE=chaincode1

    ```
5. Run
    ```shell
        npm start
    ```
    This runs app.js and you are good to go :wink:
    

### :purple_heart: Development and Contributing
Yes, please! Feel free to contribute, raise issues and recommend best practices.
<a href="https://github.com/jayantkatia/blocksters-api/blob/main/Makefile"> Makefile</a> is your friend.

A few resources:
- [Docker Documentation](https://docs.docker.com/get-started/overview/)
- [Sequelize Documentation](https://sequelize.org/master/)
- [Express Documentation](https://expressjs.com/)
