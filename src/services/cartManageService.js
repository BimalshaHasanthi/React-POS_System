import axios from "../axios";
class cartManageService{

    submitCart = async (data) => {
        const promise = new Promise((resolve, reject) => {
            axios.post('carts', data)

                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        })
        return await promise;

    }

    putCart = async (id,data) => {
        const promise = new Promise((resolve, reject) => {
            axios.put('carts/'+id,data)

                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        })
        return await promise;

    }


    deleteCart = async (data) => {
        const promise = new Promise((resolve, reject) => {
            axios.put('carts/'+data)

                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        })
        return await promise;

    }

    fetchAllCarts = async () => {
        const promise = new Promise((resolve, reject) => {
            axios.get('carts')

                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        })
        return await promise;

    }

    fetchASingleCart = async (data) => {
        const promise = new Promise((resolve, reject) => {
            axios.get('carts/'+data)

                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        })
        return await promise;

    }

    fetchAllCartsLimit = async (params) => {
        const promise = new Promise((resolve, reject) => {
            axios.get('carts',{params:params})

                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        })
        return await promise;

    }


}
export default new cartManageService();