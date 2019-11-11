import firebase from 'firebase'
import store from '@/store/index'
import axios from 'axios'

export default {

    // Firebase save method for NerioCMS
    /*
    String module = should be the path of json structure
    Object dto = each record structure
    @return - if there isn't error returns true otherwise returns error structure
     */
    save(dto, module) {

        let user = store.getters.getAuthUser;
        let selectedSites = store.getters.getSelectedSite;

        let reference = `/profiles/${user.uid}/sites/${selectedSites.key}/${module}/`;

        let defs = {
            modified: new Date().toLocaleString(),
            modifyBy: user.uid,
            active: true
        };

        let obj = {...dto, ...defs};

        return new Promise((res, rej) => {

            firebase.database().ref(reference).push(obj).then(function (result) {

                store.dispatch('setList', module); // re-fetch the list then store to vuex

                res(true); // return successful result

            }).catch((err) => {
                rej(err);
                console.log(err);
            });
        });
    },

    /*
    String test = string phrase
    @return - returns sef title for links
     */
    sefTitleCreator(text) {

        let trMap = {
            'çÇ':'c',
            'ğĞ':'g',
            'şŞ':'s',
            'üÜ':'u',
            'ıİ':'i',
            'öÖ':'o'
        };
        for(var key in trMap) {
            text = text.replace(new RegExp('['+key+']','g'), trMap[key]);
        }
        return  text.replace(/[^-a-zA-Z0-9\s]+/ig, '') // remove non-alphanumeric chars
            .replace(/\s/gi, "-") // convert spaces to dashes
            .replace(/[-]+/gi, "-") // trim repeated dashes
            .toLowerCase();

    },

    deneme() {

        axios({
            method: 'post',
            data: {
                id: 1000,
                table: "sliders"
            },
            url: './nerio/slim/api/activate',

        }).then((response) => {

            console.log(response);

        }).catch((err) => {
            console.log(err);
        });
    }
}