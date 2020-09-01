export default {
    run(request,data) {
        return Promise.resolve().then(() => {
            if (typeof request === "string") {
                return this.$request.post(request, { ...data });
            } else if (typeof request === "function") {
                return request.apply(this, [{ ...data }]);
            } else {
                return Promise.reject({ message: "request param type error" });
            }
        });
    }
}