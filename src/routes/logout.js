module.exports = router => {
    router.get("/", (req, res) => {
        req.session.destroy(() => {
            res.redirect("/");
        });
    });
};
