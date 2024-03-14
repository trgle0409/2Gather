<template>
    <img alt="2Gather" class="logo" src="../../pgi_logo_flaechefarbe.png" width="140" height="125" />

    <div id="login">
        <h1>Sign In</h1><br /><br /><br />

        <input type="text" name="username" id="btn" v-model="input.username" placeholder="Benutzername" required /><br />
        <p id="noName">Bitte geben Sie einen Benutzernamen ein!</p>

        <input type="password" name="password" id="btn" v-model="input.password" placeholder="Passwort" required /><br />
        <p id="noPass">Bitte geben Sie einen Passwort ein!</p><br /><br /><br /><br />

        <button @click="login()">Sign In</button><br />
        <p id="validLogin">Login erfolgreich. Willkommen zurück!</p>
        <p id="invalidLogin">Login fehlgeschlagen. Username oder Passwort falsch!</p>

        <br /><a href="">Passwort vergessen?</a><br /><br /><br /><br /><br /><br />

        <p>Noch kein Konto?</p>
        <a href="">Jetzt Registrieren</a><br /><br /><br /><br /><br /><br />
    </div>

</template>


<script>
import axios from "axios";

export default {
    name: 'Login',
    data() {
        return {
            input: {
                username: "",
                password: ""
            },
        }
    },
    methods: {
        // login function
        async login() {
            if (this.input.username == "") {
                this.displayError("noPass", false);
                this.displayError("noName", true);

            } else if (this.input.password == "") {
                this.displayError("noName", false);
                this.displayError("noPass", true);

            } else {
                this.displayError("noName", false);
                this.displayError("noPass", false);
                this.displayError("invalidLogin", false);
                this.displayError("validLogin", false);
                
                //actual login here
                try {
                    const users = await axios.get(
                        "https://api.airtable.com/v0/appnDxcyH2HxjmY7n/tbl9Tz2femuez862J",
                        {
                            headers: {
                                Authorization: "Bearer patdYlqpGayMnpahT.c26d360526a3b053d845c5be7c233b8e3f4cb7c0b63801c87c84898ac351a52a"
                            }
                        }
                    );

                    const getMatched = await axios.get(
                        "https://api.airtable.com/v0/appnDxcyH2HxjmY7n/tbliPiO8SGoYoRH1T",
                        {
                            headers: {
                                Authorization: "Bearer patdYlqpGayMnpahT.c26d360526a3b053d845c5be7c233b8e3f4cb7c0b63801c87c84898ac351a52a"
                            }
                        }
                    );

                    //Already entry
                    var userSelf = localStorage.getItem("username")
                    var myMatches = []

                    for (let i = 0; i < getMatched.data.records.length; i++) {
                        const element = getMatched.data.records[i];

                        if (element.fields.User1 === userSelf) {
                            myMatches[i] = element.fields.User2.toString()
                        }
                    }

                    localStorage.setItem("myMatches", myMatches)

                    //console.log(users.data.records);

                    for (let i = 0; i < users.data.records.length; i++) {
                        var name = users.data.records[i].fields.username.replace("\n", "");
                        var password = users.data.records[i].fields.password.replace("\n", "")

                        if(name == this.input.username && password == this.input.password) {
                            this.displayError("invalidLogin", false);
                            this.displayError("validLogin", true);

                            console.log(`Login erfolgreich. Willkommen zurück, ${this.input.username}!`);
                            window.location = "../Veranstaltungen";

                            localStorage.setItem("username",this.input.username);
                            localStorage.setItem("pw",this.input.password);
                            
                            localStorage.setItem("name",users.data.records[i].fields.name);
                            localStorage.setItem("email",users.data.records[i].fields.email);
                            localStorage.setItem("bio",users.data.records[i].fields.bio);
                            localStorage.setItem("geburtstag",users.data.records[i].fields.geburtstag);
                            localStorage.setItem("telefonnr",users.data.records[i].fields.telefonnummer);
                            localStorage.setItem("interessen",users.data.records[i].fields.interessenName);
                            return;
                        }
                    }

                    this.displayError("validLogin", false);
                    this.displayError("invalidLogin", true);
                } catch (e) {
                    console.log(e);
                }
            }
        },

        // display error message for missing data
        displayError(id, value) {
            var doc = document.getElementById(id)
            if (value == true) {
                doc.style.display = "contents";
            } else {
                doc.style.display = "none";
            }
        }
    },
    mounted() {
        if(localStorage.getItem("username") != null) {
            window.location = "../Veranstaltungen";
        }
    }
}
</script>


<style scoped>
.logo {
    display: block;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    width: 25%;
    max-width:25%;
    height:auto;
}

#login {
    font-family: Arial;
    margin: auto;
    margin-top: 20px;
    padding: 10px;
    text-align: center;
    color: rgb(81, 30, 199);
}

#noName, #noPass, #validLogin, #invalidLogin {
    color: red;
    font-size: small;
    display: none;
}

#validLogin {
    color: green;
}

button {
    color: white;
    background-color: rgb(81, 30, 199);
    border-color: transparent;
    border-radius: 15px;
    margin: 5px;
    height: 35px;
    width: 15%;
}

button:hover, input[type=text]:hover, input[type=password]:hover, a:hover {
    transform: scale(1.05);
    border-color: black;
}

input[type=text], input[type=password] {
    background-color: lightgray;
    color: black;
    border-radius: 15px;
    border-color: transparent;
    margin: 5px;
    height: 45px;
    width: 50%;
}

p {
    color: black;
}

/* responsive design */
h1 {
    font-size:8vw;
}

p, a {
    font-size:3vw;
}

@media screen and (max-width: 800px) {
    button, input[type=text], input[type=password] {
        height: 35px;
    }
}

</style>
