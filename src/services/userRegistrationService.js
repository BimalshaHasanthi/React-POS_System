import axios from "../axios";

class UserRegistrationService {

    submitUser = async (data) => {
        const promise = new Promise((resolve, reject) => {
            axios.post('users', data)

                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        })
        return await promise;

    }

    putUser = async (id,data) => {
        const promise = new Promise((resolve, reject) => {
            axios.put('users/'+id,data)

                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        })
        return await promise;

    }


    deleteUser = async (data) => {
        const promise = new Promise((resolve, reject) => {
            axios.put('users/'+data)

                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        })
        return await promise;

    }

    fetchAllUsers = async () => {
        const promise = new Promise((resolve, reject) => {
            axios.get('users')

                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        })
        return await promise;

    }

    fetchASingleUser = async (data) => {
        const promise = new Promise((resolve, reject) => {
            axios.get('users/'+data)

                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        })
        return await promise;

    }

    fetchAllUsersLimit = async (params) => {
        const promise = new Promise((resolve, reject) => {
            axios.get('users',{params:params})

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

export default new UserRegistrationService();