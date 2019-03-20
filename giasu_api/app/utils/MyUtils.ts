
export const MyUtil = {
    handleError: (error, res) => {
        res.send({ code: "error", message: error.message })
        res.end();
    },
    handleErrorFunction: (err) => { console.log("Error") },
    handleSuccess: (data, res) => {
        res.send({ code: "success", data: data ? data : {} })
    }
}