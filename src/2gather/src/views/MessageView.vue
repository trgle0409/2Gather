<template>
    <div id="profile" v-for="user in matches">
        <img  src="../components/Chat/ava3.png"  alt="avatar" style="border-radius: 50%; width: 50px; height: 50px;"/>
        <p id="profileName">{{user.fields.User2}}</p>
        <button @click="openChat(user.fields.User2)">Open Chat</button>
        <br>
        <br>
    </div>
</template>

<script>
import axios from "axios";

export default {
    methods: {
        openChat(userName){
            window.location = "../chatWith?chatting="+userName; // http://localhost:5173/chatWith?chatting=Peter20
        }
    },
    data() {
        return {
            matches: []
        }
    },
    created() {
        if(localStorage.getItem("username") == null) {
            window.location = "/";
        }
    },
    mounted() {
        axios
        .get(
            "https://api.airtable.com/v0/appnDxcyH2HxjmY7n/tbl24QvIsRox0377H",
                        {
                            headers: {
                                Authorization: "Bearer patdYlqpGayMnpahT.c26d360526a3b053d845c5be7c233b8e3f4cb7c0b63801c87c84898ac351a52a"
                            }
                        }
        )
        .then(response => {
            var allMatches = response.data.records
            var matchIndex = 0

            for (let i = 0; i < allMatches.length; i++) {
                const match = allMatches[i];
                if(match.fields.User1 == localStorage.getItem("username")){
                    this.matches[matchIndex] = match
                    matchIndex++
                }
            }   

            console.log(this.matches)
        })
        .catch(error => {
            console.log(error)
        })
    }
}
</script>

<style scoped>

#profile {
    border-width:3px;
    border-style:solid;
    border-color:rgb(81, 30, 199);
    border-radius: 20px;
    background-color: rgb(81, 30, 199);
    margin: 2%;
}

#profileName {
    color: white;
    margin-left: 18%;
    margin-top: 2.5%;
}

button {
    background-color: lightgray;
    color: black;
    border-radius: 15px;
    border-color: transparent;
    margin-left: 1%;
    margin-top: 1%;
    height: 20px;
    width: 20%;
}

button:hover {
    transform: scale(1.01);
    border-color: black;
}

img {
    float: left;
    margin-left: 2%;
    margin-top: 2%;
}
</style>