import Vue from 'vue'
import Notification from 'vue-notification';
Vue.use(Notification);

export default {

    notifier(type, txt) {
        let title;
        switch (type) {
            case "error": title = 'Hata !'; break;
            case "warn": title = 'Uyarı...'; break;
            case "info": title = 'Bilgilendirme'; break;
            default: title = 'Başarılı'; break;
        }
        Vue.notify({
            duration: 4000,
            type: type,
            title: title,
            text: txt
        })
    }
}