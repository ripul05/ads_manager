const auditScheduling = async (req, res) => {
    res.status(200).send({
        message: "Okay"
    });
    console.log("Scheduling Audit");
}
module.exports={ auditScheduling}