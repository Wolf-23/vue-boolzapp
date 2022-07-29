const app = new Vue({
    el: '#app',
    data: {
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di stendere i panni',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro B.',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro L.',
                avatar: '_5',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ricordati di chiamare la nonna',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Va bene, stasera la sento',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Claudia',
                avatar: '_6',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao Claudia, hai novità?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Non ancora',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'Nessuna buona notizia?',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Federico',
                avatar: '_7',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Fai gli auguri a Martina che è il suo compleanno!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Grazie per avermelo ricordato, le scrivo subito!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Davide',
                avatar: '_8',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao, andiamo a mangiare la pizza stasera?',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'OK!!',
                        status: 'received'
                    }
                ],
            }
        ],
        selectedUser: 0,
        inputText: '',
        ricerca: '',
        lastAccessDate: '',
        lastMessagetext: '',
    },
    methods: {
        selectedChat(index) {
            this.selectedUser = index;
            this.lastAccess();
        },
        sendMessage() {
            this.inputText = this.inputText.trim();
            let DateDayJs = dayjs().format('HH:mm');
            if (!this.inputText == '') {
                let newMessage = {
                    date: DateDayJs,
                    message: this.inputText,
                    status: 'sent'
                }
                this.contacts[this.selectedUser].messages.push(newMessage);
                this.inputText = '';
                this.replyMessage();
            }
        },
        replyMessage() {
            setTimeout(() => {
                let DateDayJs = dayjs().format('HH:mm');
                let random = Math.floor(Math.random() * 6);
                let risposte = ['Va bene', 'Studia VueJs!', 'Ok', 'Ci sarò', 'Ci penserò', 'Studia Javascript!']
                let reply = {
                    date: DateDayJs,
                    message: risposte[random],
                    status: 'received'
                }
                this.contacts[this.selectedUser].messages.push(reply);
                this.lastAccess();
            }, "1000");
        },
        deleteMessage(i) {
            this.contacts[this.selectedUser].messages.splice(i, 1)
        },
        lastAccess() {
            for (i = 0; i < this.contacts[this.selectedUser].messages.length; i++) {
                if (this.contacts[this.selectedUser].messages[i].status == 'received') {
                    if (this.contacts[this.selectedUser].messages.length == 0) {
                        this.lastAccessDate = dayjs().format('HH:mm');
                    }
                    this.lastAccessDate = this.contacts[this.selectedUser].messages[i].date;
                }
            };
        },
        searchUser() {
            this.ricerca = this.ricerca.toLowerCase();
            for (x = 0; x < this.contacts.length; x++) {
                if(!this.contacts[x].name.toLowerCase().includes(this.ricerca)) {
                    this.contacts[x].visible = false;
                } else {
                    this.contacts[x].visible = true;
                }
            }
        },
    },
    mounted() {
        for (x = 0; x < this.contacts.length; x++) {
            for (i = 0; i < this.contacts[x].messages.length; i++) {
                let newDate = this.contacts[x].messages[i].date.split(" ");
                newDate = newDate[1].slice(0, 5);
                this.contacts[x].messages[i].date = newDate;
            }
        }
        this.lastAccess();
        this.lastMessage();
    },
})
