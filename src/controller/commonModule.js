import firebase from 'firebase'
import store from '@/store/index'
import swal from 'sweetalert2'
import NotifyMe from '@/controller/notifier'


class CommonModule {

    constructor(collection, dataMap) {

        this.collection = collection;
        this.dataMap = dataMap; // this is using for getAll method to get data from Firestore
        this.db = firebase.firestore().collection(collection);
    }

    getAll() {

        this.db.get().then((snapshot) => {

            return snapshot.docs.map((item) => {
                const extracted = {...this.dataMap} = item.data();

                return {...extracted, id: item.id}
            })
        }).then((list) => {

            //console.log(list)
            store.dispatch('setList', {
                path: this.collection,
                list: list
            });
        })
    }

    save(isUpdate = false, dto) {

        const {id} = dto;
        if (id) delete dto.id; // remove id key from dto

        return new Promise((res, rej) => {

            if (!isUpdate) {
                // new item

                if (id) {
                    this.db.doc(id).set(dto).then(() => {
                        this.getAll()
                        res(true)
                    }).catch(err => rej(err))
                } else {
                    this.db.add(dto).then(() => {
                        this.getAll()
                        res(true)
                    }).catch(err => rej(err))
                }
            }

            else if (isUpdate) {
                this.db.doc(id).update(dto).then(() => {
                    this.getAll();
                    res(true)
                }).catch(err => rej(false))
            }
        })
    }

    activeToggle(dto) {

        const isDtoHasRows = this.checkSelectedRowCount(dto);
        if (!isDtoHasRows) return;

        let countS = 0;

        Promise.all(dto.map((item) => (
            this.save(true, {
                id: item.id,
                active: !item.active
            }).then(r => {
                if (r) countS++
            })
        ))).then(() => {
            const message = `${countS} adet öğenin durumu değiştirildi !`
            this.showNotifier('success', message);
        });
    }

    async moveToTrash(dto) {

        const isDtoHasRows = this.checkSelectedRowCount(dto);
        if (!isDtoHasRows) return;

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
            Promise.all(dto.map((item) => (
                this.save(true, {
                    id: item.id,
                    deleted: true
                }).then(r => {
                    if (r) countS++
                })
            ))).then(() => {
                const message = `${countS} adet öğe çöpe atıldı !`
                this.showNotifier('success', message);

            });
        }
    }

    checkSelectedRowCount(selectedRows) {
        const result = selectedRows.length > 0;

        if (!result) {
            NotifyMe.notifier("warn", "Lütfen en az bir öğe seçin...")
        }

        return result;
    }

    showNotifier(type, txt) {
        NotifyMe.notifier(type, txt);
    }

}

export default CommonModule;
