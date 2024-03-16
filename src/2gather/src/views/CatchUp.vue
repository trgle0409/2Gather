<template>
    <h3 class="header">CatchUp</h3>
    <div>
        <div class="Bio">
    
            <div class="BioText"> 
                <h5 class="bioheader" style="font-size: 1.5rem; text-align: left;">Bio:</h5>
                <h3 id="bio">Derzeit keine Matches!</h3>
                <h5 class="bioheader" style="font-size: 1.5rem; text-align: left;">Interessen:</h5>
                <h3 id="interessen">Kein Match</h3>
            </div>
        </div>

        <img src="/Check.gif" id="gif" />
        
        <button id="accept" @click="acceptMatch()"><img src="../assets/ja.png"></button>
        <button id="denied" @click="declineMatch()"><img src="../assets/nein.png"></button>

    </div>
</template>

<script>
import axios from 'axios';
import InteressenBox from '../components/Profil/InteressenBox.vue';
import BioTeil from '../components/Profil/BioTeil.vue';

export default {
    name: "catchup",
    data() {
        return {
            currentMatch: ""
        }
    },
    methods: {
        async loadAllPotentialMatches() {
            var userSelf = localStorage.getItem("username")
            const allUsers = await axios.get(
                "https://api.airtable.com/v0/appnDxcyH2HxjmY7n/tbliPiO8SGoYoRH1T",
                        {
                            headers: {
                                Authorization: "Bearer patdYlqpGayMnpahT.c26d360526a3b053d845c5be7c233b8e3f4cb7c0b63801c87c84898ac351a52a"
                            }
                        }
            )

            var allPotentialMatches = []

            for (let i = 0; i < allUsers.data.records.length; i++) {
                const potentialMatch = allUsers.data.records[i].fields;

                //Userself
                if (potentialMatch.username == userSelf) {
                    console.log("Gleiche Person: " + potentialMatch.username);
                    continue
                }

                //Same interesse
                if (!this.findOne(potentialMatch.interessenName, localStorage.getItem("interessen").split(','))) {
                    console.log("Not same Interessen: " + potentialMatch.username)
                    continue
                }

                var user2 = potentialMatch.username.replace("\n","")
                if(localStorage.getItem("myMatches").split(",").includes(user2)){
                    console.log("Already used: " + potentialMatch.username)
                    continue
                }
                allPotentialMatches[i] = potentialMatch.username
            }

            allPotentialMatches = allPotentialMatches.filter(e => String(e).trim()); //Fixes empty string in Array

            localStorage.setItem("allPotentialMatches", allPotentialMatches)
        },
        async makeMatch(){
            var allPotMat = localStorage.getItem("allPotentialMatches").split(",")
            const rdmPersonNr = Math.floor(Math.random() * allPotMat.length)
            this.currentMatch = allPotMat[rdmPersonNr]

            var user2 = await axios.get("https://api.airtable.com/v0/appnDxcyH2HxjmY7n/tbliPiO8SGoYoRH1T",
                        {
                            headers: {
                                Authorization: "Bearer patdYlqpGayMnpahT.c26d360526a3b053d845c5be7c233b8e3f4cb7c0b63801c87c84898ac351a52a"
                            }
                        })

            //Filling Bio & Interessen
            user2.data.records.forEach(element => {
                var user = element.fields.username.replace("\n","")
                var match = this.currentMatch.replace("\n","")

                if(user === match){
                    document.getElementById("bio").innerHTML = element.fields.bio //Fill Bio
                    document.getElementById("interessen").innerHTML = element.fields.interessenName //Fill Bio 
 
                }
                console.log("Current Match: "+this.currentMatch)
            });
        },
        async acceptMatch() {
            try {
                let url = "https://api.airtable.com/v0/appnDxcyH2HxjmY7n/tbliPiO8SGoYoRH1T"
                let axiosConfig = { headers: { Authorization: "Bearer patdYlqpGayMnpahT.c26d360526a3b053d845c5be7c233b8e3f4cb7c0b63801c87c84898ac351a52a", 'Content-Type': 'application/json' } }

                const data = {
                    "records": [
                        {
                            "fields": {
                                "User1": localStorage.getItem("username"),
                                "User2": this.currentMatch,
                                "Accepted": true,
                                "Denied": false
                            }
                        }
                    ]
                }

                axios
                    .post(
                        url,
                        data,
                        axiosConfig
                    )
                    .then()
                    .catch()
            }
            catch (e) {
                console.log(e)
            }
            this.refresh(true)
        },
        async declineMatch() {
            try {
                let url = "https://api.airtable.com/v0/appnDxcyH2HxjmY7n/tbliPiO8SGoYoRH1T"
                let axiosConfig = { headers: { Authorization: "Bearer patdYlqpGayMnpahT.c26d360526a3b053d845c5be7c233b8e3f4cb7c0b63801c87c84898ac351a52a", 'Content-Type': 'application/json' } }

                const data = {
                    "records": [
                        {
                            "fields": {
                                "User1": localStorage.getItem("username"),
                                "User2": this.currentMatch,
                                "Accepted": false,
                                "Denied": true
                            }
                        }
                    ]
                }
                axios
                    .post(
                        url,
                        data,
                        axiosConfig
                    )
                    .then()
                    .catch()
            }
            catch (e) {
                console.log(e)
            }
            this.refresh(false)
        },
        findOne(haystack, arr) {
            return arr.some(function (v) {
                return haystack.indexOf(v) >= 0;
            });
        },
        async allOwnMatches(){
            const getMatched = await axios.get("https://api.airtable.com/v0/appnDxcyH2HxjmY7n/tbliPiO8SGoYoRH1T",
                        {
                            headers: {
                                Authorization: "Bearer patdYlqpGayMnpahT.c26d360526a3b053d845c5be7c233b8e3f4cb7c0b63801c87c84898ac351a52a"
                            }
                        });

                //Already entry
                var userSelf = localStorage.getItem("username")
                var myMatches = []

                for (let i = 0; i < getMatched.data.records.length; i++) {
                    const element = getMatched.data.records[i];

                    if (element.fields.User1 === userSelf) {
                        myMatches[i] = element.fields.User2?.toString() || "No Match"
                    }
                }

                localStorage.setItem("myMatches", myMatches)
        },
        async refresh(accepted){
            this.allOwnMatches()

            const getMatched = await axios.get(
                "https://api.airtable.com/v0/appnDxcyH2HxjmY7n/tbliPiO8SGoYoRH1T",
                        {
                            headers: {
                                Authorization: "Bearer patdYlqpGayMnpahT.c26d360526a3b053d845c5be7c233b8e3f4cb7c0b63801c87c84898ac351a52a"
                            }
                        }
            );

            var userSelf = localStorage.getItem("username")
            var otherAgree = false

            for (let i = 0; i < getMatched.data.records.length; i++) {
                const element = getMatched.data.records[i];

                if (element.fields.User1 === this.currentMatch) {
                    if (element.fields.User2 === userSelf) {
                        if(element.fields.Accepted == true)
                            otherAgree = true
                    }
                }
            }

            //MATCH Check
            if(accepted && otherAgree){

                

                try {
                    let url = "https://api.airtable.com/v0/appnDxcyH2HxjmY7n/tbl24QvIsRox0377H"
                    let axiosConfig = { headers: { Authorization: "Bearer patdYlqpGayMnpahT.c26d360526a3b053d845c5be7c233b8e3f4cb7c0b63801c87c84898ac351a52a", 'Content-Type': 'application/json' } }

                    const data = {
                        "records": [
                            {
                                "fields": {
                                    "User1": localStorage.getItem("username"),
                                    "User2": this.currentMatch,
                                }
                            }
                        ]
                    }

                    const data2 = {
                        "records": [
                            {
                                "fields": {
                                    "User2": localStorage.getItem("username"),
                                    "User1": this.currentMatch,
                                }
                            }
                        ]
                    }

                    axios
                        .post(
                            url,
                            data,
                            axiosConfig
                        )
                        .then()
                        .catch()
                    


                    axios
                        .post(
                            url,
                            data2,
                            axiosConfig
                        )
                        .then()
                       .catch()
                    
                }catch (e) {
                    console.log(e)
                }
            }

            await this.loadAllPotentialMatches()
            await this.makeMatch()
            await this.allOwnMatches()

        },
        showGif(){

        }
    },
    created() {
        if (localStorage.getItem("username") == null) {
            window.location = "/";
        }
        this.refresh(false)
    },
    components: { BioTeil, InteressenBox }
};
</script>

<style scoped>

.Bio {
  padding: 2%;
  padding-left: 5%;
  width: auto;
  /*height: auto;*/
  margin: 0% 5%;
  background: #ffffff;
  box-shadow: 38px 42px 100px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  margin: 5%; 
}
.bioheader{
  /*padding-top: 5%;*/
  /* margin-bottom: 0;*/
  color: #7D3FFF;
}
.BioText {
  /*margin: 1.5rem;*/
  text-align: left;
  /*font-size: 15px;*/
  color: #000;
}
.header {
    text-align: center;
    font-size: xx-large;
    color: #7d3fff;
    text-decoration: underline;
    margin: 7%;
}

button {
    background-color: white;
    color: black;
    border: none;
    border-radius: 75px;
    border-color: white;
    margin: 4px 2px;
}

button:hover {
    transform: scale(1.1);
    border-color: black;
}

img {
    width: 120px;
    height: auto;
}

#accept {
    position:absolute;
    bottom: 15%;
    left: 12%;
}

#denied {
    position:absolute;
    bottom: 15%;
    right: 12%;
}
</style>
