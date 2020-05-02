import firebase from 'firebase'
import store from '@/store/index'
import swal from 'sweetalert2'


class NavigationModule {

    constructor() {

        this.db = firebase.firestore().collection('navigation');
    }

    getAll() {
        this.db.get().then((snapshot) => {

            return snapshot.docs.map((item) => {
                const {title, path, queue, target, type, active, deleted} = item.data();
                return {
                    id: item.id,
                    title,
                    path,
                    queue,
                    target,
                    type,
                    active,
                    deleted
                };
            })
        }).then((list) => {

            store.dispatch('setList', {
                path: 'navigation',
                list: list
            });
        })
    }

    save(isUpdate = false, dto) {

        return new Promise((res, rej) => {

            if (!isUpdate) {

                this.db.set(dto).then(() => {

                    res(true)
                }).catch((err) => {
                    rej(err)
                })
            }

            else if (isUpdate) {
                const {id} = dto;
                delete dto.id; // remove id key from dto
                this.db.doc(id).update(dto).then(() => {
                    this.getAll();
                    res(true)
                }).catch(err => rej(false))
            }
        })
    }

    activeToggle(dto) {

        let countS = 0;

        return Promise.all(dto.map((item) => (
            this.save(true, {
                id: item.id,
                active: !item.active
            }).then(r => {
                if (r) countS++
            })
        ))).then(() => countS);
    }

    async moveToTrash(dto) {

        const res = await swal.fire({
            title: 'Emin misiniz ?',
            text: 'Seçilenler çöpe atılacak !',
            icon: 'warning',
            buttonsStyling: false,
            reverseButtons: true,
            showCancelButton: true,
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-warning mr-3'
            },
            confirmButtonText: 'Çöpe at !',
            cancelButtonText: 'Vazgeç'
        }).then(async function (response) {
            return response.value;
        });

        if (res === true) {

            let countS = 0;
            return Promise.all(dto.map((item) => (
                this.save(true, {
                    id: item.id,
                    deleted: true
                }).then(r => {
                    if (r) countS++
                })
            ))).then(() => countS);
        }
    }

}

export default NavigationModule;
