const Report = require("../models/report.model");

exports.addReport = (req, res) => {
  try {
    const { title, description, category, creatorId, status } = req.body;

    let newReport = { title, description, category, creatorId, status };
    console.log("addReport")
    let report = new Report(newReport);
    report
      .save()
      .then((report) => {
        res.status(200).send({ message: "Report Saved Successfully" });
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  } catch (e) {
    console.log("addReport")
    res.status(500).send({ message: e.message });
  }
};

exports.getReport = (req, res) => {
    try {
        const { id } = req.params;

        let report = Report.findOne({_id: id})
        report.then((report) => {
            console.log("report", report)
            res.status(200).send({ message: "Report Found" });
        }).catch((error) => {
            res.status(501).send({ message: "Request Error" });
        });
    }catch(e){
        console.log("getReport")
        res.status(501).send({ message: e.message });
    }
}

exports.getAllReports = (req, res) => {
    try {

        let report = Report.find({}, {_id:0, createdAt: 0, updatedAt: 0, __v: 0})
        report.then((report) => {
            res.status(200).send({ message: "Reports Found", data: report });
        }).catch((error) => {
            console.log(report, error.message,"error")
            res.status(501).send({ message: "Request Error" });
        });
    }catch(e){
        console.log(report, error.message,"error")
        res.status(501).send({ message: e.message });
    }
}

exports.getUserReports = (req, res) => {
    try{
        const { userid } = req.params;
        console.log("USerid", userid)
        let reports = Report.find({creatorId: userid}, {_id:0, createdAt: 0, updatedAt: 0, __v: 0})
        reports.then((report) => {
            if(!report) return res.status(501).send({ message: "Request Error" });
            return res.status(200).send({ data: report });
        })
    }catch(e){
        return res.status(501).send({ message: e.message });
    }
}