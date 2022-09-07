import axios from "../axios";

class productManageService{

    submitProduct = async (data) => {
        const promise = new Promise((resolve, reject) => {
            axios.post('products', data)

                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        })
        return await promise;

    }

    putProduct = async (id,data) => {
        const promise = new Promise((resolve, reject) => {
            axios.put('products/'+id,data)

                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        })
        return await promise;

    }


    deleteProduct = async (data) => {
        const promise = new Promise((resolve, reject) => {
            axios.put('products/'+data)

                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        })
        return await promise;

    }

    fetchAllProducts = async () => {
        const promise = new Promise((resolve, reject) => {
            axios.get('products')

                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        })
        return await promise;

    }

    fetchAllProductsCategories = async () => {
        const promise = new Promise((resolve, reject) => {
            axios.get('products/categories')

                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        })
        return await promise;

    }

    fetchASingleProduct = async (data) => {
        const promise = new Promise((resolve, reject) => {
            axios.get('products/'+data)

                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        })
        return await promise;

    }

    fetchAllProductsLimit = async (params) => {
        const promise = new Promise((resolve, reject) => {
            axios.get('products',{params:params})

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
export default new productManageService();