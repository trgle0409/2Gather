<template>
    <div v-for="message in messages">
        <div v-if="getUsername() == message.fields.From">
            <h4 id="texthead1">{{ "(" + message.fields.Created + ") You" }}</h4>
            <p id="textcontent1">{{ message.fields.Message }}</p>
        </div>
        <div v-else>
            <h4 id="texthead2">{{ message.fields.From + " (" + message.fields.Created + ")" }}</h4>
            <p id="textcontent2">{{ message.fields.Message }}</p>
        </div>
        
        <br/>
    </div>
    <input id="inputID" name="message" placeholder="Write your Message" v-model="input.message" type="text">
    <button @click="sendMessage">Send</button>
</template>

<script>
import axios from "axios";

export default {
    methods: {
        getUsername() {
            return localStorage.getItem("username")
        },
        formatDate(time) {
            time = time.replace("T", " ").slice(0, -5)
            var date = new Date(time)

            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var day = date.getDate();

            var hours = date.getHours();
            var minutes = date.getMinutes();

            if(day < 10) {
                day = '0' + day;
            }

            if(month < 10) {
                month = '0' + month;
            }

            if(hours < 10) {
                hours = '0' + hours;
            }

            if(minutes < 10) {
                minutes = '0' + minutes;
            }

            return day + '-' + month + '-' + year + " " + hours + ':' + minutes;
        },
        sendMessage() {
            if(this.input.message == "" || this.input.message == " ") {
                return
            };
            
            let axiosConfig = { headers: { Authorization: "Bearer patdYlqpGayMnpahT.c26d360526a3b053d845c5be7c233b8e3f4cb7c0b63801c87c84898ac351a52a" , 'Content-Type': 'application/json' } }
            let url = "https://api.airtable.com/v0/appnDxcyH2HxjmY7n/tblbkvd993Gmmbtbm"

            const user1Data = {
                "records": [
                    {
                    "fields": {
                        "User1": localStorage.getItem("username"),
                        "User2": this.$route.query.chatting,
                        "Message": this.input.message,
                        "From": localStorage.getItem("username")
                        }
                    }
                ]
            }
            const user2Data = {
                "records": [
                    {
                    "fields": {
                        "User1": this.$route.query.chatting,
                        "User2": localStorage.getItem("username"),
                        "Message": this.input.message,
                        "From": localStorage.getItem("username")

                        }
                    }
                ]
            }

            //User1 Data
            axios
            .post(
                url,
                user1Data,
                axiosConfig
            )
            .then(resp => console.log(resp))
            .catch(error => console.log(error))

            //User2 Data
            axios
            .post(
                url,
                user2Data,
                axiosConfig
            )
            .then(resp => console.log(resp))
            .catch(error => console.log(error))
            this.getMessages()
            this.input.message = ""
        },
        getMessages(){
            var userChatWith = this.$route.query.chatting

            axios
            .get(
                "https://api.airtable.com/v0/appnDxcyH2HxjmY7n/tblbkvd993Gmmbtbm",
                    {
                        headers: {
                            Authorization: "Bearer patdYlqpGayMnpahT.c26d360526a3b053d845c5be7c233b8e3f4cb7c0b63801c87c84898ac351a52a"
                        }
                    }
            )
            .then(response => {
                var allMessages = response.data.records
                var messageIndex = 0
                var messageList = []

                for (let i = 0; i < allMessages.length; i++) {
                    const message = allMessages[i];
                    if(message.fields.User1 == localStorage.getItem("username") ){
                        if(message.fields.User2 == userChatWith){
                            messageList[messageIndex] = message
                            messageIndex++
                        }
                    }
                }   
                this.messages = this.insertionSort(messageList)

            })
            .catch(error => {
                console.log(error)
            })
        },
        insertionSort(inputArr) {
            let n = inputArr.length;
                for (let i = 1; i < n; i++) {
                    // Choosing the first element in our unsorted subarray
                    let current = inputArr[i];
                    // The last element of our sorted subarray
                    let j = i-1; 
                    while ((j > -1) && (current.createdTime < inputArr[j].createdTime)) {
                        inputArr[j+1] = inputArr[j];
                        j--;
                    }
                    inputArr[j+1] = current;
                }
            return inputArr;
        }
    },
    data() {
        return {
            messages: [],
            input: {
                message : ""
            },
            timer: null,
        } 
    },
    created() {
        this.getMessages()

        this.timer = setInterval(() => {
            this.getMessages()
        }, 1000)
  
    },
    beforeUnmount() {
        clearInterval(this.timer)
    }
}
</script>

<style scoped>

input[type=text] {
    background-color: lightgray;
    color: black;
    border-radius: 15px;
    border-color: transparent;
    height: 35px;
    width: 72%;
    position:absolute;
    bottom:75px;
    left:15px;
}

button {
    background-color: lightgray;
    color: black;
    border-radius: 15px;
    border-color: transparent;
    height: 35px;
    width: 16%;
    position:absolute;
    bottom:78px;
    right:15px;
}

button:hover, input[type=text]:hover {
    transform: scale(1.01);
    border-color: black;
}

#texthead1 {
    text-align: right;
    margin-right: 2%;
    margin-bottom: 5px;
}

#texthead2 {
    text-align: left;
    margin-left: 2%;
    margin-bottom: 5px;
    display: inline;
}

#textcontent1 {
    color: white;
    border-width:2px;
    border-style:solid;
    border-color:transparent;
    border-radius: 20px;
    background-color: rgb(81, 30, 199);
    margin-right: 2%;
    margin-left: 20%;
    padding: 1%;
}

#textcontent2 {
    color: white;
    border-width:2px;
    border-style:solid;
    border-color:transparent;
    border-radius: 20px;
    background-color: rgb(81, 30, 199);
    margin-right: 20%;
    margin-left: 2%;
    margin-top: 2px;
    padding: 1%;
}
</style>
